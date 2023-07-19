# 单选框 Radio

常用组件，用于在多个备选项中选中单个状态

## 基本使用

<radio-basic />

::: details Show Code

<<<../examples/radio/basic.vue

:::

## 禁用 & 部分禁用

<radio-disabled />

<radio-disabled-part />

::: details Show Code

::: code-group

<<<../examples/radio/basic.vue [禁用]

<<<../examples/radio/disabled-part.vue [部分禁用]

:::

## 支持垂直排列 vertical，自定义间距 gap。效果参考checkbox

## API

参数 | 说明 | 类型 | 默认值 | 
-- | -- | -- | -- | 
options | 单选元素数据 | Option[] | [] | 
disabled | 是否禁用 | boolean | false | 
vertical | 是否垂直排列 | boolean | false | 
value(v-model) | 当前选中的值 | any | null | 
gap | 多个单选框之间的间距，单位px，垂直排列时，间距即垂直间距 | number | 8 | 

## Option Type

名称 | 说明 | 类型 | 
-- | -- | -- | 
label | 选项名 | string | 
value | 选项值 | any | 
disabled | 是否禁用单个单选器 | boolean | 

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 选项变化时的回调函数 | (value: any) => void