/*
 * @Descripttion: user.route.js
 * @Author: heidous
 * @Date: 2020-07-29 08:54:38
 * @LastEditors: heidous
 * @LastEditTime: 2020-07-29 10:35:31
 */
const userRouter = [
  {
    name: 'UserInfo',
    path: '/userinfo',
    meta: { title: '用户信息', icon: '' },
    component: () => import('@/pages/user/info')
  },
  {
    name: 'UserDetail',
    path: '/userdetail',
    meta: { title: '用户详情', icon: '' },
    component: () =>
      import(/* webpackChunkName: "user" */ '@/pages/user/detail')
  }
];
export default userRouter;
