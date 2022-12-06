import * as unplugin_combine_types from 'unplugin-combine/types';
import { Options } from './index.js';
import 'unplugin-combine';
import '@rollup/pluginutils';
import '@babel/types';

declare const _default: (options?: Options | undefined) => unplugin_combine_types.RollupPlugin;

export { _default as default };
