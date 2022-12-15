import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import { setupStore } from '@/store';
import ElementPlus from 'element-plus';
import { MotionPlugin } from '@vueuse/motion';

const app = createApp(App);
app.use(router);
app.use(MotionPlugin).use(ElementPlus);
setupStore(app);
app.mount('#app');
