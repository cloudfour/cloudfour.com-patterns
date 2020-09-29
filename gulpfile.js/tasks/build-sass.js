const { src, dest } = require('gulp');
const outDir = 'dist';

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
sass.compiler = require('sass');

const buildSass = () => {
  return src('./src/index.scss')
    .pipe(
      sass({
        importer: [require('../../glob-sass-importer')],
      }).on('error', sass.logError)
    )
    .pipe(rename({ basename: 'standalone' }))
    .pipe(dest(outDir))
    .pipe(postcss([cssnano()]))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(outDir));
};

module.exports = buildSass;
