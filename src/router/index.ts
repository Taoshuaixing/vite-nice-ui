import {
	Router,
	createRouter,
	RouteRecordRaw,
	RouteComponent,
} from 'vue-router';

import homeRouter from './modules/home';
import errorRouter from './modules/error';
import remainingRouter from './modules/remaining';
import NProgress from '@/utils/progress';

/** 原始静态路由（未做任何处理） */
const routes = [homeRouter, errorRouter];

export const router: Router = createRouter({
	history: createWebHashHistory(),
	routes: [
		//...
	],
});
export default router;
function createWebHashHistory(): import('vue-router').RouterHistory {
	throw new Error('Function not implemented.');
}
