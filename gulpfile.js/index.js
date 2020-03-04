/**
 * Every JavaScript file in the `tasks/` directory will be exported with its
 * basename used as the key. These will then be read by Gulp as individual task
 * definitions.
 *
 * This means running `npx gulp hello-world` will run the task exported by
 * `tasks/hello-world.js` if it exists.
 */

module.exports = require('require-dir')('./tasks');
