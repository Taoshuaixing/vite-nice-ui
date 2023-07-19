# 数字输入框 InputNumber

需要获取数值时，可以通过鼠标或键盘，输入范围内的数值。


## 基本使用

<input-number-basic />

::: details Show Code

<<<../examples/input-number/basic.vue

:::

## 步长为小数

<input-number-decimal />

::: details Show Code

<<<../examples/input-number/decimal.vue

:::

## 设置数值精度

<input-number-precision />

::: details Show Code

<<<../examples/input-number/precision.vue

:::

## 设置数值精度

<input-number-precision />

::: details Show Code

<<<../examples/input-number/precision.vue

:::

## 自定义min max

<input-number-custom-size />

::: details Show Code

<<<../examples/input-number/custom-size.vue

:::

## 添加前缀图标

<input-number-icon />

::: details Show Code

<<<../examples/input-number/icon.vue

:::

## API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| width | 输入框宽度，单位px | number | 90 |
| min | 最小值 | number | -Infinity |
| max | 最大值 | number | Infinity |
| step | 每次改变步数，可以为小数 | number | 1 |
| precision | 数值精度 | number | 0 |
| prefix | 前缀图标 | string &#124; slot | '' |
| formatter | 指定展示值的格式 | Funtion | (value: string) => value |
| keyboard | 是否启用键盘快捷键行为（上方向键增，下方向键减） | boolean | true |
| value(v-model) | 当前值 | number &#124; null | null |

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 变化回调 | (value: number) => void