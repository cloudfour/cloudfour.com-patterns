const { src, dest } = require('gulp');
const gulpTheo = require('gulp-theo');
// Requiring this file applies our Theo customizations to gulp-theo
require('../../.theo');

// Gulp task
function theoToMdx() {
  // Ignore any files with leading underscores
  return src(['src/design-tokens/*.yml', '!src/design-tokens/_*'])
    .pipe(
      gulpTheo({
        transform: {
          type: 'web',
        },
        format: {
          type: 'stories.mdx',
        },
      })
    )
    .pipe(dest('src/design-tokens/generated'));
}

module.exports = theoToMdx;
