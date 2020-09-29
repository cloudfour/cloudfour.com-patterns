const { watch } = require('gulp');
const svgToTwig = require('./svg-to-twig');

module.exports = function () {
  watch('src/assets/**/*.svg', svgToTwig);
};
