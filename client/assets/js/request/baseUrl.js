/*
 * @Author: your name
 * @Date: 2020-11-11 11:21:09
 * @LastEditTime: 2021-09-30 12:01:20
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /error-sytem/client/src/common/js/request/baseUrl.js
 */
const { env: { NODE_ENV, ENTRY_SERVER_NAME } = {} } = process;
let baseUrl = "";
if (NODE_ENV === "development") {
  baseUrl = "http://127.0.0.1:3003/api/";
}
if (NODE_ENV === "production") {
  baseUrl = `http://${ENTRY_SERVER_NAME}/api/`;
}

export default baseUrl;
