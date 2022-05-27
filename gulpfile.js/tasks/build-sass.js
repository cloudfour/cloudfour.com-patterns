const { src, dest } = require('gulp');
const outDir = 'dist';

const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
sass.compiler = require('sass');

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
          preset: ['cssnano-preset-default', { colormin: false }],
        }),
      ])
    )
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(outDir));

module.exports = buildSass;
