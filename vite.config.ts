import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

/** 当前执行node命令时文件夹的地址（工作目录） */
const root: string = process.cwd();

/** 路径查找 */
const pathResolve = (dir: string): string => {
	return resolve(__dirname, '.', dir);
};

/** 设置别名 */
const alias: Record<string, string> = {
	'@': pathResolve('src'),
	'@build': pathResolve('build'),
};
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	root,
	resolve: {
		alias,
	},
});
