import { createApp, defineAsyncComponent } from 'vue'
//批量全局注册demo组件
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
      const AsyncComponent = defineAsyncComponent(modules[key])
      app.component(files, AsyncComponent)
    })
  },
}
