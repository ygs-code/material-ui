const baseConfig = require('./webpack.base.config.js');
const devConfig = require('./webpack.dev.config.js');
const prodConfig = require('./webpack.prod.config.js');
const webpackMerge = require('webpack-merge');

let {
    NODE_ENV, // 环境参数
    WEB_ENV, // 环境参数
    target, // 环境参数
    htmlWebpackPluginOptions = '',
} = process.env; // 环境参数
let config = {};
if (NODE_ENV == 'development') {
    config = webpackMerge(baseConfig, devConfig);
} else {
    config = webpackMerge(baseConfig, prodConfig);
}

module.exports = config;
