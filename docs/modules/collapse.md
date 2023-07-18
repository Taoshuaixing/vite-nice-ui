# 折叠面板 Collapse

可以折叠/展开的内容区域，对复杂区域进行分组和隐藏，保持页面的整洁。

## 基本使用

<collapse-basic />

::: details Show Code

<<<../examples/collapse/basic.vue

:::

## 手风琴效果

只允许单个内容区域展开，只需 activeKey 传入 number | string 即可

<collapse-accordion />

::: details Show Code

<<<../examples/collapse/accordion.vue

:::

## 可复制面板内容

<collapse-copy />

::: details Show Code

<<<../examples/collapse/copy.vue

:::

## 可自定义内容

自定义 header、lang、text 内容和样式

<collapse-custom />

::: details Show Code

<<<../examples/collapse/custom.vue

:::

## 可隐藏箭头图标

<collapse-arrow />

::: details Show Code

<<<../examples/collapse/arrow.vue

:::

## API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| collapseData | 折叠面板数据，可使用 v-slot 替换对应索引的 header 和 text | Collapse[] | [] |
| activeKey(v-model) | 当前激活 tab 面板的 key | number[] | number | string[] | string | null | null |
| copyable | 是否可复制面板内容 | boolean | false |
| lang | 面板右上角固定内容，例如标识language | string | slot | '' |
| fontSize | 面板标题和内容的字体大小，单位px | number | 14 |
| headerFontSize | 面板标题字体大小，单位px，优先级高于fontSize | number | 0 |
| textFontSize | 面板内容字体大小，单位px，优先级高于fontSize | number | 0 |
| showArrow | 是否展示面板上的箭头 | boolean | true |

## Collapse Type

名称 | 说明 | 类型 | 必传
-- | -- | -- | --
key | 对应activeKey，如果没有传入key属性，则默认使用数据索引(0,1,2...)绑定 | string &#124; number | false
header | 面板标题 | string &#124; slot | false
text | 面板内容 | string &#124; slot | false

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 切换面板的回调 | (key: any) => void
