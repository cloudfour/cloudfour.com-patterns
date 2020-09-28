const { modularEm } = require('../../scripts/modular-scale');

module.exports = {
  size: {
    rhythm: {
      compact: { value: modularEm(-6) },
      condensed: { value: modularEm(-1) },
      default: { value: modularEm(1) },
      generous: { value: modularEm(3) },
    },
  },
};
