/*
 * @Descripttion: user.route.js
 * @Author: heidous
 * @Date: 2020-07-29 08:54:38
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-23 12:57:21
 */
const userRouter = [
  {
    name: 'UserInfo',
    path: '/admin/userinfo',
    meta: { title: '用户信息', icon: '' },
    component: () => import('@/pages/admin/views/user/info')
  },
  {
    name: 'UserDetail',
    path: '/admin/userdetail',
    meta: { title: '用户详情', icon: '' },
    component: () => import('@/pages/admin/views/user/detail')
  }
];
export default userRouter;
