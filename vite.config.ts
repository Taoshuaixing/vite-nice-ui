/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 10:29:57
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-11 16:51:46
 */
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Markdown from 'vite-plugin-md'
// 打包体积可视化插件
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/], // <--
    }),
    Markdown(),
    visualizer({
      // 生成的分析图文件名，默认stats.html
      open: true, // 注意这里要设置为true，否则无效
      gzipSize: true, // 分析图生成的文件名
      brotliSize: true, // 收集 brotli 大小并将其显示
      filename: 'stats.html', // 分析图生成的文件名
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      // less: {
      //   javascriptEnabled: true,
      //   additionalData: `@import "${resolve(__dirname, './src/styles/style.less')}";`,
      // },
    },
  },
  // 构建为库
  build: {
    lib: {
      entry: './packages/index.ts',
      name: 'vite-nice-ui',
    },
    rollupOptions: {
      // 自定义底层的Rollup打包配置
      // https://rollupjs.org/configuration-options/
      // 确保外部化处理那些你不想打包进库的依赖
      external: [
        'vue',
        'highlight.js',
        'jest',
        'pinia',
        'sass',
        'sass-loader',
        'vite-plugin-md',
        'vue-router',
        '@babel/preset-env',
        '@vitejs/plugin-vue',
        '@vue/reactivity',
        '@vue/test-utils',
        'babel-jest',
        'babel-preset-vite',
        'eslint',
        'eslint-plugin-vue',
        'vite',
        'vue-jest',
        'commitizen',
        'cz-conventional-changelog',
        'vite-nice-ui',
        '@types',
        '@vueuse',
        'feather-icons',
        'vue-feather',
      ],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
    minify: 'terser', // Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效
    terserOptions: {
      // 在打包代码时移除 console、debugger 和 注释
      compress: {
        drop_console: true, // 生产环境时移除console
        drop_debugger: true,
      },
      format: {
        comments: false, // 删除注释comments
      },
    },
  },
})
