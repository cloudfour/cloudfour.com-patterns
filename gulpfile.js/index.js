/**
 * Exposes each Gulp task from other files to Gulp
 *
 * @see https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles#splitting-a-gulpfile
 */

module.exports = {
  watchPreprocess: require('./tasks/watch-preprocess'),
  theoToMDX: require('./tasks/theo-to-mdx'),
  svgToTwig: require('./tasks/svg-to-twig'),
  build: require('./tasks/build'),
  buildSass: require('./tasks/build-sass'),
  buildJS: require('./tasks/build-js'),
  buildTypes: require('./tasks/build-types'),
  clean: require('./tasks/clean'),
};
