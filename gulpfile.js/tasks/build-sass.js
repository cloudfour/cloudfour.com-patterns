const cssnano = require('cssnano');
const { src, dest } = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
sass.compiler = require('sass');

const outDir = 'dist';

const buildSass = () =>
  src('./src/index.scss')
    .pipe(
      sass({
        importer: [require('../../glob-sass-importer')],
      }).on('error', sass.logError)
    )
    .pipe(postcss())
    .pipe(rename({ basename: 'standalone' }))
    .pipe(dest(outDir))
    .pipe(
      postcss([
        cssnano({
          preset: ['cssnano-preset-default', { colormin: false, calc: false }],
        }),
      ])
    )
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(outDir));

module.exports = buildSass;
