const svgr = require('@svgr/rollup').default;
const { twingPlugin } = require('../twing/rollup-plugin');

module.exports = {
  // We load the welcome story separately so it will be the first sidebar item.
  stories: ['../src/welcome.stories.mdx', '../src/**/*.stories.@(js|mdx)'],
  features: {
    storyStoreV7: true, // TODO: figure out if this actually has an effect for vite
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        backgrounds: false,
      },
    },
    '@storybook/addon-a11y',
    // Disabling these two until they are fixed upstream
    // 'storybook-mobile',
    // '@whitespace/storybook-addon-html',
    // 'storybook-addon-outline',
    '@etchteam/storybook-addon-status',
    '@storybook/addon-postcss', // TODO: still used with vite?
  ],
  /** @param {import('vite').UserConfig} config */
  async viteFinal(config) {
    config.plugins ||= [];
    config.plugins.push(twingPlugin());
    config.plugins.push(svgr());

    config.optimizeDeps ||= {};
    config.optimizeDeps.include = [
      '@cloudfour/twing-browser-esm',
      '@mdx-js/react',
      '@storybook/addon-docs',
      '@storybook/addon-viewport',
      'focus-visible',
      'jabber',
      'prismjs',
      'prismjs/components/prism-bash',
      'prismjs/components/prism-handlebars',
      'prismjs/components/prism-json',
      'prismjs/components/prism-jsx',
      'prismjs/components/prism-markup-templating',
      'prismjs/components/prism-php',
      'prismjs/components/prism-scss',
      'prismjs/components/prism-toml',
      'prismjs/components/prism-tsx',
      'prismjs/components/prism-twig',
      'prismjs/components/prism-typescript',
      'prismjs/components/prism-yaml',
      'react',
      'react-syntax-highlighter/dist/esm/languages/prism/twig',
      'react-syntax-highlighter/dist/esm/prism-light',
      'smoldash',
    ];

    config.css ||= {};
    config.css.preprocessorOptions ||= {};
    config.css.preprocessorOptions.scss = {
      importer: [require('../glob-sass-importer')],
    };
    return config;
  },
};
