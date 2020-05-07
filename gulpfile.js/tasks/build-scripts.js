const rollup = require('rollup');
const path = require('path');
const nodeResolve = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');
const { getBabelInputPlugin } = require('@rollup/plugin-babel');
const fs = require('fs').promises;
const tsGenerator = require('dts-bundle-generator');
const glob = require('tiny-glob');

const outDir = 'dist';

const extensions = ['.js', '.ts', '.tsx'];

/**
 * Generates a root entry to be used by rollup and type generation
 * This allows us to create a single bundle that exports every export from every file
 * This is the same approach as @rollup/plugin-multi-entry takes
 * @see https://github.com/rollup/plugins/tree/master/packages/multi-entry
 * Being used both for rollup and for the type generation
 */
const createVirtualRootEntry = async () => {
  const files = await glob(
    `src/{objects,components}/**/*{${extensions.join(',')}}`
  );
  return files
    .map((f) => {
      const absolutePathWithoutExtension = path
        .resolve(f)
        .replace(path.extname(f), '');
      return `export * from ${JSON.stringify(absolutePathWithoutExtension)}`;
    })
    .join('\n');
};

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

const buildTypes = async () => {
  const virtualRootFile = path.join(outDir, 'virtual-root-module.ts');
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(virtualRootFile, await createVirtualRootEntry());
  const result = tsGenerator.generateDtsBundle(
    [{ filePath: virtualRootFile }],
    { preferredConfigPath: 'tsconfig.json' }
  );
  await fs.writeFile(path.join(outDir, 'index.d.ts'), result[0]);
  // Remove the virtual root file, it was only used to generate index.d.ts
  await fs.unlink(virtualRootFile);
};

module.exports = { buildJS, buildTypes };
