<!--
 * @Descripttion: 
 * @version: 
 * @Author: 陶帅星
 * @Date: 2023-07-10 16:01:58
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-10 16:03:43
-->
# 快速上手

## 安装

**With NPM**

```bash
$ npm i vite-nice-ui
```

**With YARN**

```bash
$ yarn add vite-nice-ui
```

**With PNPM**

```bash
$ pnpm i vite-nice-ui
# or
$ pnpm add vite-nice-ui
```

## 使用

> **Global**

```ts
import { createApp } from 'vue'
import App from './App.vue'

import VueAmazingUI from 'vite-nice-ui'
import 'vite-nice-ui/css'

const app = createApp(App)
app.use(ViteNiceUI)

app.mount('#app')
```

> **Local**

```vue
<script setup lang="ts">
import { nButton } from 'vite-nice-ui'
import 'vite-nice-ui/css'
</script>

<template>
  <Button></Button>
</template>
```
