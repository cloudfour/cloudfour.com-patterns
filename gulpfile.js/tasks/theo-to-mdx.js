const { src, dest } = require('gulp');
const gulpTheo = require('gulp-theo');
const theo = require('theo');
const mdxStoriesFormat = require('../theo-formats/stories.mdx');

theo.registerFormat('stories.mdx', mdxStoriesFormat);

function theoToMdx() {
  return src(['src/design-tokens/*.yml', '!src/design-tokens/_*'])
    .pipe(gulpTheo({
      transform: {
        type: 'web'
      },
      format: {
        type: 'stories.mdx'
      }
    }))
    .pipe(dest('src/design-tokens'));
}

module.exports = theoToMdx;
