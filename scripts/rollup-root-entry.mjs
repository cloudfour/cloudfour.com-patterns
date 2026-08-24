import fs from 'node:fs/promises';
import path from 'node:path';

export const outDir = 'dist';

/** Used to hold TS output from tsc, before it gets bundled by rollup into `dist` */
export const tsTmpDist = 'ts-dist';

export const extensions = ['.js', '.ts', '.tsx'];

/**
 * Generates a root entry to be used by rollup and type generation
 * This allows us to create a single bundle that exports every export from every file
 * This is the same approach as `@rollup/plugin-multi-entry` takes
 *
 * @see https://github.com/rollup/plugins/tree/master/packages/multi-entry
 * Being used both for rollup and for the type generation
 *
 * @returns {Promise<string>}
 */
export const createVirtualRootEntry = async () => {
  const matches = [];
  for await (const file of fs.glob(
    `src/{objects,components}/*/*{${extensions.join(',')}}`,
  )) {
    matches.push(file);
  }

  return (
    matches
      // Don't include test files, stories, or the arg fixtures stories import in the
      // build. Stories became `.js` when they moved off `.stories.mdx`, so without
      // this they land in the published bundle -- and they import `.twig` and
      // `.scss`, which Rollup cannot parse.
      .filter((f) => !/(\.(test|stories)|-args)\.[jt]sx?$/.test(f))
      // The order of these exports reaches the published bundle and type
      // declarations, so sort rather than depending on the order the file system
      // happens to hand back.
      .toSorted()
      .map((f) => {
        const absolutePathWithoutExtension = path
          .resolve(f)
          .replace(path.extname(f), '');
        const relativePath = `./${path.relative(
          process.cwd(),
          absolutePathWithoutExtension,
        )}`;
        return `export * from ${JSON.stringify(relativePath)}`;
      })
      .join('\n')
  );
};

// The \0 is used to prevent the module name from being a real module name
export const virtualRootModule = '\0virtual-root-module';

export const virtualRootPlugin = () => ({
  name: 'virtual-root-plugin',
  resolveId: (id) => (id === virtualRootModule ? virtualRootModule : null),
  load: (id) => (id === virtualRootModule ? createVirtualRootEntry() : null),
});
