/**
 * Every JavaScript file in the `tasks/` directory will be exported with its
 * basename used as the key. These will then be read by Gulp as individual task
 * definitions.
 *
 * This means running `npx gulp hello-world` will run the task exported by
 * `tasks/hello-world.js` if it exists.
 *
 * @see https://gulpjs.com/docs/en/getting-started/javascript-and-gulpfiles#splitting-a-gulpfile
 */

module.exports = require('require-dir')('./tasks');
