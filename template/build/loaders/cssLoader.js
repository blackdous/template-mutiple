/*
 * @Descripttion: sass/less/stylus/css/postcss 浏览器配置
 * @Author: all
 * @Date: 2020-07-16 09:18:20
 * @LastEditors: all
 * @LastEditTime: 2020-07-16 17:58:15
 */

//  css压缩提取插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

exports.cssLoadersOptions = function(options) {
  options = options || {};
  const cssloader = {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      sourceMap: options.cssSourceMap
    }
  };
  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.cssSourceMap
    }
  };
  function generateLoaders(loader, loaderOptions, otherOPtions) {
    const loaders = options.usePostCSS
      ? [cssloader, postcssLoader]
      : [cssloader];

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.cssSourceMap
        })
      });
    }

    if (options.extract) {
      loaders.unshift(MiniCssExtractPlugin.loader);
    } else {
      loaders.unshift({
        loader: 'style-loader',
        options: Object.assign(
          {},
          {
            insert: 'head', // 样式插入到 <head>
            injectType: 'singletonStyleTag' // 将所有的style标签合并成一个
          }
        )
      });
    }
    if (otherOPtions && otherOPtions.sassCommon && loader === 'sass') {
      loaders.push({
        loader: 'sass-resources-loader',
        options: {
          resources: path.resolve(__dirname, '../../src/asstes/scss/index.scss')
        }
      });
    }
    return loaders;
  }
  return {
    css: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {}, { sassCommon: true }),
    scss: generateLoaders('sass', {}, { sassCommon: true }),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  };
};

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  const output = [];
  const loaders = exports.cssLoadersOptions(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    });
  }

  return output;
};
