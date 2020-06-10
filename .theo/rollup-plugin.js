const theo = require('.');
const ext = /\.ya?ml$/;

/**
 * Rollup plugin that lets you import Theo design token files in YAML format as
 * ES6 modules in Theo's `module.js` format.
 *
 * @returns {function}
 * @see https://github.com/salesforce-ux/theo#modulejs
 * @see https://rollupjs.org/guide/en/#transformers
 * @see https://github.com/rollup/plugins/blob/master/packages/yaml/src/index.js
 */

function theoPlugin() {
  return {
    name: 'theo',
    async transform(_content, id) {
      // Only transform YAML files. If this were a separate plugin, we could
      // do one better by using the createFilter function from
      // `@rollup/pluginutils`, but that adds some heavy install time, so it
      // seemed unnecessary.
      if (!ext.test(id)) return null;

      // Asynchronously convert the Theo file to the desired format.
      // Unfortunately we can't just pass in content from Rollup: Theo couldn't
      // import other files in that case.
      const code = await theo.convert({
        transform: {
          file: id,
        },
        format: {
          type: 'module.js',
        },
      });

      return {
        code,
        map: { mappings: '' }, // Theo doesn't have source maps
      };
    },
  };
}

module.exports = { theoPlugin };
