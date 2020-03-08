const { resolve } = require('path');
const theo = require('theo');
const yaml = require('js-yaml');

/**
 * Webpack loader for Theo YAML/YML.
 *
 * @param {string} source - The contents of the requested file.
 */
function theoLoader(source) {
  // The absolute path to the requested design token file.
  const tokenPath = this.resourcePath;
  // Lets Webpack know this is an async loader and provides us a callback.
  const done = this.async();
  // Load the source to a JavaScript object so we can process imports.
  const def = yaml.safeLoad(source);

  // By processing import paths beforehand, we give Webpack the info it needs
  // to refresh files accurately and clear its cache.
  if (def.imports) {
    def.imports.forEach(importPath => {
      // Import paths are relative to the requesting file.
      this.addDependency(resolve(tokenPath, importPath));
    });
  }

  theo.registerFormat(
    'verbose.js',
    `
      // Source: {{stem meta.file}}
      module.exports = {
        {{#each props as |prop|}}
          {{camelcase prop.name}}: {
            tokenName: "{{prop.name}}",
            sassName: "\${{kebabcase prop.name}}",
            value: {{#compare prop.type "==" "float"}}{{prop.value}}{{else}}"{{prop.value}}"{{/compare}},
            type: "{{prop.type}}",
            category: "{{prop.category}}"{{#if prop.meta}},
            meta: {{JSONstringify prop.meta}}
            {{/if}}
          }{{#unless @last}},{{/unless}}
        {{/each}}
      }
    `);

  theo
    .convert({
      transform: {
        file: tokenPath,
        type: 'web'
      },
      format: {
        // Outputs ES modules: `export const propertyName = value;`
        // type: 'module.js'
        type: 'verbose.js'
      }
    })
    .then(result => {
      done(null, `module.exports = ${result}`);
    })
    .catch(({ message }) => {
      done(new Error(`Theo import of ${tokenPath} failed: ${message}`));
    });
}

theoLoader.raw = true;

module.exports = theoLoader;
