const theo = require('theo');
const { resolve } = require('path');

// Get modular scale ratio from design token. I know, I know, this seems a
// little messy and circular, but otherwise we'll have to store our ratio in
// more than one place.
const msTokens = JSON.parse(
  theo.convertSync({
    transform: {
      type: 'web',
      file: resolve(__dirname, '../../src/design-tokens/modular-scale.yml'),
    },
    format: {
      type: 'json',
    },
  })
);

// Convert the string to a number
const ratio = parseFloat(msTokens.ratio, 10);

// Simple function for calculating ratio steps
function modularScale(step) {
  return ratio ** parseFloat(step, 10);
}

// Export value transform definitions using style of standard Theo transforms
module.exports = {
  ms: {
    predicate: (prop) => prop.get('type') === 'ms',
    transform: (prop) => modularScale(prop.get('value')),
  },
  'ms/em': {
    predicate: (prop) => prop.get('type') === 'ms/em',
    transform: (prop) => `${modularScale(prop.get('value'))}em`,
  },
  'ms/rem': {
    predicate: (prop) => prop.get('type') === 'ms/rem',
    transform: (prop) => `${modularScale(prop.get('value'))}rem`,
  },
  'ms/px': {
    predicate: (prop) => prop.get('type') === 'ms/px',
    transform: (prop) =>
      `${Math.round(modularScale(prop.get('value')) * 16)}px`,
  },
};
