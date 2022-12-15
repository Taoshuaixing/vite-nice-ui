import {
	RouterHistory,
	RouteRecordRaw,
	RouteComponent,
	createWebHistory,
	createWebHashHistory,
	RouteRecordNormalized,
} from 'vue-router';
import { router } from './index';
import { isProxy, toRaw } from 'vue';
