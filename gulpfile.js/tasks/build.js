const { src, dest, parallel } = require('gulp');

const sass = require('gulp-sass');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

const rollup = require('rollup');
const path = require('path');
const multiEntry = require('@rollup/plugin-multi-entry');
const nodeResolve = require('@rollup/plugin-node-resolve');
const { terser } = require('rollup-plugin-terser');

sass.compiler = require('sass');

const outDir = 'dist';

const buildSass = () => {
  return src('./src/index.scss')
    .pipe(
      sass({
        importer: [
          require('../../glob-sass-importer'),
          // Import Theo design tokens as SCSS variables
          require('../../.theo/sass-importer'),
        ],
      }).on('error', sass.logError)
    )
    .pipe(rename({ basename: 'standalone' }))
    .pipe(dest(outDir))
    .pipe(postcss([cssnano()]))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(dest(outDir));
};

const buildJS = async () => {
  const name = 'cloudfourPatterns';
  const bundle = await rollup.rollup({
    input: 'src/{objects,components}/**/*.js',
    plugins: [multiEntry(), nodeResolve()],
  });
  await Promise.all([
    bundle.write({ format: 'esm', file: path.join(outDir, `${name}.mjs`) }),
    bundle.write({
      format: 'umd',
      name,
      file: path.join(outDir, `${name}.js`),
    }),
    bundle.write({
      format: 'umd',
      name,
      file: path.join(outDir, `${name}.min.js`),
      plugins: [terser()],
    }),
  ]);
};

const build = parallel(buildSass, buildJS);

// Expose to Gulp
module.exports = build;
