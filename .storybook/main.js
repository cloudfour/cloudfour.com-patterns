// @ts-check

const { join } = require('path');
const fs = require('fs').promises;
const glob = require('tiny-glob');

module.exports = {
  core: {
    builder: 'storybook-builder-vite',
  },
  // We load the welcome story separately so it will be the first sidebar item.
  stories: ['../src/welcome.stories.mdx', '../src/**/*.stories.@(js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        backgrounds: false,
      },
    },
    '@storybook/addon-a11y',
    'storybook-mobile',
    'storybook-addon-paddings',
    'storybook-addon-outline',
    // '@whitespace/storybook-addon-html',
    '@storybook/addon-postcss',
  ],
  managerHead: (head) => {
    const iconSuffix = process.env.NODE_ENV === 'development' ? '-dev' : '';
    return `${head}
      <link rel="icon" href="favicons/favicon${iconSuffix}.ico" />
      <link rel="icon" href="favicons/icon${iconSuffix}.svg" type="image/svg+xml" />`;
  },
  /** @param {import('vite').UserConfig} config */
  async viteFinal(config, { configType }) {
    config.plugins.push(twigPlugin(), rawLoaderPlugin());
    return config;
  },
};

/** @returns {import('vite').Plugin} */
const twigPlugin = () => {
  const twingEnv = '\0twingEnv';
  return {
    name: 'twig',
    async resolveId(id) {
      if (id === twingEnv) return twingEnv;
    },
    async load(id) {
      if (id !== twingEnv) return;

      const files = await glob('src/**/*.twig', { cwd: process.cwd() });

      const preloadedFiles = (
        await Promise.all(
          files.map(async (f) => {
            const newName = f.replace(/^src\//g, '@cloudfour/');
            return `${JSON.stringify(newName)}: ${JSON.stringify(
              await fs.readFile(f, 'utf8')
            )}`;
          })
        )
      ).join(',\n');

      return `
        import { TwingEnvironment, TwingLoaderArray } from 'twing/dist/es/browser.js'
        const files = { ${preloadedFiles} }
        export default new TwingEnvironment(new TwingLoaderArray(files))
      `;
    },
    async transform(code, id) {
      if (id.startsWith('\0') || !id.endsWith('.twig')) return;

      return `
        import twingEnv from ${JSON.stringify(twingEnv)}
        export default () => ''
      `;
    },
  };
};

/** @returns {import('vite').Plugin} */
const rawLoaderPlugin = () => {
  const originalPrefix = '!!raw-loader!';
  const changedPrefix = '\0raw-';
  return {
    name: 'twig',
    async resolveId(id, importer) {
      if (!id.startsWith(originalPrefix)) return;
      const path = await this.resolve(
        id.slice(originalPrefix.length),
        importer,
        { skipSelf: true }
      );
      if (!path) return;
      return `${changedPrefix}${path.id}`;
    },
    async load(id) {
      if (!id.startsWith(changedPrefix)) return;
      const path = id.slice(changedPrefix.length);
      const text = await fs.readFile(path, 'utf8');
      return `export default ${JSON.stringify(text)}`;
    },
  };
};
