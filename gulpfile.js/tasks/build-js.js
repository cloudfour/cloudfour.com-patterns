const { outDir, createVirtualRootEntry, extensions } = require('../helpers');

const rollup = require('rollup');
const path = require('path');
const nodeResolve = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const { getBabelInputPlugin } = require('@rollup/plugin-babel');

const buildJS = async () => {
  const pathName = 'cloudfour-patterns';
  const globalName = 'cloudfourPatterns';
  // The \0 is used to prevent the module name from being a real module name
  const virtualRootModule = '\0virtual-root-module';
  const virtualRootPlugin = () => ({
    name: 'virtual-root-plugin',
    resolveId: (id) => (id === virtualRootModule ? virtualRootModule : null),
    load: (id) => (id === virtualRootModule ? createVirtualRootEntry() : null),
  });
  const bundle = await rollup.rollup({
    input: virtualRootModule,
    plugins: [
      virtualRootPlugin(),
      getBabelInputPlugin({ extensions, babelHelpers: 'bundled' }),
      nodeResolve({ extensions }),
    ],
  });
  await Promise.all([
    bundle.write({ format: 'esm', file: path.join(outDir, `${pathName}.mjs`) }),
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
};

module.exports = buildJS;
