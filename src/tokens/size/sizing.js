const { modularEm } = require('../../scripts/modular-scale');

module.exports = {
  size: {
    height: {
      control: {
        default: { value: modularEm(4) },
        multiline: { value: modularEm(6) },
      },
    },
    icon: {
      default: {
        value: modularEm(0),
        comment: 'The default icon size.',
      },
      medium: {
        value: modularEm(1),
        comment: 'The medium icon size.',
      },
      large: {
        value: modularEm(2),
        comment: 'The large icon size.',
      },
    },
    width: {
      card_column: {
        min: {
          value: '15em',
          comment: 'The minimum space to display a default card in a grid.',
        },
      },
      logo_group: {
        item: {
          value: '9em',
          comment: 'The width of individual logos in the logo group.',
        },
      },
    },
    square: {
      avatar: {
        small: { value: modularEm(3) },
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
