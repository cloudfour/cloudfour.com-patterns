import path from 'node:path';

import { getBabelInputPlugin } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { rollup } from 'rollup';

import {
  extensions,
  outDir,
  virtualRootModule,
  virtualRootPlugin,
} from './rollup-root-entry.mjs';

/** @type {import('terser').MinifyOptions} */
const terserESMOpts = {
  compress: { passes: 6, join_vars: false, sequences: false },
  module: true,
  mangle: false,
};

const pathName = 'cloudfour-patterns';
const globalName = 'cloudfourPatterns';

const bundle = await rollup({
  input: virtualRootModule,
  plugins: [
    virtualRootPlugin(),
    getBabelInputPlugin({ extensions, babelHelpers: 'bundled' }),
    nodeResolve({ extensions }),
    json(),
  ],
});

await Promise.all([
  bundle.write({
    format: 'esm',
    file: path.join(outDir, `${pathName}.mjs`),
    plugins: terser(terserESMOpts),
  }),
  bundle.write({
    format: 'umd',
    name: globalName,
    file: path.join(outDir, `${pathName}.js`),
  }),
  bundle.write({
    format: 'umd',
    name: globalName,
    file: path.join(outDir, `${pathName}.min.js`),
    plugins: [terser()],
  }),
]);

await bundle.close();
