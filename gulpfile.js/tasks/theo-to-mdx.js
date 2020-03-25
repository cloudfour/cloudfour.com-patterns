const { src, dest } = require('gulp');
const gulpTheo = require('gulp-theo');
const theo = require('theo');
const mdxStoriesFormat = require('../theo-formats/stories.mdx');

// Register a custom format with Theo
theo.registerFormat('stories.mdx', mdxStoriesFormat);

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
