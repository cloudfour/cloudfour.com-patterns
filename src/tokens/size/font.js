const { modularEm } = require('../../scripts/modular-scale');

module.exports = {
  size: {
    font: {
      big: {
        value: modularEm(1),
        comment:
          'Slightly larger than normal. Good for short introductory sections or important actions.',
      },
      small: {
        value: modularEm(-1),
        comment:
          'Slightly smaller than usual. Good for badges, captions or other space-constrained bits of copy.',
      },
    },
  },
};
