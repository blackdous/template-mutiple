/*
 * @Descripttion: prodocution.config
 * @Author: asyncnode
 * @Date: 2020-03-23 12:08:30
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-23 17:58:09
 * @note: happypack/thread-loader 只用一个就可以 && TerserPlugin/HardSourceWebpackPlugin 同样
 */

// node内置path 模块
const path = require('path');
// webpack config合并模块
const merge = require('webpack-merge');
// copy静态文件插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 友好报错插件模块
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
// 清除文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// https://webpack.docschina.org/plugins/terser-webpack-plugin/
const TerserPlugin = require('terser-webpack-plugin');
// 基础配置
const baseWebpackConfig = require('./webpack.base');
// 全局配置
const config = require('../config');
// PWA
const WorkboxPlugin = require('workbox-webpack-plugin');
// 获取cssloader
const cssLoader = require('./loaders/cssLoader');

// tree-sheaking css 自己选择是否启用
const glob = require('glob');
const PurgecssPlugin = require('purgecss-webpack-plugin');
// 常用工具方法
const utils = require('./utils');
// // 硬盘缓存
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
// // 多进程加速
// const HappyPack = require('happypack');

// const PATHS = {
//   src: path.join(__dirname, 'src')
// }

// 正式环境 webpack 配置
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: [
          // 'happypack/loader'
          'cache-loader',
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },
  // 编译信息
  stats: {
    // 增加资源信息
    assets: true,
    // 添加缓存（但未构建）模块的信息
    cached: true,
    // 显示缓存的资源（将其设置为 `false` 则仅显示输出的文件）
    cachedAssets: true,
    // 添加 children 信息
    children: false,
    // 添加 chunk 信息（设置为 `false` 能允许较少的冗长输出）
    chunks: true,
    // 将构建模块信息添加到 chunk 信息
    // chunkModules: true,
    // chunkOrigins: true,
    chunkGroups: true,
    // `webpack --colors` 等同于
    colors: true,
    // 添加 --env information
    env: false,
    // 添加错误信息
    errors: true,
    // 添加错误的详细信息（就像解析日志一样）
    errorDetails: true,
    // 添加 compilation 的哈希值
    hash: false,
    // 添加构建模块信息
    modules: true,
    // 当文件大小超过 `performance.maxAssetSize` 时显示性能提示
    performance: true,
    // 添加时间信息
    timings: true,
    // 添加警告
    warnings: true
  },
  module: {
    rules: [].concat(
      cssLoader.styleLoaders({
        cssSourceMap: config.build.cssSourceMap,
        usePostCSS: true,
        extract: true
      })
    )
  },
  // 配置 js source-map
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        },
        vendor: {
          //第三方依赖
          priority: 1, //设置优先级，首先抽离第三方模块
          name: 'vendor',
          test: /(vue|vue-router|vuex)/,
          chunks: 'all',
          minSize: 0,
          minChunks: 1 //最少引入了1次
        },
        //缓存组
        common: {
          //公共模块
          chunks: 'all',
          name: 'common',
          minSize: 100, //大小超过100个字节
          minChunks: 2 //最少引入了3次
        }
      }
    },
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano')
      }),
      new TerserPlugin({
        terserOptions: {
          compress: {
            // turn off flags with small gains to speed up minification
            arrows: false,
            collapse_vars: false, // 0.3kb
            comparisons: false,
            computed_props: false,
            hoist_funs: false,
            hoist_props: false,
            hoist_vars: false,
            inline: false,
            loops: false,
            negate_iife: false,
            properties: false,
            reduce_funcs: false,
            reduce_vars: false,
            switches: false,
            toplevel: false,
            typeofs: false,

            // a few flags with noticable gains/speed ratio
            // numbers based on out of the box vendor bundle
            booleans: true, // 0.7kb
            if_return: true, // 0.4kb
            sequences: true, // 0.7kb
            unused: true, // 2.3kb

            // required features to drop conditional branches
            conditionals: true,
            dead_code: true,
            evaluate: true
          },
          mangle: {
            safari10: true
          }
        },
        parallel: true,
        cache: true,
        terserOptions: {
          compress: {
            warnings: !config.environment.debug,
            drop_console: config.environment.debug,
            drop_debugger: config.environment.debug,
            pure_funcs: config.environment.debug ? [] : ['console.log']
          }
        }
      })
    ]
    // minimizer: [new OptimizeCSSAssetsPlugin({
    //   assetNameRegExp: /\.css$/g,
    //   cssProcessor: require('cssnano')
    // }), new TerserPlugin({
    //   include: /\.min\.js$/
    // })]
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new HardSourceWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano')
    }),
    // 坑太多了 css tree-shaking
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true })
      // content: [`./public/**/*.html`, `./src/**/*.vue`],
    }),
    // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW
    new WorkboxPlugin.GenerateSW({
      // swDest: 'sw.js',
      cacheId: 'template-mutiple-cacheId',
      clientsClaim: true,
      skipWaiting: true,
      sourcemap: config.environment.debug
    }),
    // new FriendlyErrorsPlugin(),
    function() {
      this.hooks.done.tap('done', (stats) => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf('--watch') == -1
        ) {
          process.exit(1);
        }
      });
    }
    // new HappyPack({
    //   loaders: ['babel-loader?cacheDirectory=true']
    // }),
    // new HardSourceWebpackPlugin()
  ]
});

if (config.build.productionGzip) {
  // gzip配置
  const CompressionWebpackPlugin = require('compression-webpack-plugin');
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

module.exports = webpackConfig;
