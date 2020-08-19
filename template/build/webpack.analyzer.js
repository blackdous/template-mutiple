/*
 * @Descripttion: analyzer build 分析打包
 * @Author: all
 * @Date: 2020-07-16 16:18:39
 * @LastEditors: all
 * @LastEditTime: 2020-07-16 16:34:50
 */ 
// 包分析插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 打包过程中消耗的时间进行精确的统计
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// 初始化
const smp = new SpeedMeasurePlugin();

// 基础配置
const prodWebpackConfig = require("./webpack.prod");
const webpackMerge = require('webpack-merge');

const analyzerWebpackConfig = webpackMerge(prodWebpackConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: '127.0.0.1',
      analyzerPort: 8888,
      reportFilename: 'report.html',
      defaultSizes: 'parsed',
      openAnalyzer: true,
      generateStatsFile: false,
      statsFilename: 'stats.json',
      logLevel: 'info'
    })
  ]
})

module.exports = smp.wrap(analyzerWebpackConfig);