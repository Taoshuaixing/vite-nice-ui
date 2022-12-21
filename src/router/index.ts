import {
	Router,
	createRouter,
	RouteRecordRaw,
	RouteComponent,
} from 'vue-router';
import {
	ascending,
	initRouter,
	isOneOfArray,
	getHistoryMode,
	findRouteByPath,
	handleAliveRoute,
	formatTwoStageRoutes,
	formatFlatteningRoutes,
} from './utils';
import {
	buildHierarchyTree,
	openLink,
	isUrl,
	storageSession,
} from '@pureadmin/utils';
import homeRouter from './modules/home';
import errorRouter from './modules/error';
import remainingRouter from './modules/remaining';
import NProgress from '@/utils/progress';

/** 原始静态路由（未做任何处理） */
const routes = [homeRouter, errorRouter];

export const constantRoutes: Array<RouteRecordRaw> = formatTwoStageRoutes(
	formatFlatteningRoutes(buildHierarchyTree(ascending(routes)))
);
export const router: Router = createRouter({
	history: createWebHashHistory(),
	routes: [
		//...
	],
});
export default router;
