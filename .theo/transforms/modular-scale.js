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
  modular: {
    predicate: (prop) => prop.get('type') === 'modular',
    transform: (prop) => modularScale(prop.get('value')),
  },
  'modular/em': {
    predicate: (prop) => prop.get('type') === 'modular/em',
    transform: (prop) => `${modularScale(prop.get('value'))}em`,
  },
  'modular/rem': {
    predicate: (prop) => prop.get('type') === 'modular/rem',
    transform: (prop) => `${modularScale(prop.get('value'))}rem`,
  },
  'modular/px': {
    predicate: (prop) => prop.get('type') === 'modular/px',
    transform: (prop) =>
      `${Math.round(modularScale(prop.get('value')) * 16)}px`,
  },
};
