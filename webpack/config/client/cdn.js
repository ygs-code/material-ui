const { stringToObject, alias } = require("../../utils");
let {
  NODE_ENV, // 环境参数
  htmlWebpackPluginOptions = "",
  ADDRESS,
  PORT,
  PUBLICPATH,
  RENDER,
  ENTRY_SERVER_NAME,
  ENTRY_PORT
} = process.env; // 环境参数
// <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
// <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

NODE_ENV == "development";
htmlWebpackPluginOptions = stringToObject(htmlWebpackPluginOptions);
// 配置不进行webpack打包的文件
const externals = {
  // react: "React",
  // "react-dom": "ReactDOM"
  // "react-redux": "ReactRedux"
  // "react-lazy-router-dom": "ReactRouterDOM"
};

// 配置cdn引入
const cdn = {
  css: [
    `${PUBLICPATH}static/css/antd.min.css`
    // "https://cdnjs.cloudflare.com/ajax/libs/antd/4.24.10/theme.min.js"
  ],
  js: [
    // "https://cdnjs.cloudflare.com/ajax/libs/react-redux/8.0.1/react-redux.min.js",
    `${PUBLICPATH}static/js/errCatch.js`
    // `${PUBLICPATH}static/js/react-lazy-router-dom/index.js`
  ]
  // .concat(
  //   NODE_ENV === "development"
  //     ? [
  //         "https://unpkg.com/react@18.2.0/umd/react.development.js",
  //         "https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"
  //       ]
  //     : [
  //         "https://unpkg.com/react@18.2.0/umd/react.production.min.js",
  //         "https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"
  //       ]
  // )
};

module.exports = {
  externals,
  cdn
};
