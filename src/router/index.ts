import { createRouter, createWebHashHistory } from 'vue-router';
import pagesRouter from './RouterPage/page.ts';
const router = createRouter({
	history: createWebHashHistory(),
	routes: [...pagesRouter],
});
export default router;
