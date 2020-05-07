/**
 * Exposes each Gulp task from other files to Gulp
 *
 * @see https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles#splitting-a-gulpfile
 */

module.exports = {
  watchPreprocess: require('./tasks/watch-preprocess'),
  theoToMDX: require('./tasks/theo-to-mdx'),
  svgToTwig: require('./tasks/svg-to-twig'),
  buildSass: require('./tasks/build-sass'),
  buildJS: require('./tasks/build-scripts').buildJS,
  // BuildTypes: require('./tasks/build-scripts').buildTypes,
  // This is currently an empty function, because the buildTypes task fails if there are no types to build
  // Once we add TS files with types, the empty function should be removed, and the above line should be un-commented
  buildTypes: (done) => done(),
};
