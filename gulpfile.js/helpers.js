const path = require('path');
const glob = require('tiny-glob');

module.exports.outDir = 'dist';

const extensions = ['.js', '.ts', '.tsx'];
module.exports.extensions = extensions;

/**
 * Generates a root entry to be used by rollup and type generation
 * This allows us to create a single bundle that exports every export from every file
 * This is the same approach as @rollup/plugin-multi-entry takes
 * @see https://github.com/rollup/plugins/tree/master/packages/multi-entry
 * Being used both for rollup and for the type generation
 */
module.exports.createVirtualRootEntry = async () => {
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
