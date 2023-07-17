# 开关 Switch

开关选择器，在需要表示开关两种状态之间的切换时使用。


## 基本使用 

<switch-basic />

::: details Show Code

<<<../examples/switch/basic.vue

:::

## 禁用状态 

<switch-disabled />

::: details Show Code

<<<../examples/switch/disabled.vue

:::

## 带文字 

<switch-text />

::: details Show Code

<<<../examples/switch/text.vue

:::

## 自定义图标

<switch-custom />

::: details Show Code

<<<../examples/switch/custom.vue

:::

## API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| checkedInfo | 选中时的内容 | string | '' |
| uncheckedInfo | 未选中时的内容 | string | '' |
| disabled | 是否禁用 | boolean | false |
| checked(v-model) | 指定当前是否选中 | boolean | false |

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 变化时的回调 | (checked: boolean) => void