# 空状态 Empty

空状态时的展示占位图，当没有数据时，用于显式的用户提示。

## 基本使用

**预置风格 1**

<n-empty />

::: details Show Code

```vue
<template>
  <n-empty />
</template>
```

:::

**预置风格 2**

<n-empty image="2" />

::: details Show Code

```vue
<template>
  <n-empty image="2" />
</template>
```

:::

## 无描述

<n-empty :description="null" />

::: details Show Code

```vue
<template>
  <n-empty :description="null" />
</template>
```

:::

## 自定义

自定义图片地址、描述内容和样式

<n-empty
  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
  :image-style="{
    width: '100px',
    height: '60px'
  }">
  <template #description>
    <span>
      Customize
      <a href="#API">Description</a>
    </span>
  </template>
</n-empty>

::: details Show Code

```vue

<template>
  <n-empty
  image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
  :image-style="{
    width: '100px',
    height: '60px'
  }">
  <template #description>
    <span>
      Customize
      <a href="#API">Description</a>
    </span>
  </template>
</n-empty>
</template>

```

:::

## APIs

