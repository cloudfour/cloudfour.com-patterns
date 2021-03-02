const rollup = require('rollup');
const path = require('path');
const nodeResolve = require('@rollup/plugin-node-resolve').default;
const { terser } = require('rollup-plugin-terser');
const { getBabelInputPlugin } = require('@rollup/plugin-babel');
const fs = require('fs').promises;
const glob = require('tiny-glob');
const dts = require('rollup-plugin-dts').default;

const outDir = 'dist';
/** Used to hold TS output from tsc, before it gets bundled by rollup into `dist` */
const tsTmpDist = 'ts-dist';

const extensions = ['.js', '.ts', '.tsx'];

/**
 * Generates a root entry to be used by rollup and type generation
 * This allows us to create a single bundle that exports every export from every file
 * This is the same approach as @rollup/plugin-multi-entry takes
 * @see https://github.com/rollup/plugins/tree/master/packages/multi-entry
 * Being used both for rollup and for the type generation
 */
const createVirtualRootEntry = async () => {
  const files = (
    await glob(`src/{objects,components}/*/*{${extensions.join(',')}}`)
  )
    // Don't include Cypress test files in the build
    .filter((f) => !f.endsWith('.cypress.ts'));
  return files
    .map((f) => {
      const absolutePathWithoutExtension = path
        .resolve(f)
        .replace(path.extname(f), '');
      const relativePath = `./${path.relative(
        process.cwd(),
        absolutePathWithoutExtension
      )}`;
      return `export * from ${JSON.stringify(relativePath)}`;
    })
    .join('\n');
};

// The \0 is used to prevent the module name from being a real module name
const virtualRootModule = '\0virtual-root-module';
const virtualRootPlugin = () => ({
  name: 'virtual-root-plugin',
  resolveId: (id) => (id === virtualRootModule ? virtualRootModule : null),
  load: (id) => (id === virtualRootModule ? createVirtualRootEntry() : null),
});

const buildJS = async () => {
  const pathName = 'cloudfour-patterns';
  const globalName = 'cloudfourPatterns';
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

const buildTypes = async () => {
  // Using a virtual root file didn't work for rollup-plugin-dts
  const tsRootFile = path.join(tsTmpDist, 'generated-ts-root-file.d.ts');
  await fs.mkdir(tsTmpDist, { recursive: true });
  await fs.writeFile(tsRootFile, await createVirtualRootEntry());
  const pathName = 'cloudfour-patterns';
  // Read documentation for rollup-plugin-dts to understand what this is doing
  const bundle = await rollup.rollup({
    input: tsRootFile,
    plugins: [dts()],
  });
  await Promise.all([
    bundle.write({
      format: 'esm',
      file: path.join(outDir, `${pathName}.d.ts`),
    }),
  ]);
};

module.exports = { buildJS, buildTypes };
