/*
 * @Descripttion:
 * @version:
 * @Author: 陶帅星
 * @Date: 2023-07-07 10:29:57
 * @LastEditors: 陶帅星
 * @LastEditTime: 2023-07-08 17:01:31
 */
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
	plugins: [
		Vue({
			include: [/\.vue$/, /\.md$/], // <--
		}),
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
			entry: './packages/index.js',
			name: 'vite-nice-ui',
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
