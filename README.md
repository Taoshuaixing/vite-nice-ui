<!--
 * @Descripttion: 
 * @version: 
 * @Author: 陶帅星
 * @Date: 2023-07-07 10:29:57
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-13 12:33:44
-->
<div align="center">
  <img src="http://img63.ddimg.cn/upload_img/00890/new/NiceUI-1689061930.png" width="100"/>
  <h1 style="border-bottom:0">
    <p>Vite Nice UI组件库</p>
    <p style="font-size:20px">基于 Vue3 + TS + Vite 开发，全面支持Vue3</p>
  </h1>
</div>
<br/>



- 官网主页: [vite-nice-ui使用文档](https://taoshuaixing.github.io/vite-nice-ui/)

- 国内访问: [vite-nice-ui使用文档](http://taoshuaixing.gitee.io/vite-nice-ui)

***

### 快速使用

```javascript
npm install  vite-nice-ui
cnpm install  vite-nice-ui --save
```

### 引入

```javascript
import { createApp } from 'vue'
import App from '@/App.vue'
import NiceUI from 'vite-nice-ui'
import 'vite-nice-ui/dist/style.css'

const app = createApp(App)
app.use(NiceUI)
app.mount('#app')
```

### 按需引用

```javascript
import { NButton, NInput } from 'vite-nice-ui'
```

### 愉快开始

```javascript
<n-button>默认按钮</n-buttonn> 
<n-button type="primary">主要按钮</n-button>
```

### 开发环境

- 你需要 Node.js 14+，yarn 1.1+ 和 npm 6+及 vite 2+
- 如果您在使用yarn安装依赖的过程中出现esline检查不通过，请执行：

  ```javascript
  yarn config set ignore-engines true
  ```

#### 项目启动

  ```javascript
  npm run dev
  ```

#### 项目打包

  ```javascript
  npm run build
  ```

### 组件开发规范

- 通过在 *packages* 目录下创建组件目录结构，包含ts入口文件、组件源码文件。
- 组件入口文件必须以 *index.ts* 命名。
- 只需将组件导出，*packages* 目录下的index文件会自动引入所有组件并注册install方法，参考代码：

  ```javascript
  export { default as NButton } from './Button';
  ```

### 问题反馈

- 如果您在使用中存在 *bug* 或者有更超前的思想及解决方案，不限于新的组件、新的模式、新的思想、新的方案，您可以在 *Issue* 提交问题，我们会定时进行维护并回复。
- 或您可发送邮件至 taoshuaixing@gmail.com 来反馈或参与贡献。

