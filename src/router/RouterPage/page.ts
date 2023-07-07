/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 14:20:26
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-07 14:22:02
 */
export default [
	{ path: '/', name: '主页', component: () => import('@/views/index.vue') },
	{
		path: '/niceui',
		name: '组件',
		component: () => import('@/views/home.vue'),
	},
];
