/*
 * @Descripttion: npm run build && npm run start 运行打包好的代码
 * @Author: all
 * @Date: 2020-07-16 18:19:30
 * @LastEditors: all
 * @LastEditTime: 2020-07-17 10:44:43
 */

const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const static = require('koa-static');
const path = require('path');
const bodyParser = require('koa-bodyParser');

app.use(bodyParser())

const staticPath = '../dist';
app.use(static(path.join(__dirname, staticPath)));
// app.use(require())
const hostname = "127.0.0.1";
const port = 7087;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});