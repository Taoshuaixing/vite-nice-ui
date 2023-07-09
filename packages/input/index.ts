import type { App } from 'vue';
import nInput from './Input.vue';

// 使用install方法，在app.use挂载
nInput.install = (app: App) => {
	app.component(nInput.name as string, nInput);
};

export default nInput;
