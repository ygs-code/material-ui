const fs = require("fs");
const path = require("path");
const _ = require("lodash");
const { readFile } = require("../../utils");
const dataDiff = require("./diff");
const chalk = require("chalk");

let {
  NODE_ENV, // 环境参数
} = process.env; // 环境参数

// https://juejin.cn/post/6844903991508205576
class WebpackPluginRouter {
  constructor(options) {
    this.options = options;
    this.routesConfigs = [];
    this.startTime = null;
    this.timer = null;
    this.writeFile();
  }

  // 节流函数
  throttle(time, callback = () => {}) {
    let nowTime = new Date().getTime();
    if (!this.startTime || nowTime - this.startTime > time) {
      this.startTime = nowTime;
      if (callback && callback instanceof Function) {
        callback();
      }
    }
  }

  firstToUpper(str = "") {
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
  }

  removeLine(string) {
    return string.replace(/\/{2,}/g, "/").trim();
  }

  mapRoutesConfig(
    config,
    routesConfigPath,
    code = {},
    compilation,
    cacheNames,
    cachePaths,
    parentPath = ""
  ) {
    const { publicPath = "/" } = this.options;

    for (let item of config) {
      let { path, name, entry, exact, children = [], level = 1 } = item;
      path = parentPath ? parentPath + path : path;
      let errorMessage = "";
      if (cacheNames.has(name)) {
        const { routesConfigPath: cacheRoutesConfigPath } =
          cacheNames.get(name);
        errorMessage = `[webpack-plugin-router]
 路由name: ${name} 命名重名冲突，请重新修改 路由name: ${name} 
   in ${cacheRoutesConfigPath}
   in ${routesConfigPath}
 ✖ 1 problem (1 error, 0 warnings)
`;
        if (
          compilation &&
          compilation.errors &&
          compilation.errors instanceof Array
        ) {
          compilation.errors.push(errorMessage);
          // console.error(chalk.red(errorMessage));
          // process.exit(1);
          // throw chalk.red(errorMessage);
        } else {
          // console.error(chalk.red(errorMessage));
          // process.exit(1);
          // throw chalk.red(errorMessage);
        }
        code.compilationErrors.push(errorMessage);
      }

      if (
        cachePaths.has(path) &&
        !(name[0] === "~" || cachePaths.get(path).name[0] === "~")
      ) {
 
        const { routesConfigPath: cacheRoutesConfigPath } =
          cachePaths.get(path);
        errorMessage = `[webpack-plugin-router]
       路由path: ${path} 命名重名冲突，请重新修改 路由path: ${path}
         in ${cacheRoutesConfigPath}
         in ${routesConfigPath}
       ✖ 1 problem (1 error, 0 warnings)
      `;
        if (
          compilation &&
          compilation.errors &&
          compilation.errors instanceof Array
        ) {
          compilation.errors.push(errorMessage);
          // console.error(chalk.red(errorMessage));
          // process.exit(1);
          // throw chalk.red(errorMessage);
        } else {
          // console.error(chalk.red(errorMessage));
          // process.exit(1);
          // throw chalk.red(errorMessage);
        }
        code.compilationErrors.push(errorMessage);
      }

      cacheNames.set(name, {
        path: path,
        name: name,
        routesConfigPath: routesConfigPath
      });
      cachePaths.set(path, {
        path: path,
        name: name,
        routesConfigPath: routesConfigPath
      });
      if (children && children.length) {
        const {
          routesComponentConfig = "",
          syncComponent = "",
          routePaths = ""
        } = this.mapRoutesConfig(
          children,
          routesConfigPath,
          code,
          compilation,
          cacheNames,
          cachePaths,
          path
        );
        code.syncComponent = syncComponent;
        code.routesComponentConfig = routesComponentConfig;
        code.routePaths = routePaths;
      }
      // import("client/pages/marketing/pages/DiscountCoupon/index.js")  Loadable${this.firstToUpper(name)}
      code.syncComponent += `
import ${this.firstToUpper(name)} from "client${entry}"`;

      code.routesComponentConfig += `
                    {  
                     path: "${this.removeLine(publicPath + path)}",
                     exact: ${exact ? true : false},
                     name:"${name}",
                     entry:"${entry}",
                     Component:lazy(
                           () => import(/* webpackChunkName:"${name}" */ "client${entry}")
                      ),
                    //  syncComponent:${this.firstToUpper(name)},
                     level:${level},
                     routesConfigPath:"${routesConfigPath}",
                   },`;

      code.routePaths +=
        // 过滤"~"转义 因为具有相同的值了
        name[0] === "~"
          ? ""
          : `
  ${name}:"${this.removeLine(publicPath + path)}",`;
    }
    return code;
  }
  getDynamicCode(routesConfig, compilation) {
    let cacheNames = new Map();
    let cachePaths = new Map();

    const code = {
      routesComponentConfig: "",
      syncComponent: "",
      importRoutesConfigCode: "",
      exportRoutesConfigCode: "",
      routePaths: "",
      compilationErrors: []
    };
    for (let item of routesConfig) {
      let { path, config = [] } = item;
      let routesConfigPath = path;
      path = path.split(/\/client\//g)[1];
      let fileName = path.split(/\//g);
      fileName = fileName
        .map((item, index) => {
          return index == 0 ? item : this.firstToUpper(item);
        })
        .join("");
      fileName = fileName.replace(/\.js$/g, "");
      code.exportRoutesConfigCode += `
  ...${fileName},`;
      code.importRoutesConfigCode += `import ${fileName} from "client/${path}";\n`;

      const { routesComponentConfig, syncComponent, routePaths } =
        this.mapRoutesConfig(
          config,
          routesConfigPath,
          code,
          compilation,
          cacheNames,
          cachePaths
        );
      code.syncComponent = syncComponent;
      code.routesComponentConfig = routesComponentConfig;
      code.routePaths = routePaths;
    }

    return code;
  }
  getCode(routesConfigs, compilation) {
    let {
      NODE_ENV, // 环境参数
    } = process.env; // 环境参数

    NODE_ENV == "development";

    const {
      routesComponentConfig = "",
      syncComponent = "",
      importRoutesConfigCode = "",
      routePaths = "",
      compilationErrors = [],
      exportRoutesConfigCode = ""
    } = this.getDynamicCode(routesConfigs, compilation);

    let routesComponentFile = `
// 按需加载插件
import { lazy } from "client/router/react-lazy-router-dom";
`;

    routesComponentFile += importRoutesConfigCode;

    //
    // routesComponentFile += NODE_ENV === "development" ? syncComponent : "";

    routesComponentFile += `

let routesComponentConfig=[`;

    routesComponentFile += routesComponentConfig;
    routesComponentFile += `
    ]`;

    routesComponentFile += `

export const routesConfigs = [${exportRoutesConfigCode}
];     

export default routesComponentConfig;
        `;

    let routePathsFile = `export default {${routePaths}
 }
    `;
    return {
      routesComponentFile,
      routePathsFile,
      compilationErrors
    };
  }

  writeFile(compilation) {
    const {
      entry,
      aggregateTimeout,
      output: { routesComponent, routePaths },
      watch = []
    } = this.options;

    this.throttle(aggregateTimeout, () => {
      let routesConfigs = [];
      readFile(entry, (value) => {
        const { path, filename } = value;
        if (watch.includes(filename)) {
          const content = require(path).default;
          routesConfigs.push({
            path,
            config: content
          });
          delete require.cache[require.resolve(path)];
        }
      });

      if (!dataDiff(routesConfigs, this.routesConfigs)) {
        this.routesConfigs = _.cloneDeep(routesConfigs);
        const { routesComponentFile, routePathsFile, compilationErrors } =
          this.getCode(routesConfigs, compilation);
        if (compilationErrors.length) {
          return false;
        }
        fs.writeFileSync(
          path.join(process.cwd(), routesComponent),
          routesComponentFile
        );
        fs.writeFileSync(path.join(process.cwd(), routePaths), routePathsFile);
      }
    });
  }
  compilerFile(compilation) {
    const {
      entry,
      aggregateTimeout,
      output: { routesComponent, routePaths },
      watch = []
    } = this.options;

    let routesConfigs = [];
    readFile(entry, (value) => {
      const { path, filename } = value;
      if (filename === "routesConfig.js") {
        const content = require(path).default;
        routesConfigs.push({
          path,
          config: content
        });
        delete require.cache[require.resolve(path)];
      }
    });

    this.routesConfigs = _.cloneDeep(routesConfigs);
    const { routesComponentFile, routePathsFile } = this.getCode(
      routesConfigs,
      compilation
    );
  }
  //   做兼容
  hook(compiler, hookName, pluginName, fn) {
    if (arguments.length === 3) {
      fn = pluginName;
      pluginName = hookName;
    }
    if (compiler.hooks) {
      compiler.hooks[hookName].tap(pluginName, fn);
    } else {
      compiler.plugin(pluginName, fn);
    }
  }

  apply(compiler) {
    // webpack  处理webpack选项的条目配置后调用。 只编译一次

    if (NODE_ENV === "production") {
      compiler.hooks.emit.tapAsync("entryOption", (compilation, callback) => {
        this.compilerFile(compilation);
        callback();
      });
      return false;
    }
    this.hook(compiler, "watchRun", (compilation) => {
      this.writeFile(compilation);
    });

    compiler.hooks.emit.tapAsync(
      "WebpackPluginRouter",
      (compilation, callback) => {
        this.compilerFile(compilation);
        callback();
      }
    );

    // compiler.plugin("make", (compilation, callback) => {
    //     this.compilerFile(compilation);
    //     callback();
    // });
    // this.hook(compiler, "done", (stats) => {
    //     if (stats.compilation.errors && stats.compilation.errors.length) {
    //         console.log(
    //             " stats.compilation.errors===",
    //             chalk.red(stats.compilation.errors)
    //         );
    //         // process.exit(1);
    //     }
    // });
  }
}

module.exports = WebpackPluginRouter;
