import * as rollup from 'rollup';
import { Options } from './index.js';
import 'unplugin';
import '@rollup/pluginutils';

declare const _default: (options?: Options | undefined) => rollup.Plugin;

export { _default as default };
