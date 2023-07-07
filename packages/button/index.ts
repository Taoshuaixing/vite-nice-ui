import type { App } from 'vue';
import nButton from './Button.vue';

// 使用install方法，在app.use挂载
nButton.install = (app: App) => {
	app.component(nButton.name as string, nButton);
};

export default nButton;
