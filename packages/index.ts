/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 17:54:26
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-08 19:30:16
 */
import type { App } from 'vue';

import nButton from './button/index';
import nInput from './input/index';

// 所有组件
const components = [nButton, nInput];
console.log('components:', components);
//定义install方法
const install = (app: App): void => {
	components.forEach((component) => {
		app.component(component.name, component);
	});
};

export { nButton, nInput };
const ViteNiceUI = {
	install,
};
export default ViteNiceUI;
