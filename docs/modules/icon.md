# 图标 Icon

由 vue-feather 强力驱动

## 图标列表

<icon-list />

## 不同颜色

<icon-colors />

::: details Show Code

<<<../examples/icon/colors.vue

:::

## 不同大小

<icon-size />

::: details Show Code

<<<../examples/icon/size.vue

:::

## 带动画

<icon-animation />

::: details Show Code

<<<../examples/icon/animation.vue

:::

## API

参数 | 类型 | 默认值 | 可选值 | 说明
| --- | --- | --- | --- | --- |
| animation | `string` | - | spin, pulse | 图标的动画类型 |
| animation-speed | `string` | - | slow, fast | 图标的动画速度 |
| fill | `string` | `"none"` | - | 图标的填充颜色 ([spec](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill)). |
| size | `number \| string` | `24` | - | 图标的大小。设置图标的宽度和高度 |
| stroke | `string` | `"currentColor"` | - | 图标的笔画颜色 ([spec](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke)). |
| stroke-linecap | `string` | `"round"` | butt, round, square | 指定打开子路径笔画时在其末尾使用的形状 ([spec](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap)). |
| stroke-linejoin | `string` | `"round"` | miter, round, bevel | 指定描边时在路径或基本形状的角处使用的形状 ([spec](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin)). |
| stroke-width | `number \| string` | `2` | - | 图标的笔画宽度 ([spec](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-width)). |
| tag | `string` | `"i"` | - | 图标的标签 |
| type | `string` | `"feather"` | All [Feather](https://feathericons.com/)'s icons. | 图标的类型. |