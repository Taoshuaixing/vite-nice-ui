import * as unplugin_combine_types from 'unplugin-combine/types';
import { Options } from './index.js';
import 'unplugin';
import 'unplugin-combine';
import '@rollup/pluginutils';

declare const _default: (options?: Options | undefined) => unplugin_combine_types.RollupPlugin;

export { _default as default };
