const { modularEm } = require('../../scripts/modular-scale');

module.exports = {
  size: {
    height: {
      control: {
        default: { value: modularEm(4) },
        multiline: { value: modularEm(6) },
      },
    },
    width: {
      card_column: {
        min: {
          value: '15em',
          comment: 'The minimum space to display a default card in a grid.',
        },
      },
    },
    square: {
      avatar: {
        medium: { value: modularEm(5) },
        full: { value: '100%' },
      },
      control: {
        icon: { value: modularEm(0) },
      },
      toggle: {
        medium: { value: modularEm(2) },
      },
    },
    overlap: {
      small: {
        value: modularEm(-6),
        comment:
          'Small amount of overlap between adjacent items organized in a visual bunch.',
      },
    },
  },
};
