<!--
 * @Descripttion: 
 * @version: 
 * @Author: 陶帅星
 * @Date: 2023-07-10 16:01:58
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-13 12:25:45
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

> **直接引入（推荐）**

```vue
<script setup lang="ts">
import { NButton } from 'vite-nice-ui'
import 'vite-nice-ui/css'
</script>

<template>
  <n-button></n-button>
</template>
```

> **全局安装（不推荐）**

```ts
import { createApp } from 'vue'
import App from './App.vue'

import NiceUI from 'vite-nice-ui'
import 'vite-nice-ui/css'

const app = createApp(App)
app.use(NiceUI)

app.mount('#app')
```


