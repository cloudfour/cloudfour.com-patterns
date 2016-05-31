'use strict';

module.exports = {
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

  // TODO: This might be handled by the core assets task?
  favicon: {
    src: './src/favicon.ico',
    dest: './dist'
  },

  icons: {
    src: 'src/assets/toolkit/icons/*.svg',
    dest: './dist/assets/toolkit/images'
  },

  images: {
    src: './src/assets/toolkit/images/**/*',
    dest: './dist/assets/toolkit/images'
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
            './src/assets/toolkit/scripts/toolkit.js'
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
        match: ['./src/assets/toolkit/{images,icons}/**/*'],
        tasks: ['images', 'icons']
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
