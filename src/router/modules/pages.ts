/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 14:20:26
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-10 18:08:15
 */
export default [
	{ path: '/', name: '首页', component: () => import('@/layout/index.vue') },
	{
		path: '/niceui',
		name: '组件',
		component: () => import('@/layout/home.vue'),
		redirect: 'niceui/started',
		children: [
			{
				path: 'started',
				name: 'Started',
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
];
