
# 按钮 Button

常用组件，用于响应某些时间或者处理某些逻辑

## 基本使用

<button-basic />

::: details Show Code

<<<../examples/button/basic.vue

:::

## 大、中、小三种尺寸

<button-size />

::: details Show Code

<<<../examples/button/size.vue

:::

## 自定义样式

<button-style />

::: details Show Code

<<<../examples/button/style.vue

:::

## 加载中状态


<button-loading />

::: details Show Code

<<<../examples/button/loading.vue

:::


## APIs

参数 | 说明 | 类型 | 默认值 | 必传
-- | -- | -- | -- | --
name | 默认文本 | string &#124; slot | '按钮' | false
type | 类型 | 'default' &#124; 'primary' &#124; 'danger' | 'default' | false
effect | 悬浮变化效果，只有 type 为 default 时，effect 才生效 | 'fade' &#124; 'reverse' | ''
size | 尺寸 | 'small' &#124; 'middle' &#124; 'large' | '_self' | false
width | 宽度，优先级高于 size 属性，为0时自适应内容的宽度 | number | 0 | false
height | 高度，优先级高于 size 属性 | number | 0 | false
borderRadius | 圆角，单位px | number | 5 | false
route | 跳转目标URL地址 | {path?: string&#44; query?: object} | {} | false
target | 如何打开目标URL，设置 route 时生效 | '_self' &#124; '_blank' | '_self' | false
disabled | 是否禁用 | boolean | false | false
loading | 是否加载中 | boolean | false | false
center | 是否将按钮设置为块级元素并居中展示 | boolean | false | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
click | 点击按钮时的回调，未设置 route 时生效 | (e: Event) => void
