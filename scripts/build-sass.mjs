import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

import cssnano from 'cssnano';
import postcss from 'postcss';
import * as sass from 'sass';

const require = createRequire(import.meta.url);
// `postcss.config.js` is CommonJS, and is also read by Storybook's Vite setup,
// so it is loaded rather than duplicated here.
const postcssConfig = require('../postcss.config.js');

const outDir = 'dist';
const entry = 'src/index.scss';

/**
 * Run PostCSS and forward any warnings, which otherwise disappear silently.
 *
 * @param {import('postcss').AcceptedPlugin[]} plugins - Plugins to run.
 * @param {string} css - The stylesheet to process.
 * @param {string} from - Input path, used by plugins that resolve relative paths.
 * @param {string} to - Output path, used the same way.
 * @returns {Promise<string>}
 */
const run = async (plugins, css, from, to) => {
  const result = await postcss(plugins).process(css, { from, to });
  for (const warning of result.warnings()) {
    console.warn(String(warning));
  }
  return result.css;
};

const { css } = await sass.compileAsync(entry);

// The unminified bundle. `from`/`to` point at the Sass entry's own directory so
// that any plugin resolving relative paths sees the same location the stylesheet
// was authored in.
const expanded = await run(
  postcssConfig.plugins,
  css,
  path.join('src', 'index.css'),
  path.join('src', 'index.css'),
);

await fs.mkdir(outDir, { recursive: true });
const expandedPath = path.join(outDir, 'standalone.css');
await fs.writeFile(expandedPath, expanded);

// The minified bundle is minified from the file just written, so `from`/`to`
// point at `dist`.
const minified = await run(
  [
    cssnano({
      preset: ['cssnano-preset-default', { colormin: false, calc: false }],
    }),
  ],
  expanded,
  expandedPath,
  path.join(outDir, 'standalone.min.css'),
);

await fs.writeFile(path.join(outDir, 'standalone.min.css'), minified);
