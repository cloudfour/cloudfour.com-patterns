module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          // Dart Sass performs much better than Node Sass
          implementation: require('sass'),
          sassOptions: {
            // Import Theo design tokens as SCSS variables
            importer: [require('./theo-importer')]
          }
        }
      }
    }
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.twig$/,
      use: 'twigjs-loader'
    });

    return config;
  }
};
