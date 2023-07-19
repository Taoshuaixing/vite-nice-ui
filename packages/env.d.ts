/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vite-nice-ui'
declare module 'vite-nice-ui/utils'
declare module 'lodash/throttle'
declare module '@vueuse/core'
declare module '@vueuse/components'
