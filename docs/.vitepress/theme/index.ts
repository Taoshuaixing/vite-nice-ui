/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-10 11:32:38
 * @LastEditors: Taoshuaixing 1554307063@qq.com
 * @LastEditTime: 2023-07-14 19:12:46
 */
import DefaultTheme from 'vitepress/theme'
import './reset.less' // global less
import NiceUI from '../../../packages/index'
import components from '../../examples/index'

// import '../../../dist/style.css';

export default {
  extends: DefaultTheme, // or ...DefaultTheme
  enhanceApp({ app }) {
    app.use(NiceUI)
    app.use(components)
  },
}
