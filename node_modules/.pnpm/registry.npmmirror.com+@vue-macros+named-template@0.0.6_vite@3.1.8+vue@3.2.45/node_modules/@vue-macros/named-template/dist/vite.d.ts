import * as vite from 'vite';
import { Options } from './index.js';
import 'unplugin';
import 'unplugin-combine';
import '@rollup/pluginutils';

declare const _default: (options?: Options | undefined) => vite.Plugin[];

export { _default as default };
