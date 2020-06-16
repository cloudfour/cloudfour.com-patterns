const { watch } = require('gulp');
const svgToTwig = require('./svg-to-twig');
const theo = require('./theo');

module.exports = function () {
  watch('src/assets/**/*.svg', svgToTwig);
  watch('src/design-tokens/**/*.yml', theo);
};
