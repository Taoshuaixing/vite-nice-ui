/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 17:54:26
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-13 12:42:39
 */
import type { App } from 'vue'
import './styles/var.less'
import { dateFormat, requestAnimationFrame, cancelAnimationFrame, rafTimeout, cancelRaf, throttle, debounce, add, downloadFile, moneyFormat } from './utils'
// 全局 => 定义 install 方法
import * as components from './components'
import Message from './components/message'

export * from './components'

const install: any = (Vue: App): void => {
  if (install.installed) return

  const _components = Object.keys(components).map(key => components[key as keyof typeof components])

  _components.forEach((component: any) => {
    if (component.hasOwnProperty('name') || component.hasOwnProperty('__name')) {
      // console.log(component)

      Vue.component(`${component.__name || component.name}`, component)
    }
  })
}
export { dateFormat, requestAnimationFrame, cancelAnimationFrame, rafTimeout, cancelRaf, throttle, debounce, add, downloadFile, moneyFormat }
export default { install, Message }
