/*
 * @Descripttion: dev.js local webpack options
 * @Author: all
 * @Date: 2020-03-23 12:08:30
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-21 09:24:36
 */

// node内置path 模块
const path = require('path');
// webpack模块
const webpack = require('webpack');
// webpack config合并模块
const merge = require('webpack-merge');
const portfinder = require('portfinder');
// 友好报错插件模块
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// 基础配置
const baseWebpackConfig = require('./webpack.base');
// 全局配置
const config = require('../config');
// 获取cssloader
const cssLoader = require('./loaders/cssLoader');
const packageConfig = require('../package.json')

const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

// 开发环境 webpack 配置
const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      }
    ].concat(
      cssLoader.styleLoaders({
        cssSourceMap: config.dev.cssSourceMap,
        usePostCSS: true
      })
    )
  },
  stats: 'errors-only',
  // 配置 js source-map
  devtool: config.dev.devtool,
  // 配置devserver
  devServer: {
    // 兼容 浏览器 没有 eslint插件
    overlay: true,
    // 日志等级
    clientLogLevel: 'warning',
    // 启用 webpack 的 模块热替换 功能：
    hot: true,
    quiet: true, // necessary for FriendlyErrorsPlugin
    // hotOnly: true,
    // contentBase: './dist', // since we use CopyWebpackPlugin.
    // contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    // TODO: router history模式防止刷新无效果
    historyApiFallback: true
    // lazy: true,
    // inline: false, // https://www.webpackjs.com/configuration/dev-server/#devserver-inline
    // proxy: {}, // http-proxy-middleware
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // 配合vue-loader使用
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      }
    })
  ]
});
// 如果端口占用自动找寻端口
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port;
      // add port to devServer config
      devWebpackConfig.devServer.port = port;

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${
                devWebpackConfig.devServer.host
              }:${port}`
            ]
          },
          onErrors: (severity, errors) => {
            if (severity !== 'error') return
            const error = errors[0]
            const filename = error.file && error.file.split('!').pop()
            notifier.notify({
              title: packageConfig.name,
              message: severity + ': ' + error.name,
              subtitle: filename || '',
              icon: path.join(__dirname, 'logo.png')
            })
          }
        })
      );
      resolve(devWebpackConfig);
    }
  });
});
