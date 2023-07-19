# 标签页 Tabs

选项卡切换组件


## 基本使用 

<tabs-basic />

::: details Show Code

<<<../examples/tabs/basic.vue

:::

## 禁用某一项

<tabs-disabled />

::: details Show Code

<<<../examples/tabs/disabled.vue

:::

## 大号标签页 

<tabs-size />

::: details Show Code

<<<../examples/tabs/size.vue

:::

## 自定义内容

<tabs-custom />

::: details Show Code

<<<../examples/tabs/custom.vue

:::

## API

参数 | 说明 | 类型 | 默认值 |
-- | -- | -- | -- | 
tabPages | 标签页数组 | Tab[] | [] | 
centered | 标签是否居中展示 | boolean | false | 
size | 标签页大小 | 'small' &#124; 'large' | 'small' | 
activeKey(v-model) | 当前激活 tab 面板的 key | string &#124; number | '' | 

## Tab Type

名称 | 说明 | 类型 | 
-- | -- | -- | 
key | 对应 activeKey | string &#124; number | 
tab | 标签页显示文字 | string | 
content | 标签页内容 | string &#124; slot | 
disabled | 禁用对应标签页 | boolean | 

## Events

事件名称 | 说明 | 参数
-- | -- | --
change | 切换面板的回调 | (key: string &#124; number) => void