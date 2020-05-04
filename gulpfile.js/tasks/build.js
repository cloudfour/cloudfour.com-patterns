const buildSass = require('./build-sass');
const buildJS = require('./build-js');
const clean = require('./clean');
// Const buildTypes = require('./build-types');

const { parallel, series } = require('gulp');

module.exports = series(
  clean,
  parallel(
    buildSass,
    buildJS
    // TODO: uncomment the next line once we have .ts files
    // buildTypes
  )
);
