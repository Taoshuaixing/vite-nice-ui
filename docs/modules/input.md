# 输入框 Input


数据输入框类型，通过键盘输入字符。

## 基本使用

<input-basic />

::: details Show Code

<<<../examples/input/basic.vue

:::

## 大、中、小三种尺寸

<input-size />

::: details Show Code

<<<../examples/input/size.vue

:::

## 禁用状态

<input-disabled />

::: details Show Code

<<<../examples/input/disabled.vue

:::

## 可清空数据

<input-clearable />

::: details Show Code

<<<../examples/input/clearable.vue

:::

## 带图标

可使用 leftIcon 或者 rightIcon 来定义显示图标并确定显示的位置。需要注意的是如果定义了右侧显示图标，那 clearable 将不再起作用

<input-icon />

::: details Show Code

<<<../examples/input/icon.vue

:::

## 密码类型

通过 showPassword 来启用是否开启显示密码

<input-password />

::: details Show Code

<<<../examples/input/password.vue

:::

## API

参数 | 说明 | 类型 | 默认值 | 可选值
-- | -- | -- | -- | --
v-model	|	input绑定值	|	string / number	|	——	|	——
type	|	支持所有原生type值	|	string	|	——	|	——
placeholder	|	输入框占位字符	|	string	|	——	|	——
disabled	|	是否禁用	|	Boolean	|	FALSE	|	true / false
readonly	|	原生属性，是否只读	|	Boolean	|	FALSE	|	true / false
form	|	原生属性，所属表单	|	String	|	——	|	——
clearable	|	是否可清空	|	Boolean	|	FALSE	|	true / false
showPassword	|	是否显示密码查看图标，需配合type为password类型一起使用	|	Boolean	|	FALSE	|	true / false
size	|	尺寸大小	|	String	|	default	|	default / small / mini
leftIcon / rightIcon	|	是否带图标，并确定图标的位置	|	String	|	——	|	参考图标库
autofocus	|	是否自动获取输入框焦点	|	Boolean	|	FALSE	|	true / false
focusColor	|	自定义Focus颜色的色值	|	String	|	——	|	——

## Events

事件名称 | 说明 | 参数
-- | -- | --
focus | input在获取焦点时触发 | (e: Event) => void
blur | input在失去焦点时触发 | (e: Event) => void
 input |input值变化时触发 |(value: string | number)
 change | 用户获得焦点并按下回车时触发 | (event: Event)
 clear | 可清空的input点击清空按钮时触发 | —— 
