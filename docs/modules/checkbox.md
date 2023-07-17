# 多选框 Checkbox

在一组可选项中进行多项选择时使用，单独使用可以表示两种状态之间的切换，和 Switch 类似。

## 基本使用

<checkbox-basic />

::: details Show Code

<<<../examples/checkbox/basic.vue

:::

## 禁用

<checkbox-disabled />

::: details Show Code

<<<../examples/checkbox/disabled.vue

:::

## 全选

<checkbox-allcheck />

::: details Show Code

<<<../examples/checkbox/allcheck.vue

:::

## 垂直排列

<checkbox-vertical />

::: details Show Code

<<<../examples/checkbox/vertical.vue

:::

## 自定义间距

<checkbox-gap />

::: details Show Code

<<<../examples/checkbox/gap.vue

:::

## API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| options | 复选元素数据 | Option[] | [] |
| disabled | 是否禁用所有复选框 | boolean | false |
| vertical | 是否垂直排列 | boolean | false |
| value(v-model) | 当前选中的值 | any[] | [] |
| gap | 多个单选框之间的间距，单位px，垂直排列时，间距即垂直间距 | number | 8 |
| indeterminate | 全选时的样式控制 | boolean | false |
| checked(v-model) | 是否全选 | boolean | false |

## Option Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
label | 选项名 | string | true
value | 选项值 | any | true
disabled | 是否禁用选项 | boolean | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 变化时回调函数 | (value: any[]) => void
