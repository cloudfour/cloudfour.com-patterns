const theo = require('theo');

function loader() {
  const tokenPath = this.resourcePath;
  const done = this.async();
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
