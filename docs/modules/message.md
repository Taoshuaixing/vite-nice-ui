# 全局提示 Message

全局展示操作反馈信息

## 基本使用

- 可提供成功、警告和错误等反馈信息
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式

<message-basic />

::: details Show Code

<<<../examples/message/basic.vue

:::

## 不同状态

可根据 Message 参数的 type 来定义显示不同的状态。

<message-state />

::: details Show Code

<<<../examples/message/state.vue

:::

## 自定义配置

可根据不同场景自定义 icon 图标及 timeout 消失时间。

<message-custom />

::: details Show Code

<<<../examples/message/custom.vue

:::

## API

参数 | 类型 | 默认值 | 可选值 | 说明
| --- | --- | --- | --- | --- |
text	|	String|VNode	|	——	|	——	|	消息提示文本内容
type	|	String	|	info	|	info / warn / error / success / custom	|	消息提示类型
icon	|	String	|	——	|	参考图标库	|	消息提示Icon图标
timeout	|	String	|	2500	|	——	|	消息提示框消失时间（单位：毫秒ms）
textColor	|	String	|	——	|	——	|	文本颜色，type 为 custom 时有效
bgColor	|	String	|	——	|	——	|	背景颜色，type 为 custom 时有效
customClass	|	String	|	——	|	——	|	自定义组件类名