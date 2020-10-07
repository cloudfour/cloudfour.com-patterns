const { resolve, join } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {
  twingLoader,
  valLoader,
  alias: twingAlias,
} = require('../twing/webpack-options');

module.exports = {
  // We load the welcome story separately so it will be the first sidebar item.
  stories: ['../src/welcome.stories.mdx', '../src/**/*.stories.@(js|mdx)'],
  addons: [
    // Core addons
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-viewport/register',
    '@storybook/addon-controls',
    // Community addons
    'storybook-addon-themes',
    'storybook-addon-paddings',
    '@whitespace/storybook-addon-html/register',
  ],
  webpackFinal: async (config) => {
    const isDev = config.mode === 'development';
    // Remove default SVG processing from default config.
    // @see https://github.com/storybookjs/storybook/issues/5708#issuecomment-515384927
    config.module.rules = config.module.rules.map((rule) => {
      if (/svg\|/.test(String(rule.test))) {
        rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
      }
      return rule;
    });

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
            options: {
              hmr: isDev,
            },
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
                importer: [
                  require('../glob-sass-importer'),
                  // Import Theo design tokens as SCSS variables
                  require('../.theo/sass-importer'),
                ],
              },
            },
          },
        ],
      },
      twingLoader,
      valLoader,
      {
        // Import Theo design tokens as JS objects
        test: /\.ya?ml$/,
        use: resolve(__dirname, '../.theo/webpack-loader.js'),
      },
      {
        // Optimize and process SVGs as React elements for use in documentation
        test: /\.svg$/,
        issuer: {
          // If we do `url('___.svg')` in a CSS file, we don't want a react component to get inlined
          exclude: [/.css$/, /.scss$/],
        },
        use: '@svgr/webpack',
      },
      {
        test: /\.svg$/,
        issuer: {
          // If we do `url('___.svg')` in a CSS file, we don't want a react component to get inlined
          include: [/.css$/, /.scss$/],
        },
        use: 'file-loader',
      }
    );

    Object.assign(config.resolve.alias, twingAlias);
    // Allow resolving `static/*` paths so relative paths don't have to be used
    // This is used for url() paths in CSS
    config.resolve.alias['static'] = join(__dirname, '..', 'static');

    config.plugins.push(new MiniCssExtractPlugin());

    return config;
  },
};
