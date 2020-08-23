/*
 * @Descripttion: utils
 * @Author: all
 * @Date: 2020-07-16 17:42:42
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-23 17:42:42
 */

const path = require('path');
const config = require('../config');

const glob = require('glob');
// html输出配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const PathFiles = path.join(__dirname, '../src/pages');
// 取得相应的页面路径，因为之前的配置，所以是src文件夹下的pages文件夹
var PAGE_PATH = path.resolve(__dirname, '../src/pages');
// 用于做相应的merge处理
var merge = require('webpack-merge');
//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
exports.entries = function () {
  var entryFiles = glob.sync(PAGE_PATH + '/*/*.js');
  var map = {};
  entryFiles.forEach((filePath) => {
    var filename = filePath.substring(
      filePath.lastIndexOf('/') + 1,
      filePath.lastIndexOf('.')
    );
    map[filename] = filePath;
  });
  return map;
};

const rewrites = [];

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function () {
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html');
  let arr = [];
  let htmlNameList = entryHtml.map((filePath) => {
    return filePath.substring(
      filePath.lastIndexOf('/') + 1,
      filePath.lastIndexOf('.')
    );
  });
  console.log('htmlNameList: ', htmlNameList);
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(
      filePath.lastIndexOf('/') + 1,
      filePath.lastIndexOf('.')
    );
    let excludeChunks = htmlNameList.filter((item) => filename !== item);
    let conf = {
      // 模板来源
      template: filePath,
      // 文件名称
      filename: filename + '.html',
      hash: true,
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      // chunks: chunks,
      excludeChunks: excludeChunks,
      inject: true
    };
    // history模式下 页面指向修改
    let rewrite = {
      from: new RegExp(`^\/${filename}\/.*$`),
      to: filename + '.html'
      // to: filePath
    };
    rewrites.push(rewrite);
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeAttributeQuotes: true,
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: !config.environment.debug
        },
        chunksSortMode: 'dependency'
      });
    }
    arr.push(new HtmlWebpackPlugin(conf));
  });
  return arr;
};
exports.rewrites = rewrites;
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
