const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var VirtualModulesPlugin = require('webpack-virtual-modules');
const glob = require('tiny-glob');
const path = require('path');
const fs = require('fs');

module.exports = {
  // We load the welcome story separately so it will be the first sidebar item.
  stories: ['../src/welcome.stories.mdx', '../src/**/*.stories.(js|mdx)'],
  addons: [
    // Core addons
    '@storybook/addon-a11y/register',
    '@storybook/addon-docs',
    '@storybook/addon-knobs/register',
    '@storybook/addon-viewport/register',
    // Community addons
    'storybook-addon-themes',
    'storybook-addon-paddings',
  ],
  webpackFinal: async (config) => {
    const isDev = config.mode === 'development';
    // Remove default SVG processing from default config.
    // @see https://github.com/storybookjs/storybook/issues/5708#issuecomment-515384927
    config.module.rules = config.module.rules.map((data) => {
      if (/svg\|/.test(String(data.test))) {
        data.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/;
      }
      return data;
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
      {
        test: /\.twig$/,
        use: {
          loader: 'twing-loader',
          options: {
            environmentModulePath: require.resolve('../twig-environment'),
          },
        },
      },
      {
        // Import Theo design tokens as JS objects
        test: /\.ya?ml$/,
        use: resolve(__dirname, '../.theo/webpack-loader.js'),
      },
      {
        // Optimize and process SVGs as React elements for use in documentation
        test: /\.svg$/,
        use: '@svgr/webpack',
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
      }
    );

    config.resolve.extensions.push('.ts', '.tsx');
    // config.resolve.alias[
    //   require.resolve('../twig-environment')
    // ] = require.resolve('../twig-environment-client-side');

    config.plugins.push(new MiniCssExtractPlugin());
    config.plugins.push(
      new VirtualModulesPlugin(await setupTwingEnvironment())
    );

    return config;
  },
};

const setupTwingEnvironment = async () => {
  const files = await glob('src/**/*.twig', { cwd: process.cwd() });

  const preloadedFiles = files
    .map((f) => {
      const newName = f.replace(/^src\//g, '@cloudfour/patterns/');
      return `${JSON.stringify(
        newName
      )}: require("!!raw-loader!./${f}").default`;
    })
    .join(',\n');

  const output = `
  const { TwingEnvironment, TwingLoaderArray } = require('twing');

  const files = { ${preloadedFiles} }

  module.exports = new TwingEnvironment(new TwingLoaderArray(files));

  `;
  return { [require.resolve('../twig-environment')]: output };
};
