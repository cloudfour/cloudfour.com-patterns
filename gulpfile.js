'use strict';

const config = require('./config');
const drizzle = require('drizzle-builder');
const env = require('gulp-util').env;
const gulp = require('gulp');
const helpers = require('@cloudfour/hbs-helpers');
const rollup = require('rollup').rollup;
const tasks = require('@cloudfour/gulp-tasks');

// Customize inline SVG helper base path
helpers.svg = helpers.svg.create({
  basePath: './src/static/images'
});

// Append config
Object.assign(config.drizzle, {helpers});

// Register core tasks
[
  'copy',
  'clean',
  'serve',
  'watch'
].forEach(name => tasks[name](gulp, config[name]));

// Register special CSS tasks
tasks.css(gulp, config['css:toolkit']);
tasks.css(gulp, config['css:drizzle']);
gulp.task('css', ['css:drizzle', 'css:toolkit']);

// Register custom JS task
gulp.task('js', () => {
  const {rollup: baseconfig, bundles} = config.js;
  const rollups = bundles.map(opts => {
    const config = Object.assign({}, baseconfig, opts);
    return rollup(config).then(bundle => bundle.write(config));
  });
  return Promise.all(rollups);
});

// Register Drizzle builder task
gulp.task('drizzle', () => {
  const result = drizzle(config.drizzle);
  return result;
});

// Register frontend composite task
gulp.task('frontend', [
  'drizzle',
  'copy',
  'css',
  'js'
]);

// Register build task (for continuous deployment via Netflify)
gulp.task('build', ['clean'], done => {
  gulp.start('frontend');
  done();
});

// Register default task
gulp.task('default', ['frontend'], done => {
  gulp.start('serve');
  if (env.dev) {
    gulp.start('watch');
  }
  done();
});
