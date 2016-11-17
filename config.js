'use strict';

const env = require('gulp-util').env;
const uglify = require('rollup-plugin-uglify');
const buble = require('rollup-plugin-buble');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

module.exports = {
  copy: {
    src: './src/static/**/*',
    dest: './dist'
  },

  'css:toolkit': {
    src: './src/assets/toolkit/{styles,styles/sandbox}/*.css',
    dest: './dist/assets/toolkit/styles',
    name: 'css:toolkit',
    optimize: !env.dev
  },

  'css:drizzle': {
    src: './src/assets/**/drizzle.css',
    dest: './dist/assets',
    prefix: 'drizzle-',
    name: 'css:drizzle'
  },

  js: {
    // Default Rollup options
    rollup: {
      exports: 'none',
      format: 'iife',
      plugins: [
        nodeResolve(),
        commonjs(),
        buble()
      ].concat(env.dev ? [] : uglify())
    },
    // Bundle-specific Rollup option overrides
    bundles: [
      {
        entry: './src/assets/toolkit/scripts/toolkit.js',
        dest: './dist/assets/toolkit/scripts/toolkit.js'
      },
      {
        entry: './src/assets/drizzle/scripts/drizzle.js',
        dest: './dist/assets/drizzle/scripts/drizzle.js'
      },
      {
        entry: './src/assets/toolkit/scripts/home-animation.js',
        dest: './dist/assets/toolkit/scripts/home-animation.js'
      }
    ]
  },

  serve: {
    plugins: {
      browserSync: {
        files: ['./dist/**/*'],
        ghostMode: false,
        logPrefix: 'Drizzle',
        minify: false,
        notify: false,
        online: false,
        open: false,
        server: {baseDir: './dist'}
      }
    }
  },

  watch: {
    watchers: [
      {
        match: ['./src/assets/**/*.css'],
        tasks: ['css']
      },
      {
        match: ['./src/assets/**/*.js'],
        tasks: ['js']
      },
      {
        match: ['./src/static/**/*'],
        tasks: ['copy']
      },
      {
        match: ['./src/{data,pages,patterns,templates}/**/*'],
        tasks: ['drizzle']
      }
    ]
  },

  drizzle: {
    src: {
      patterns: {
        basedir: './src/patterns',
        glob: './src/patterns/**/*.hbs'
      },
      templates: {
        basedir: './src/templates',
        glob: './src/templates/**/*.hbs'
      }
    },
    dest: {
      pages: './dist',
      patterns: './dist/patterns'
    },
    fieldParsers: {
      notes: 'markdown'
    },
    layouts: {
      page: 'drizzle.default',
      collection: 'drizzle.collection'
    }
  }
};
