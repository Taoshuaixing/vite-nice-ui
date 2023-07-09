/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 14:20:26
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-09 18:58:47
 */
export default [
	{ path: '/', name: '首页', component: () => import('@/views/index.vue') },
	{
		path: '/niceui',
		name: '组件',
		component: () => import('@/views/home.vue'),
		// redirect: '/button',
		children: [
			{
				path: 'button',
				name: 'Button 按钮',
				component: () => import('../../../packages/button/doc/doc.md'),
			},
		],
	},
];
