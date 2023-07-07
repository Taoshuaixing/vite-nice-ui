/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 10:29:57
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-07 18:26:26
 */
import { createApp } from 'vue';
import './styles/style.less';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from '@/router';
import VueNiceUI from '../packages';

const app = createApp(App);
app.use(router).use(createPinia()).use(VueNiceUI).mount('#app');
