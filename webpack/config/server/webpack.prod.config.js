const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { stringToObject, alias } = require("../../utils");
const rootPath = process.cwd();

module.exports = {
  output: {
    // path: path.join(__dirname, 'dist'),
    // filename:'bundle.js',
    // 配置 二级目录
    // publicPath
  },
  entry: {
    index: [
      // '@babel/polyfill',
      // "core-js/stable",
      // "regenerator-runtime/runtime",
      //添加编译缓存
      // "webpack/hot/poll?1000",
      path.join(process.cwd(), "/server/index.js")
    ]
  },
  watch: false,
  // context: path.join(process.cwd(), '/client'),
  devtool: "source-map",
  module: {
    rules: []
  },
  plugins: [new CleanWebpackPlugin()]
};
