const { modularEm, modularRem } = require('../../scripts/modular-scale');

module.exports = {
  size: {
    padding: {
      control: {
        horizontal: { value: modularEm(1) },
        vertical: { value: modularEm(-4) },
      },
      cell: {
        horizontal: {
          value: modularEm(-3),
          comment: 'Used for table cells or other repeating content rows.',
        },
        vertical: {
          value: modularEm(-3),
          comment: 'Used for table cells or other repeating content rows.',
        },
      },
      container: {
        horizontal: {
          min: {
            value: modularRem(-1),
            comment:
              'Minimum inline (horizontal) fluid padding for container objects.',
          },
          max: {
            value: modularRem(3),
            comment:
              'Maximum inline (horizontal) padding for container objects.',
          },
        },
        vertical: {
          min: {
            value: modularRem(3),
            comment:
              'Minimum block (vertical) fluid padding for container objects.',
          },
          max: {
            value: modularRem(6),
            comment: 'Maximum block (vertical) padding for container objects.',
          },
        },
      },
    },
  },
};
