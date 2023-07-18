# 图片 Image

不可或缺的组件，支持预览模式。

## 基本使用

<image-basic />

::: details Show Code

<<<../examples/image/basic.vue

:::

## 可预览模式

<image-preview-mode />

::: details Show Code

<<<../examples/image/preview-mode.vue

:::

## 多张图片预览

可循环切换图片，并支持键盘 (left / right / up / down) 按键切换

<image-more />

::: details Show Code

<<<../examples/image/more.vue

:::

## 相册模式

只显示首张，通过键盘按钮控制切换

<image-album />

::: details Show Code

<<<../examples/image/album.vue

:::


## 自定义配置

更改缩放比率和最大最小缩放比例

<image-custom />

::: details Show Code

<<<../examples/image/custom.vue

:::



## API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| src | 图像地址 | 图像地址数组 | string | Image[] | '' |
| name | 图像名称，没有传入图片名时自动从图像地址src中读取 | string | '' |
| previewMode | 是否为可预览模式 | boolean | false |
| width | 图像宽度，单位px | string | number | 300 |
| height | 图像高度，单位px | string | number | '100%' |
| fit | 图像如何适应容器高度和宽度，可选 fill(填充)、contain(等比缩放包含)、cover(等比缩放覆盖) | 'contain' | 'fill' | 'cover' | 'contain' |
| preview | 预览文本 | string | slot | '预览' |
| zoomRatio | 每次缩放比率 | number | 0.1 |
| minZoomScale | 最小缩放比例 | number | 0.1 |
| maxZoomScale | 最大缩放比例 | number | 10 |
| resetOnDbclick | 缩放移动旋转图片后，是否可以双击还原 | boolean | true |
| loop | 是否可以循环切换图片 | boolean | false |
| ablum | 是否相册模式，即从一张展示图片点开相册 | boolean | false |

