const { watch } = require('gulp');

const buildTokens = require('./build-tokens');
const svgToTwig = require('./svg-to-twig');

module.exports = function () {
  watch('src/assets/**/*.svg', svgToTwig);
  watch('src/tokens/**/*.+(js|json)', buildTokens);
};
