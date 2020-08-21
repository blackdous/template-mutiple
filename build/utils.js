/*
 * @Descripttion: utils
 * @Author: all
 * @Date: 2020-07-16 17:42:42
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-21 18:01:19
 */ 
const path = require('path');
const config = require('../config');

const glob = require('glob');
// html输出配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PathFiles = path.join(__dirname, '../src/pages');

exports.entries = function () {
  var entryFiles = glob.sync(PathFiles + '/*/main.js')
  console.log('entryFiles: ', Object.keys(entryFiles));
}

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
