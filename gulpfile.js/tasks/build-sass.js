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
    .pipe(postcss([cssnano()]))
    // Cssnano minimizes alpha colors to 8-digit hex codes, which is still stage 2 and is not supported in some browsers
    // There didn't seem to be an easy way to disable this minification within cssnano,
    // and it doesn't seem to work to add the postcss-color-hex-alpha plugin in the same postcss pass as cssnano
    .pipe(postcss([require('postcss-color-hex-alpha')()]))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(outDir));

module.exports = buildSass;
