/// <reference types="vite/client" />
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const vueComponent: DefineComponent<{}, {}, any>
//   export default vueComponent
// }

declare module '*.js'
declare module '*.gz'
interface Window {
  rafTimeout: Function
}
