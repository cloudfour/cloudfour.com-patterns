// @ts-nocheck
const browserify = require('@cypress/browserify-preprocessor');

const browserifyOptions = browserify.defaultOptions;
browserifyOptions.typescript = require.resolve('typescript');
browserifyOptions.browserifyOptions.transform.push([
  require.resolve('./twig-transform'),
  {},
]);

module.exports = (on, config) => {
  on('file:preprocessor', browserify(browserifyOptions));
};
