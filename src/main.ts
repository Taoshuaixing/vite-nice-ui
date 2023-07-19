/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 10:29:57
 * @LastEditors: Taoshuaixing 1554307063@qq.com
 * @LastEditTime: 2023-07-14 16:37:51
 */
import { createApp } from 'vue'
import '../packages/styles/style.less'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router'
import NiceUI from '../packages'
import 'vite-nice-ui/css'
import { dispatchEventStroage } from '@/utils/sessionStorage'

const app = createApp(App)
app.use(router).use(createPinia()).use(NiceUI).use(dispatchEventStroage).mount('#app')
