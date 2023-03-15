const { modularEm } = require('../../scripts/modular-scale');

module.exports = {
  size: {
    height: {
      control: {
        default: { value: modularEm(4) },
        multiline: { value: modularEm(6) },
      },
      logo: {
        default: {
          value: modularEm(3),
          comment:
            'Default height for the logo component, used to display client and project logos relative to case studies.',
        },
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
      'x-large': {
        value: modularEm(5),
        comment: 'The x-large icon size.',
      },
    },
    width: {
      card_column: {
        min: {
          value: '16em',
          comment: 'The minimum space to display a default card in a grid.',
        },
      },
      logo_group: {
        item_width: {
          value: '9em',
          comment: 'The width of individual logos in the logo group.',
        },
      },
    },
    square: {
      avatar: {
        small: { value: modularEm(3) },
        medium: { value: modularEm(5) },
        large: { value: modularEm(11) },
        full: { value: '100%' },
      },
      control: {
        icon: { value: modularEm(0) },
      },
      toggle: {
        medium: { value: modularEm(2) },
      },
      footnote_link: {
        value: modularEm(2),
      },
    },
    overlap: {
      small: {
        value: modularEm(-6),
        comment:
          'Small amount of overlap between adjacent items organized in a visual bunch.',
      },
      large: {
        value: modularEm(1),
        comment: 'Larger amount of overlap between adjacent items.',
      },
    },
  },
};
