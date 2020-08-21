/*
 * @Descripttion: sit uat pre prod environment 用于区分 不同环境
 * @Author: heidous
 * @Date: 2020-07-29 11:20:14
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-20 15:51:19
 */
const environmentStr = process.env.ENVIRONMENT;
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
}
module.exports = environment;
