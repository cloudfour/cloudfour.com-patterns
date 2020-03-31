const modularScale = require('../lib/modular-scale');

module.exports = [
  [
    'ms',
    prop => prop.get('type') === 'ms',
    prop => modularScale(prop.get('value'))
  ],
  [
    'ms/em',
    prop => prop.get('type') === 'ms/em',
    prop => `${modularScale(prop.get('value'))}em`
  ],
  [
    'ms/rem',
    prop => prop.get('type') === 'ms/rem',
    prop => `${modularScale(prop.get('value'))}rem`
  ],
  [
    'ms/px',
    prop => prop.get('type') === 'ms/px',
    prop => `${Math.round(modularScale(prop.get('value')) * 16)}px`
  ]
];
