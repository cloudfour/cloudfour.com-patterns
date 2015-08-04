'use strict';

// modules
var assemble = require('fabricator-assemble');
var bemLinter = require('postcss-bem-linter');
var browserSync = require('browser-sync');
var cssnext = require('cssnext');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var modernizr = require('gulp-modernizr');
var postcss = require('gulp-postcss');
var rename = require('gulp-rename');
var svgSprite = require('gulp-svg-sprite');
var reload = browserSync.reload;
var reporter = require('postcss-reporter');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');
var webpack = require('webpack');


// configuration
var config = {
  dev: gutil.env.dev,
  src: {
    scripts: {
      fabricator: './src/assets/fabricator/scripts/fabricator.js',
      toolkit: './src/assets/toolkit/scripts/toolkit.js'
    },
    styles: {
      fabricator: 'src/assets/fabricator/styles/fabricator.css',
      toolkit: 'src/assets/toolkit/styles/*.css'
    },
    images: 'src/assets/toolkit/images/**/*',
    icons: 'src/assets/toolkit/icons/*.svg',
    views: 'src/toolkit/views/*.html'
  },
  dest: 'dist'
};


// webpack
var webpackConfig = require('./webpack.config')(config);
var webpackCompiler = webpack(webpackConfig);


// clean
gulp.task('clean', function (cb) {
  del([config.dest], cb);
});


// styles
gulp.task('styles:fabricator', function () {
  return gulp.src(config.src.styles.fabricator)
    .pipe(postcss([
      cssnext()
    ]))
    .pipe(rename('f.css'))
    .pipe(gulp.dest(config.dest + '/assets/fabricator/styles'))
    .pipe(gulpif(config.dev, reload({stream:true})));
});

/**
 * Run each CSS file that defines itself as a component or utility against the
 * postcss-bem-linter to check for valid selectors and custom property names
 *
 * https://github.com/postcss/postcss-bem-linter
 * https://github.com/postcss/postcss-reporter
 */
gulp.task('styles:test', function () {
  var linterOptions = {
    componentSelectors: function (componentName) {
      return new RegExp('^\\.' + componentName + '(?:-{1,2}[a-z]+)?$');
    },
    utilitySelectors: /^\.u-[a-z]+$/
  };

  var reporterOptions = {
    clearMessages: true,
    plugins: ['postcss-bem-linter']
  };

  return gulp.src('src/assets/toolkit/styles/**/*.css')
    .pipe(postcss([
      bemLinter(linterOptions),
      reporter(reporterOptions)
    ]));
});

gulp.task('styles:toolkit', function () {
  return gulp.src(config.src.styles.toolkit)
    .pipe(postcss([
      cssnext()
    ]))
    .pipe(gulp.dest(config.dest + '/assets/toolkit/styles'))
    .pipe(gulpif(config.dev, reload({stream:true})));
});

gulp.task('styles', ['styles:fabricator', 'styles:toolkit']);


// scripts
gulp.task('scripts', function (done) {
  webpackCompiler.run(function (error, result) {
    if (error) {
      gutil.log(gutil.colors.red(error));
    }
    result = result.toJson();
    if (result.errors.length) {
      result.errors.forEach(function (error) {
        gutil.log(gutil.colors.red(error));
      });
    }
    done();
  });
});


// modernizr
gulp.task('modernizr', function () {
  return gulp.src('./src/assets/toolkit/**/*.{js,css}')
    .pipe(modernizr({
      options: [
        'setClasses',
        'html5shiv'
      ]
    }))
    .pipe(gulp.dest(config.dest + '/assets/toolkit/scripts'));
});


// images
gulp.task('images', ['favicon', 'icons'], function () {
  return gulp.src(config.src.images)
    .pipe(imagemin())
    .pipe(gulp.dest(config.dest + '/assets/toolkit/images'));
});

gulp.task('favicon', function () {
  return gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.dest));
});

gulp.task('icons', function () {
  return gulp.src(config.src.icons)
    .pipe(imagemin())
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: '',
          sprite: 'icons.svg'
        },
      }
    }))
    .pipe(gulp.dest(config.dest + '/assets/toolkit/images'));
});

// assemble
gulp.task('assemble', function (done) {
  assemble({
    // apply additional helpers
    helpers: requireDir('./build/helpers'),
    beautifier: {
      'indent_size': 2,
      'indent_char': ' ',
      'indent_with_tabs': false
    }
  });
  done();
});


// server
gulp.task('serve', function () {

  browserSync({
    server: {
      baseDir: config.dest,
    },
    notify: false,
    ghostMode: false,
    minify: false,
    online: false,
    open: false,
    port: 3000,
    logPrefix: 'FABRICATOR'
  });

  /**
   * Because webpackCompiler.watch() isn't being used
   * manually remove the changed file path from the cache
   */
  function webpackCache(e) {
    var keys = Object.keys(webpackConfig.cache);
    var key, matchedKey;
    for (var keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      key = keys[keyIndex];
      if (key.indexOf(e.path) !== -1) {
        matchedKey = key;
        break;
      }
    }
    if (matchedKey) {
      delete webpackConfig.cache[matchedKey];
    }
  }

  gulp.task('assemble:watch', ['assemble'], reload);
  gulp.watch('src/**/*.{html,md,json,yml}', ['assemble:watch']);

  gulp.task('styles:fabricator:watch', ['styles:fabricator'], reload);
  gulp.watch('src/assets/fabricator/styles/**/*.css', ['styles:fabricator:watch']);

  gulp.task('styles:toolkit:watch', ['styles:toolkit'], reload);
  gulp.watch('src/assets/toolkit/styles/**/*.css', ['styles:toolkit:watch']);

  gulp.task('scripts:watch', ['scripts'], reload);
  gulp.watch('src/assets/{fabricator,toolkit}/scripts/**/*.js', ['scripts:watch']).on('change', webpackCache);

  gulp.task('images:watch', ['images'], reload);
  gulp.watch([config.src.images, config.src.icons], ['images:watch']);

});


// default build task
gulp.task('default', ['clean'], function () {

  // define build tasks
  var tasks = [
    'styles',
    'scripts',
    'modernizr',
    'images',
    'assemble'
  ];

  // run build
  runSequence(tasks, function () {
    if (config.dev) {
      gulp.start('serve');
    }
  });

});
