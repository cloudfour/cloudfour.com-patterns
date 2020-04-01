const theo = require('theo');
const { resolve } = require('path');

const msTokens = JSON.parse(theo.convertSync({
  transform: {
    type: 'web',
    file: resolve(__dirname, '../src/design-tokens/modular-scale.yml')
  },
  format: {
    type: 'json'
  }
}));

const ratio = parseFloat(msTokens.ratio, 10);

function modularScale(step) {
  return ratio ** parseFloat(step, 10);
}

module.exports = modularScale;
