/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 17:54:26
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-07 18:01:41
 */
import type { App } from 'vue';

import nButton from './button/index';

// 所有组件
const components = [nButton];
console.log('components:', components);
//定义install方法
const install = (app: App): void => {
	components.forEach((component) => {
		app.component(component.name, component);
	});
};

export { nButton };
const ViteNiceUI = {
	install,
};
export default ViteNiceUI;
