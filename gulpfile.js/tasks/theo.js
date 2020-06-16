const { src, dest, parallel } = require('gulp');
const gulpTheo = require('gulp-theo');
// Requiring this file applies our Theo customizations to gulp-theo
require('../../.theo');
const prettier = require('gulp-prettier');
const rename = require('gulp-rename');

// Ignore any files with leading underscores
const srcGlob = ['src/design-tokens/*.yml', '!src/design-tokens/_*'];
const destGlob = 'src/design-tokens/generated';
const transform = {
  type: 'web',
};

function theoToJs() {
  return src(srcGlob)
    .pipe(
      gulpTheo({
        transform,
        format: {
          type: 'module.js',
        },
      })
    )
    .pipe(prettier())
    .pipe(
      rename((path) => {
        path.basename = path.basename.replace('.module', '');
      })
    )
    .pipe(dest(destGlob));
}

function theoToMdx() {
  return src(srcGlob)
    .pipe(
      gulpTheo({
        transform,
        format: {
          type: 'stories.mdx',
        },
      })
    )
    .pipe(prettier())
    .pipe(dest(destGlob));
}

module.exports = parallel(theoToJs, theoToMdx);
