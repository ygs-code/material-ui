/*
 * @Date: 2022-08-01 17:29:00
 * @Author: Yao guan shou
 * @LastEditors: Yao guan shou
 * @LastEditTime: 2022-08-11 15:55:18
 * @FilePath: /react-loading-ssr/client/router/routesConfig.js
 * @Description:
 */
// 路由配置
export default [
  {
    path: "/",
    exact: false,
    name: "index",
    entry: "/pages/Index/index.js",
    level: 1
  },

  {
    path: "/",
    exact: true,
    name: "~index", // 特殊路由  / 路径入口
    entry: "/pages/Index/pages/Home",
    level: 2
  },

  // // 文档详情
  // {
  //   path: "/office/document/details",
  //   exact: true,
  //   name: "officeDocumentDetails",
  //   entry: "/pages/Index/pages/office/pages/Document/details/index.js",
  //   level: 1
  // },
  {
    path: "/log-in",
    exact: true,
    name: "logIn",
    entry: "/pages/LogIn/index.js",
    level: 1
  },
  {
    path: "/register",
    name: "register",
    entry: "/pages/Register/index.js",
    level: 1
  }
];
