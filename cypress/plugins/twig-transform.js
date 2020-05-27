// @ts-nocheck
const transformTools = require('browserify-transform-tools');
const twigWebpackLoader = require('twigjs-loader');
const resolve = require('resolve');
const { dirname } = require('path');

// This is an adapter for twigjs-loader which makes it into a browserify transform
// None of the pre-existing twig transforms for browserify handle
// dependencies between .twig files (i.e. via the embed tag)
//
// Wrapping the webpack loader for twigjs is a simpler solution than directly interfacing with twigjs,
// because that would require scanning through the parsed tokens to determine dependencies between files
// (twigjs-loader does this)

module.exports = transformTools.makeStringTransform('twigify', {}, function (
  input,
  transformOptions,
  done
) {
  const file = transformOptions.file;

  if (!file.endsWith('.twig')) return done(null, input);

  // Mimics properties from:
  // https://webpack.js.org/api/loaders/#the-loader-context
  // Needs to shim most this.* and loaderApi.* properties that this file uses:
  // https://github.com/megahertz/twigjs-loader/blob/master/index.js
  const webpackContext = {
    async() {
      // Returns the callback, which the loader will call with (err, output)
      return done;
    },
    resourcePath: file,
    resolve(ctx, id, cb) {
      console.log('resolving', id);
      resolve(id, { basedir: dirname(file) }, cb);
    },
    addDependency() {
      // We can ignore this because browserify will see that the transformed output
      // contains a require() to each dependency
    },
  };

  twigWebpackLoader.call(webpackContext, input);
});
