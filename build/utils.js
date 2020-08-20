/*
 * @Descripttion: utils
 * @Author: all
 * @Date: 2020-07-16 17:42:42
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-20 18:18:39
 */ 
const path = require('path');
const config = require('../config');
// html输出配置
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.assetsPath = function (_path) {
  const assetsSubDirectory =
    process.env.NODE_ENV === 'production'
      ? config.build.assetsSubDirectory
      : config.dev.assetsSubDirectory;

  return path.posix.join(assetsSubDirectory, _path);
};
exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir);
};

// 多入口配置
exports.entries = function () {
  var entryFiles = glob.sync(path.join(__dirname, './src/*/index.html'))
  console.log('entryFiles: ', Object.keys(entryFiles));
}