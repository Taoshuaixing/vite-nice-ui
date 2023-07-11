/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-10 11:32:38
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-11 11:56:37
 */
import DefaultTheme from 'vitepress/theme';
import './reset.less'; // global less
import ViteNiceUI from '../../../packages/index';
// import '../../../dist/style.css';
export default {
	extends: DefaultTheme, // or ...DefaultTheme
	enhanceApp({ app }) {
		app.use(ViteNiceUI);
	},
};
