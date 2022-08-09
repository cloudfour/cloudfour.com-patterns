const svgr = require('@svgr/rollup').default;
const { twingPlugin } = require('../twing/rollup-plugin');

module.exports = {
  // We load the welcome story separately so it will be the first sidebar item.
  stories: [
    '../src/welcome.stories.mdx',
    // '../src/**/*.stories.@(js|mdx)',
    '../src/components/**/*.stories.@(js|mdx)',
  ],
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
    // '@storybook/addon-a11y',
    // Disabling these two until they are fixed upstream
    // 'storybook-mobile',
    // '@whitespace/storybook-addon-html',
    'storybook-addon-outline',
    '@etchteam/storybook-addon-status',
    '@storybook/addon-postcss',
  ],
  async viteFinal(config: import('vite').UserConfig) {
    config.plugins ||= [];
    config.plugins.push(twingPlugin());
    config.plugins.push(svgr());

    config.resolve ||= {};
    config.resolve.alias ||= {};
    config.resolve.alias['object-hash'] = require.resolve(
      './object-hash-shim.cjs'
    );

    config.optimizeDeps ||= {};
    config.optimizeDeps.disabled = false;
    config.optimizeDeps.include = ['twing/dist/es/browser.js'];
    config.optimizeDeps.esbuildOptions = {
      inject: [require.resolve('./buffer-shim.mjs')],
      sourcemap: false,
      minify: false,
      minifyIdentifiers: false,
      minifySyntax: false,
      minifyWhitespace: false,
      plugins: [
        // {
        //   name: 'fix-object-hash',
        //   setup(build) {
        //     build.onResolve({ filter: /^object-hash$/ }, async (args) => {
        //       return { path: require.resolve('object-hash') };
        //     });
        //   },
        // },
      ],
    };

    config.css ||= {};
    config.css.preprocessorOptions ||= {};
    config.css.preprocessorOptions.scss = {
      importer: [require('../glob-sass-importer')],
    };
    return config;
  },
};
