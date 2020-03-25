const { resolve } = require('path');

module.exports = {
  // We load the welcome story separately so it will be the first sidebar item.
  stories: ['../src/welcome.stories.mdx', '../src/**/*.stories.(js|mdx)'],
  addons: [
    // Core addons
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          // Dart Sass is easier to install than Node Sass
          implementation: require('sass'),
          sassOptions: {
            // Import Theo design tokens as SCSS variables
            importer: [require('./theo-importer')],
          },
        },
      },
    },
    // Community addons
    'storybook-addon-themes',
  ],
  webpackFinal: async (config) => {
    // Remove default SVG processing from default config.
    // @see https://github.com/storybookjs/storybook/issues/5708#issuecomment-515384927
    config.module.rules = config.module.rules.map((data) => {
      if (/svg\|/.test(String(data.test))) {
        data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
      }
      return data;
    });

    // Push new rules
    config.module.rules.push(
      {
        test: /\.twig$/,
        use: 'twigjs-loader',
      },
      {
        // Import Theo design tokens as JS objects
        test: /\.ya?ml$/,
        use: resolve(__dirname, './theo-loader.js'),
      },
      {
        // Optimize and process SVGs as React elements for use in documentation
        test: /\.svg$/,
        use: '@svgr/webpack',
      }
    );

    return config;
  },
};
