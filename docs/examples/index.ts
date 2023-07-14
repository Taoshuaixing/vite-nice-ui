/*
 * @Author: Taoshuaixing 1554307063@qq.com
 * @Date: 2023-07-14 16:32:30
 * @LastEditors: Taoshuaixing 1554307063@qq.com
 * @LastEditTime: 2023-07-14 19:16:22
 * @FilePath: /vite-nice-ui/docs/examples/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp, defineAsyncComponent } from 'vue'

export default {
  install: function (app: ReturnType<typeof createApp>): void {
    const modules: any = import.meta.glob('./*/*.vue')
    Object.keys(modules).forEach((key: string) => {
      // 拼接组件名
      // const files = `${key
      //   .split('/')[1]
      //   .toLowerCase()
      //   .replace(/( |^)[a-z]/g, L => L.toUpperCase())}-${key
      //   .split('/')[2]
      //   .replace(/( |^)[a-z]/g, L => L.toUpperCase())
      //   .split('.')
      //   .shift()}`
      const files = `${key.split('/')[1]}-${key.split('/')[2].split('.').shift()}`
      console.log(files)
      const AsyncComponent = defineAsyncComponent(modules[key])
      console.log(AsyncComponent)

      app.component(files, AsyncComponent)
    })
  },
}
