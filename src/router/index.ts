/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 14:12:47
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-13 16:13:37
 */
import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  { path: '/', name: '首页', component: () => import('@/layout/index.vue') },
  {
    path: '/niceui',
    name: '组件',
    component: () => import('@/layout/Home.vue'),
    redirect: 'niceui/started',
    children: [
      {
        path: 'started',
        name: 'Started 快速上手',
        component: () => import('@/views/Started.vue'),
      },
      {
        path: 'button',
        name: 'Button 按钮',
        component: () => import('@/views/Button.vue'),
      },
      {
        path: 'input',
        name: 'Input 输入框',
        component: () => import('@/views/Input.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

//全局前置路由守卫
router.beforeEach((to, from) => {
  const title: any = to.name
  document.title = title.split(' ')[1] + ' - Nice UI'
})
export default router
