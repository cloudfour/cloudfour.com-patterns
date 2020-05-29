// @ts-nocheck

const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const {
  alias,
  twingLoader,
  valLoader,
} = require('../../twing/webpack-options');

const webpackOptions = {
  mode: 'development',
  module: {
    rules: [
      twingLoader,
      valLoader,
      {
        test: /\.(ts|tsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx'],
    alias,
  },
};

module.exports = async (on, config) => {
  on('file:preprocessor', webpackPreprocessor({ webpackOptions }));
};
