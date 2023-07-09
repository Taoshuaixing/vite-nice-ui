/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 10:29:57
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-08 17:53:54
 */
import { createApp } from 'vue';
import './styles/style.less';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/router';
import ViteNiceUI from '../packages';

const app = createApp(App);
app.use(router).use(createPinia()).use(ViteNiceUI).mount('#app');
