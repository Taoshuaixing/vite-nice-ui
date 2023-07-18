# 分割线 Divider

划分空间的线，用于隔开内容。

## 基本使用

<divider-basic />

::: details Show Code

<<<../examples/divider/basic.vue

:::

## 带文字 指定文字位置

可选择文字位置 'left' | 'center' | 'right'

<divider-text />

::: details Show Code

<<<../examples/divider/text.vue

:::

## 虚线

<divider-dashed />

::: details Show Code

<<<../examples/divider/dashed.vue

:::

## 自定义线宽

*线宽3px*

<divider-custom />

::: details Show Code

<<<../examples/divider/custom.vue

:::

## API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| dashed | 是否为虚线 | boolean | false |
| position | 分割线标题的位置 | 'left' | 'center' | 'right' | 'center' |
| positionMargin | 标题和最近 left/right 边框之间的距离，去除了分割线，同时 position 必须为 left 或 right | string | number | '' |
| borderWidth | 分割线宽度，单位px | number | 1 |