const { src, dest, parallel } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

sass.compiler = require('sass');

const outDir = 'dist';

function buildSass() {
  return src('./src/index.scss')
    .pipe(
      sass({
        // Import Theo design tokens as SCSS variables
        importer: require('../../.storybook/theo-importer')
      }).on('error', sass.logError)
    )
    .pipe(rename({ basename: 'standalone' }))
    .pipe(dest(outDir))
    .pipe(postcss([cssnano()]))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(outDir));
}

function buildJS() {}

function build() {
  return buildSass();
}

// Expose to Gulp
module.exports = build;
