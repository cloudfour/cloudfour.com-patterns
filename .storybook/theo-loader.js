const { resolve } = require('path');
const theo = require('theo');
const yaml = require('js-yaml');

function loader(source) {
  const tokenPath = this.resourcePath;
  const done = this.async();
  const def = yaml.safeLoad(source);

  if (def.imports) {
    def.imports.forEach(importPath => {
      this.addDependency(resolve(this.resourcePath, importPath));
    });
  }

  theo
    .convert({
      transform: {
        file: tokenPath,
        type: 'web'
      },
      format: {
        type: 'json'
      }
    })
    .then(jsonString => {
      done(null, `export default ${jsonString}`);
    })
    .catch(({ message }) => {
      done(new Error(`Theo import of ${tokenPath} failed: ${message}`));
    });
}

loader.raw = true;

module.exports = loader;
