/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 10:29:57
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-13 13:34:33
 */
import { createApp } from 'vue';
import './styles/style.less';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/router';
import NiceUI from '../packages';
import 'vite-nice-ui/css';
import { dispatchEventStroage } from '@/utils/sessionStorage';

const app = createApp(App);
app
	.use(router)
	.use(createPinia())
	.use(NiceUI)
	.use(dispatchEventStroage)
	.mount('#app');
