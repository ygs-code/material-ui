import React from "react";
import { renderToString } from "react-dom/server";
import { getBundles } from "react-loadable-ssr-addon";
import Helmet from "react-helmet";
import { matchPath } from "react-lazy-router-dom";
import store from "client/redux/Store";
import routesComponent from "client/router/routesComponent";
import { getMemoryHistory } from "client/router/history";
import { findTreeData } from "client/utils";
import App from "client/App";
import { stringToObject } from "client/utils";
// import otherModules from "./otherModules";
import path, { resolve } from "path";
import fs from "fs";
import ejs from "ejs";

const absolutePath = resolve("./");
let {
  NODE_ENV, // 环境参数
  // target, // 环境参数
  htmlWebpackPluginOptions
} = process.env; // 环境参数

//    是否是生产环境
// const isEnvProduction = NODE_ENV === "production";
//   是否是测试开发环境
const isEnvDevelopment = NODE_ENV === "development";

// 创建 store
// const store = createStore({});

const { dispatch, getState } = store;

// 中间件
class ClientRouter {
  constructor(
    ctx,
    next,
    options = {}
    // compiler
  ) {
    this.context = {
      ctx,
      next
    };

    this.options = options;
    this.init();
  }

  //      初始化
  async init() {
    const { ctx, next } = this.context;

    let template = fs.readFileSync(
      path.join(
        path.join(
          absolutePath,
          isEnvDevelopment ? "/client/public" : "dist/client"
        ),
        "index.html"
      ),
      "utf-8"
    );

    let isMatchRoutes = this.getMatch(
      routesComponent,
      ctx.req._parsedUrl.pathname
    );

    if (isMatchRoutes.length) {
      // 路由注入到react中
      let history = getMemoryHistory({ initialEntries: [ctx.req.url] });
      history = {
        ...history
        // ...isMatchRoute
      };

      const { isExact, path, url, params } = history;
      let props = {
        ...history,
        dispatch,
        state: getState(),
        match: {
          isExact,
          path,
          url,
          params
        }
      };

      let syncRouteComponent = [];
      let metaProps = {};
      for (let item of isMatchRoutes) {
        const { Component } = item;

        const syncComponent = await Component();
        const { WrappedComponent: { getInitPropsState, getMetaProps } = {} } =
          syncComponent;

        metaProps = getMetaProps
          ? {
              ...metaProps,
              ...getMetaProps()
            }
          : metaProps;

        if (getInitPropsState) {
          // 拉去请求或者查询sql等操作
          await getInitPropsState(
            // 注入props
            props
          );
        }

        syncRouteComponent.push({
          ...item,
          Component: syncComponent
        });
      }

      // syncRouteComponent
      //     // 同步路由配置
      //     routesComponent: [
      //       {
      //         ...isMatchRoute,
      //         Component: syncComponent
      //       }
      //     ]

      // const { Component } = isMatchRoutes;

      // const syncComponent = await Component();

      // delete history.Component;
      // delete history.syncComponent;
      // const { WrappedComponent: { getInitPropsState, getMetaProps } = {} } =
      //   syncComponent;

      // await getBaseInitState(dispatch, getState(), props);

      // if (getInitPropsState) {
      //   // 拉去请求或者查询sql等操作
      //   await getInitPropsState(
      //     // 注入props
      //     props
      //   );
      // }

      // 渲染html
      let renderedHtml = await this.reactToHtml({
        store,
        template,
        history,
        isMatchRoutes,
        routesComponent: syncRouteComponent
      });

      renderedHtml = ejs.render(renderedHtml, {
        htmlWebpackPlugin: {
          options: {
            ...stringToObject(htmlWebpackPluginOptions),
            ...metaProps
          }
        }
      });
    
      ctx.body = renderedHtml;
    }
    next();
  }

  // 查找初始化数据
  findInitData(routesConfigs, value, key) {
    return (findTreeData(routesConfigs, value, key) || {}).initState;
  }
  // 转换路径
  transformPath(path) {
    let reg = /(\\\\)|(\\)/g;
    return path.replace(reg, "/");
  }
  // 创建标签
  async createTags({ isMatchRoutes }) {
    let { assetsManifest } = this.options;

    if (assetsManifest) {
      assetsManifest = JSON.parse(assetsManifest);
    } else {
      try {
        // 变成一个js去引入
        assetsManifest = await import("@/dist/client/assets-manifest.json");
      } catch (error) {}
    }

    
    const modulesToBeLoaded = [
      ...assetsManifest.entrypoints,
      ...isMatchRoutes.map((item) => {
        return "client" + item.entry;
      })
    ];

    let bundles = getBundles(assetsManifest, modulesToBeLoaded);
    let { css = [], js = [] } = bundles;

    let scripts = js
      .map((script) => `<script src="/${script.file}"></script>`)
      .join("\n");

    let styles = css
      .map((style) => `<link href="/${style.file}" rel="stylesheet"/>`)
      .join("\n");

    return { scripts, styles };
  }
  // 拼装html页面
  assemblyHTML(
    template,
    {
      html,
      // head,
      rootString,
      scripts,
      styles,
      initState
    }
  ) {
    template = template.replace("<html", `<html ${html}`);
    template = template.replace("</head>", `${styles}</head>`);

    template = template.replace(
      '<div id="root">',
      `<div id="root">${rootString}`
    );

    template = template.replace(
      "</head>",
      `</head> \n <script>
      window.__INITIAL_STATE__ =${JSON.stringify(initState)}</script>`
    );
    template = template.replace("</body>", `${scripts}</body>`);
    return template;
  }
  // 获取路由
  getMatch(routesArray, url) {
    let routers = [];
    for (let router of routesArray) {
      let $router = matchPath(url, {
        path: router.path,
        exact: router.exact
      });

   

      if ($router) {
        routers.push({
          ...router,
          ...$router
        });
      }
    }

    return routers;
  }
  // 创建react转换成HTMl
  async reactToHtml({
    // ctx,
    store,
    template,
    isMatchRoutes,
    // syncComponent,
    history,
    routesComponent
  }) {
    let initState = store.getState();
   
    let rootString = renderToString(
      <App
        {...{
          store,
          history,
          // 同步路由配置
          routesComponent
        }}
      />
    );
    let { scripts, styles } = await this.createTags({ isMatchRoutes });

    const helmet = Helmet.renderStatic();
    let renderedHtml = this.assemblyHTML(template, {
      html: helmet.htmlAttributes.toString(),
      head:
        helmet.title.toString() +
        helmet.meta.toString() +
        helmet.link.toString(),
      rootString,
      scripts,
      styles,
      initState
    });
    
    return renderedHtml;
  }
}

export const serverRenderer = ({ clientStats, serverStats, options } = {}) => {
  return async (ctx, next) => {
    await new Promise((reslove, reject) => {
      new ClientRouter(ctx, reslove, options);
    });

    await next();
  };
};

export default serverRenderer;
