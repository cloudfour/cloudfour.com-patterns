// @ts-nocheck

const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const {
  twingEnvironmentPlugin,
  twingOptions,
} = require('../../twing-environment-webpack-plugin');

const getWebpackOptions = async () => ({
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.twig$/,
        use: {
          loader: 'twing-loader',
          options: twingOptions,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx'],
  },
  plugins: [await twingEnvironmentPlugin()],
});

module.exports = async (on, config) => {
  const webpackOptions = await getWebpackOptions();
  on('file:preprocessor', webpackPreprocessor({ webpackOptions }));
};
