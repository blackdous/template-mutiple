'use strict';
const path = require('path');
const config = require('../config');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// webpack进度条
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
// copy静态文件插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 多线程打包
const threadLoader = require('thread-loader');
// 判断是否为production
const isProd = process.env.NODE_ENV === 'production';
// 常用工具方法
const utils = require('./utils');
const webpack = require('webpack');
// 获取cssloader
const tsloader = require('./loaders/tsloader');
// console.log('utils.entries(): ', utils.entries());
// console.log('utils.htmlPlugin(): ', utils.htmlPlugin());
threadLoader.warmup(
  {
    // pool options, like passed to loader options
    // must match loader options to boot the correct pool
  },
  ['babel-loader', 'sass-loader', 'vue-loader', 'css-loader']
);

// 基础 文件配置
module.exports = {
  // noParse 用于屏蔽一些 lodash|jquery等等静态库
  // context: false,
  context: path.resolve(__dirname, '../'),
  // https://webpack.docschina.org/concepts/mode/
  mode: 'development',
  // https://webpack.docschina.org/concepts/entry-points/
  entry: utils.entries(),
  // entry: {
  //   admin: './src/pages/admin/main.js'
  // },
  // https://webpack.docschina.org/concepts/output/
  output: {
    // 输出目录
    path: config.build.assetsRoot,
    publicPath: '/',
    // 文件名称
    filename: '[name].[hash].bundle.js'
  },
  // https://webpack.docschina.org/configuration/resolve/#resolve
  resolve: {
    // 自动解析确定的扩展
    extensions: ['.js', '.vue', '.json', '.ts', '.tsx'],
    // 路径别名
    alias: {
      // 引入vue-conplier
      vue$: 'vue/dist/vue.esm.js',
      '@': utils.resolve('src'),
      '@page': utils.resolve('src/pages'),
      '@public': utils.resolve('public'),
      '@com': utils.resolve('src/components'),
      '@examples': utils.resolve('src/examples'),
      '@router': utils.resolve('src/router'),
      '@store': utils.resolve('src/store')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: isProd
          ? [
              // 'thread-loader',
              'cache-loader',
              'babel-loader',
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  appendTsSuffixTo: [/\.vue$/],
                  appendTsxSuffixTo: [/\.vue$/]
                }
              }
            ]
          : [
              'babel-loader',
              {
                loader: 'ts-loader',
                options: {
                  transpileOnly: true,
                  appendTsSuffixTo: [/\.vue$/],
                  appendTsxSuffixTo: [/\.vue$/]
                }
              }
            ]
      },
      // vue-loader
      {
        test: /\.vue$/,
        use: isProd ? ['thread-loader', 'vue-loader'] : ['vue-loader']
      },
      // 图片配置
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          output: 'public/static/images/',
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            // 压缩图片
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: true
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              },
              webp: {
                quality: 75
              },
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../public/static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    function () {
      this.hooks.done.tap('done', (stats) => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf('--watch') == -1
        ) {
          console.log(stats.compilation.errors);
          process.exit(1);
        }
      });
    }
    // ],
  ].concat(utils.htmlPlugin()),
  optimization: {
    // runtimeChunk: {
    //   name: 'runtime'
    // },
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        }
      }
    }
  },
  performance: false,
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
