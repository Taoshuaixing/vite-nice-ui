import * as vite from 'vite';
import { Options } from './index.js';
import 'unplugin-combine';
import '@rollup/pluginutils';
import '@babel/types';

declare const _default: (options?: Options | undefined) => vite.Plugin[];

export { _default as default };
