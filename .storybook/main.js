module.exports = {
  stories: ['../src/**/*.stories.(js|mdx)'],
  addons: [
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs',
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          implementation: require('sass')
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
