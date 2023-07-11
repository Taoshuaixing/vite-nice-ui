/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 10:29:57
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-11 14:04:51
 */
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import Markdown from 'vite-plugin-md';

export default defineConfig({
	plugins: [
		Vue({
			include: [/\.vue$/, /\.md$/], // <--
		}),
		Markdown(),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	css: {
		preprocessorOptions: {
			less: {
				modifyVars: {
					themeColor: '#1677FF', // #1890FF
				},
				javascriptEnabled: true,
			},
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
			external: ['vue', 'swiper', '@vuepic/vue-datepicker', 'qrcode'],
			output: {
				// format: 'es', // 默认es，可选 'amd' 'cjs' 'es' 'iife' 'umd' 'system'
				exports: 'named', // https://rollupjs.org/configuration-options/#output-exports
				//   // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
					// 'vue-router': 'VueRouter', // 引入vue-router全局变量，否则router.push将无法使用
					swiper: 'Swiper',
					'@vuepic/vue-datepicker': 'VueDatePicker',
					qrcode: 'qrcode',
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
});
