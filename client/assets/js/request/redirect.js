/*
 * @Author: your name
 * @Date: 2021-08-12 14:33:50
 * @LastEditTime: 2021-09-29 15:39:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/js/request/redirect.js
 */
import { history, historyPush, routePaths } from "client/router";

import token from "./token";

export const codeMap = {
  // 未经授权。对于需要登录或身份验证的网页，服务器可能返回此响应。 需要重新登陆
  401: (errorInfo) => {
    let XHRQueue = (errorInfo && errorInfo[2] && errorInfo[2].XHRQueue) || [];
    localStorage.removeItem("token");

    token.clearQueue();
    //  停止剩余的请求
    for (let index = XHRQueue.length - 1; index >= 0; index--) {
      XHRQueue[index].xmlHttp && XHRQueue[index].xmlHttp.abort();
      XHRQueue.splice(index, 1);
    }

    //重定向到登录页面
    historyPush({
      history,
      url: routePaths.logIn
    });
  },

  // 服务器拒绝了你的地址请求。与管理员确认是否拥有请求权限。 已经登录，但是没有数据读写权限
  403: () => {},

  // 服务器未满足请求者在请求中设置的其中一个前提条件。
  412: () => {}
  // 415: () => {
  //   // historyPush({
  //   //   history,
  //   //   url: routePaths.logIn
  //   // });
  // }
};
