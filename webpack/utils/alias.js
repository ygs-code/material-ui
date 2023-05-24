const path = require("path");

module.exports = {
  // "ag-grid-community": path.join(
  //   process.cwd(),
  //   "/client/node_modules/ag-grid-community"
  // ),
  // 路径配置
  "@": path.join(process.cwd()),
  client: path.join(process.cwd(), "/client"),
  server: path.join(process.cwd(), "/server")
};
