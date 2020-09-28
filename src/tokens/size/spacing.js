const { modularEm } = require('../../scripts/modular-scale');

module.exports = {
  size: {
    spacing: {
      control: {
        text_inset: { value: modularEm(-1) },
        icon_inset: { value: modularEm(-3) },
      },
      type: {
        block_indent: { value: modularEm(1) },
      },
      list: {
        inline_gap: { value: modularEm(1) },
      },
      media: {
        gap: { value: modularEm(0) },
      },
    },
  },
};
