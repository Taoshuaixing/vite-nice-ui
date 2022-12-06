import * as unplugin from 'unplugin';
import { Options } from './index.js';
import 'unplugin-combine';
import '@rollup/pluginutils';
import '@babel/types';

declare const _default: (options?: Options | undefined) => unplugin.EsbuildPlugin;

export { _default as default };
