'use strict';

module.exports = {
  copy: {
    src: './src/static/**/*',
    dest: './dist'
  },

  'css:toolkit': {
    src: './src/assets/toolkit/{styles,styles/sandbox}/*.css',
    dest: './dist/assets/toolkit/styles',
    name: 'css:toolkit'
  },

  'css:drizzle': {
    src: './src/assets/**/drizzle.css',
    dest: './dist/assets',
    prefix: 'drizzle-',
    name: 'css:drizzle'
  },

  js: {
    plugins: {
      webpack: {
        entry: {
          // Drizzle UI scripts
          'drizzle/scripts/drizzle':
            './src/assets/drizzle/scripts/drizzle.js',
          // Common toolkit scripts
          'toolkit/scripts/toolkit':
            './src/assets/toolkit/scripts/toolkit.js',
          // Homepage animation
          'toolkit/scripts/home-animation':
            './src/assets/toolkit/scripts/home-animation.js'
        },
        output: {
          path: './dist/assets',
          filename: '[name].js'
        },
        module: {
          loaders: [
            {
              test: /\.js$/,
              loaders: ['babel-loader']
            }
          ]
        }
      }
    }
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
        server: { baseDir: './dist' }
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
