/*
 * @Descripttion: user.route.js
 * @Author: heidous
 * @Date: 2020-07-29 08:54:38
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-22 21:46:52
 */
const userRouter = [
  {
    name: 'UserInfo',
    path: '/userinfo',
    meta: { title: '用户信息', icon: '' },
    component: () => import('@/pages/index/views/user/info')
  },
  {
    name: 'UserDetail',
    path: '/userdetail',
    meta: { title: '用户详情', icon: '' },
    component: () => import('@/pages/index/views/user/detail')
  }
];
export default userRouter;
