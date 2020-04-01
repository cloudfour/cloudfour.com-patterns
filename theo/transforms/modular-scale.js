const modularScale = require('../../lib/modular-scale');

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
