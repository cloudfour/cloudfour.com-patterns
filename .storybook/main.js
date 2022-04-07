const { join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  twingLoader,
  valLoader,
  alias: twingAlias,
} = require('../twing/webpack-options');

module.exports = {
  // We load the welcome story separately so it will be the first sidebar item.
  stories: ['../src/welcome.stories.mdx', '../src/**/*.stories.@(js|mdx)'],
  staticDirs: ['../static', '../src/assets'],
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
    'storybook-addon-outline',
    '@whitespace/storybook-addon-html',
    '@storybook/addon-postcss',
  ],
  managerHead: (head) => {
    const iconSuffix = process.env.NODE_ENV === 'development' ? '-dev' : '';
    return `${head}
      <link rel="icon" href="favicons/favicon${iconSuffix}.ico" />
      <link rel="icon" href="favicons/icon${iconSuffix}.svg" type="image/svg+xml" />`;
  },
  webpackFinal: async (config) => {
    const isDev = config.mode === 'development';

    /**
     * For development, leave the default 'cheap-module-source-map', as it's faster and works.
     * For the build, using the default does not work correctly, but this option appears to.
     * @see https://webpack.js.org/configuration/devtool/
     */
    if (!isDev) {
      config.devtool = 'source-map';
    }

    // Push new rules
    config.module.rules.push(
      {
        test: /\.s[ca]ss$/,
        use: [
          {
            // @see https://github.com/webpack-contrib/style-loader/issues/303#issuecomment-581168870
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // Lets CSS loader know there are two loaders left that may be
              // handling imports.
              // @see https://github.com/webpack-contrib/css-loader#importloaders
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // Dart Sass is easier to install than Node Sass
              implementation: require('sass'),
              sourceMap: true,
              sassOptions: {
                importer: [require('../glob-sass-importer')],
              },
            },
          },
        ],
      },
      twingLoader,
      valLoader
    );

    Object.assign(config.resolve.alias, twingAlias);
    // Allow resolving `static/*` paths so relative paths don't have to be used
    // This is used for url() paths in CSS
    config.resolve.alias['static'] = join(__dirname, '..', 'static');

    config.plugins.push(new MiniCssExtractPlugin());

    return config;
  },
};
