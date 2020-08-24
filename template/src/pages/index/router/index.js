/*
 * @Descripttion: init Vue-router
 * @Author: heidous
 * @Date: 2020-07-24 14:46:43
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-23 12:15:30
 */
import Vue from 'vue';
import Router from 'vue-router';
import routes from './route';
Vue.use(Router);

const router = new Router({
  mode: 'history', // history \ abstrct \ hash
  routes: routes
});
// * https://router.vuejs.org/api/#router-addroutes
// 动态加载路由 addRoutes
// * https://router.vuejs.org/api/#router-instance-methods
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'template-sap';
  next();
  // console.log('to, from, next: ', to, from, next);
});
router.onError((error) => {
  console.error(error);
});

export default router;
