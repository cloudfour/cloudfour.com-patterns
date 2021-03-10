/**
 * Exposes each Gulp task from other files to Gulp
 *
 * @see https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles#splitting-a-gulpfile
 */

module.exports = {
  watchPreprocess: require('./tasks/watch-preprocess'),
  svgToTwig: require('./tasks/svg-to-twig'),
  buildSass: require('./tasks/build-sass'),
  buildJS: require('./tasks/build-scripts').buildJS,
  buildTypes: require('./tasks/build-scripts').buildTypes,
  buildTokens: require('./tasks/build-tokens'),
};
