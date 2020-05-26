// @ts-nocheck

// Cypress uses browserify by default to bundle user-code into the test runner
// By requiring this preprocessor directly, we can add support for importing twig files
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
