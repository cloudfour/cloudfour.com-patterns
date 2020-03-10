const { watch } = require('gulp');
const svgToTwig = require('./svg-to-twig');
const theoToMdx = require('./theo-to-mdx');

module.exports = function() {
  watch('src/assets/**/*.svg', svgToTwig);
  watch('src/design-tokens/**/*.yml', theoToMdx);
};
