const { modularEm } = require('../../scripts/modular-scale');

module.exports = {
  size: {
    height: {
      control: {
        default: { value: modularEm(4) },
        multiline: { value: modularEm(6) },
      },
    },
    square: {
      control: {
        icon: { value: modularEm(0) },
      },
      toggle: {
        medium: { value: modularEm(2) },
      },
    },
  },
};
