const { watch } = require('gulp');
const svgToTwig = require('./svg-to-twig');
const buildTokens = require('./build-tokens');

module.exports = function () {
  watch('src/assets/**/*.svg', svgToTwig);
  watch('src/tokens/**/*.+(js|json)', buildTokens);
};
