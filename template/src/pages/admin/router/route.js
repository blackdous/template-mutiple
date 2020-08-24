/*
 * @Descripttion: !! 默认通过 modules 目录读取 页面目录 (可以在这个文件中处理权限问题)
 * @Author: heidous
 * @Date: 2020-07-24 14:51:09
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-23 17:12:18
 */
export const routesModules = require.context('./modules', true, /\.js$/);
const routesConstant = [
  {
    name: 'Home',
    path: '/admin',
    meta: {
      title: '首页',
      icon: ''
    },
    component: () => import('@/pages/admin/views/home')
  }
];
let routes = [];
const requireAll = (context) => context.keys().map(context);
requireAll(routesModules).forEach((route) => {
  console.log(route.default);
  routes = routesConstant.concat(route.default);
});
console.log('routes: ', routes);
export default routes;
