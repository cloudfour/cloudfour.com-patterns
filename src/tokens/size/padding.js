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
        min: {
          value: modularRem(-1),
          comment: 'Minimum fluid padding for container objects.',
        },
        max: {
          value: modularRem(3),
          comment: 'Maximum fluid padding for container objects.',
        },
      },
    },
  },
};
