/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-10 11:32:38
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-13 12:37:39
 */
import DefaultTheme from 'vitepress/theme';
import './reset.less'; // global less
import NiceUI from '../../../packages/index';
// import '../../../dist/style.css';
export default {
	extends: DefaultTheme, // or ...DefaultTheme
	enhanceApp({ app }) {
		app.use(NiceUI);
	},
};
