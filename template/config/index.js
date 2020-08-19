/*
 * @Descripttion:
 * @Author: all
 * @Date: 2020-03-23 12:08:30
 * @LastEditors: heidous
 * @LastEditTime: 2020-07-30 17:25:18
 */

const path = require('path');
const environment = require('./environment');

module.exports = {
  // 开发环境中的配置
  dev: {
    // dev-server 配置
    host: '0.0.0.0',
    // 端口
    port: 8078,
    // 是否自动打开浏览器
    autoOpenBrowser: false,
    assetsSubDirectory: 'public/static',
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    devtool: 'cheap-module-eval-source-map',
    cacheBusting: true,
    cssSourceMap: true
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    productionSourceMap: true,
    cssSourceMap: false,
    assetsSubDirectory: 'public/static',
    // https://webpack.js.org/configuration/devtool/#production
    devtool: environment.debug ? 'cheap-source-map' : 'none',
    // 是否开启Gzip
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // 生成包分析
    bundleAnalyzerReport: process.env.npm_config_report
  },
  environment
};
