# 模态框 Modal

全局信息提示，一般用于展示一些重要信息或者重要操作。

## 基本使用 

<modal-basic />

::: details Show Code

<<<../examples/modal/basic.vue

:::

## 信息展示

<modal-info />

::: details Show Code

<<<../examples/modal/info.vue

:::

## 模态框显示位置

<modal-position />

::: details Show Code

<<<../examples/modal/position.vue

:::

## API

参数 | 说明 | 类型 | 默认值 | 
-- | -- | -- | -- | 
width | 提示框宽度，单位px | number | 420 | 
cancelText | 取消按钮文字 | string | '取消' | 
okText | 确认按钮文字 | string | '确定' | 
noticeText | 通知按钮文字 | string | '知道了' | 
center | 水平垂直居中：true，固定高度水平居中：false | boolean | true | 
top | 固定高度水平居中时，距顶部高度，单位px | number | 100 | 
loading | 加载中 | boolean | false | 
visible | 是否可见 | boolean | false | 

## Events

事件名称 | 说明 | 参数
-- | -- | --
cancel | 点击遮罩层或取消按钮的回调 | () => void
ok | 点击确定回调 | () => void
know | 点击知道了的回调 | () => void