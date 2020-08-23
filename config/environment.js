/*
 * @Descripttion: sit uat pre prod environment 用于区分 不同环境
 * @Author: heidous
 * @Date: 2020-07-29 11:20:14
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-23 22:09:05
 */
const argv = require('yargs').argv;
const environmentStr = argv.ENVIRONMENT || process.env.ENVIRONMENT;
console.log('environmentStr: ', environmentStr);
let environment = {};
switch (environmentStr) {
  case 'sit':
    environment = {
      fetchUrl: 'http://www.google.com/sit',
      debug: true
    };
    break;
  case 'uat':
    environment = {
      fetchUrl: 'http://www.google.com/uat',
      debug: true
    };
    break;
  case 'pre':
    environment = {
      fetchUrl: 'http://www.google.com/pre',
      debug: false
    };
    break;
  case 'prod':
    environment = {
      fetchUrl: 'http://www.google.com/prod',
      debug: false
    };
    break;
  default:
    console.log(111);
    environment = {
      fetchUrl: 'http://www.google.com/prod',
      debug: false
    };
}
module.exports = environment;
