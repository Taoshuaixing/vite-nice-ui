/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 14:12:47
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-09 18:15:50
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import pagesRouter from './modules/pages.ts';
const router = createRouter({
	history: createWebHashHistory(),
	scrollBehavior: (to: any) => {
		document.title = to.name + '-Nice UI';
		if (to.fullPath != '/') {
			// document.querySelector(".niceuirightView").scrollTop = 0;
		}
	},
	routes: [...pagesRouter],
});
export default router;
