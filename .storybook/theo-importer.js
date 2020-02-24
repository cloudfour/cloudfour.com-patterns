const { dirname, resolve } = require('path');
const theo = require('theo');

/**
 * Import Theo YAML files into SCSS files.
 *
 * Parameter names (url, prev, done) are the same as those defined in the Sass
 * importer documentation.
 *
 * @param {string} url - File path relative to SCSS file.
 * @param {string} prev - File path of SCSS file that made import request.
 * @param {function({ file: string, contents: string })} done - Callback to
 * pass results to.
 * @link <https://basalt.io/blog/theo-design-tokens-using-node-sass-importer-for-any-build-method>
 * @link <https://github.com/sass/node-sass#importer--v200---experimental>
 */
function theoImporter(url, prev, done) {
  // If this isn't a YAML file, do nothing
  if (!/\.ya?ml$/.test(url)) {
    return null;
  }

  // Get absolute path of design token file
  const tokenPath = resolve(dirname(prev), url);

  // Asynchronously resolve file via Theo
  theo
    .convert({
      transform: {
        file: tokenPath,
        type: 'web'
      },
      format: {
        type: 'default.scss' // Variables will have `!default` appended
      }
    })
    .then(scssString => {
      done({ contents: scssString }); // Pass result to Sass
    })
    .catch(({ message }) => {
      done(new Error(`Theo import of ${tokenPath} failed: ${message}`));
    });
}

module.exports = theoImporter;
