import type { RouteConfigsTable } from '/#/index';
const Layout = () => import('@/layout/index.vue');

const remainingRouter: Array<RouteConfigsTable> = [
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登陆',
			showLink: false,
			rank: 101,
		},
	},
];
export default remainingRouter;
