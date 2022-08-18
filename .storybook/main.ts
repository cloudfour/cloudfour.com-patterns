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
  async viteFinal(config: import('vite').UserConfig) {
    config.plugins ||= [];
    config.plugins.push(twingPlugin());
    config.plugins.push(svgr());

    config.optimizeDeps ||= {};
    config.optimizeDeps.include = [
      '@storybook/addon-viewport',
      'react-syntax-highlighter/dist/esm/prism-light',
      'react-syntax-highlighter/dist/esm/languages/prism/twig',
      'focus-visible',
      'react',
      '@mdx-js/react',
      '@storybook/addon-docs',
      'jabber',
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
