const { modularEm } = require('../../scripts/modular-scale');

module.exports = {
  size: {
    spacing: {
      gap: {
        inline: {
          small: {
            value: modularEm(0),
            comment:
              'Horizontal/column gap between media object and content, etc.',
          },
          medium: {
            value: modularEm(1),
            comment:
              'Horizontal/column gap between cells in inline lists, event logs, etc.',
          },
        },
        fluid: {
          min: {
            value: modularEm(3),
            comment:
              'Minimum size of a large content gap, for example gutters between cards.',
          },
          max: {
            value: modularEm(6),
            comment:
              'Maximum size of a large content gap, for example gutters between cards.',
          },
        },
      },
      control: {
        text_inset: { value: modularEm(-1) },
        icon_inset: { value: modularEm(-3) },
      },
      type: {
        block_indent: {
          value: '{size.spacing.gap.inline.medium.value}',
          comment: 'Shared indentation for lists, blockquotes, etc.',
        },
      },
      list: {
        inline_gap: { value: '{size.spacing.gap.inline.medium.value}' },
      },
      media: {
        gap: { value: '{size.spacing.gap.inline.small.value}' },
      },
    },
  },
};
