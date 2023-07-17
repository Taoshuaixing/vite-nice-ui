# 加载中 Loading

一个简单的自适应布局组件


## 基本使用 

<loading-basic />

::: details Show Code

<<<../examples/loading/basic.vue

:::

## 不同大小

<loading-size />

::: details Show Code

<<<../examples/loading/size.vue

:::

## 静态动态 

<loading-style />

::: details Show Code

<<<../examples/loading/style.vue

:::

## 自定义 

<loading-custom-color />

<loading-custom-text />

::: details Show Code

::: code-group

<<<../examples/loading/custom-color.vue [自定义颜色]

<<<../examples/loading/custom-text.vue [自定义文本]

:::



## API

| 参数 | 说明 | 类型 | 默认值 |
|---|---|---|---|
| spinning | 是否为加载中状态 | boolean | true |
| size | 组件大小 | 'small' | 'default' | 'large' | 'default' |
| tip | 描述文案 | string | '' |
| indicator | 加载指示符 | 'dot' | 'static-circle' | 'dynamic-circle' | 'dot' |
| color | 主题颜色 | string | '#9708cc' |

