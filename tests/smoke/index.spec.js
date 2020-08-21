/* eslint-disable no-undef */
/*
 * @Descripttion: index.spec.js 冒烟测试
 * @Author: blackdous
 * @Date: 2020-07-23 08:09:23
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-21 15:48:23
 */

// const webpack = require('webpack');
// const rimraf = require('rimraf');
const path = require('path');
const glob = require('glob-all');
// const webpackConfig = path.join(__dirname, '../../build/webpack.prod.js');
const distPath = path.join(__dirname, '../../dist');
jest.setTimeout(10000);

describe('smoke test', () => {
  it('html test', (done) => {
    const files = glob.sync([`${distPath}/index.html`]);
    if (files.length === 1) {
      // console.log('files: ', files.length);
      done();
    }
  });
  it('css test', (done) => {
    const files = glob.sync([`${distPath}/public/static/css/**.css`]);
    // console.log('files: ', files);
    let stylecss = false;
    files.forEach((filePath) => {
      if (filePath.indexOf('app') !== -1) {
        stylecss = true;
      }
    });
    // console.log('stylecss: ', stylecss);
    if (files.length && stylecss) {
      done();
    }
  });
  it('common test', (done) => {
    const files = glob.sync([`${distPath}/public/static/js/**.js`]);
    let appjs = false;
    let vendorsjs = false;
    files.forEach((filePath) => {
      if (filePath.indexOf('app') !== -1) {
        appjs = true;
      }
      if (filePath.indexOf('vendor') !== -1) {
        vendorsjs = true;
      }
    });
    // console.log('appjs: ', appjs, vendorsjs);
    if (appjs && vendorsjs) {
      done();
    }
  });
});
