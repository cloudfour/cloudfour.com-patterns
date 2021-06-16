const { modularEm } = require('../../scripts/modular-scale');

module.exports = {
  size: {
    spacing: {
      gap: {
        button: {
          extra: {
            value: modularEm(-4),
            comment: 'Gap between button content and extra content.',
          },
        },
        button_group: {
          default: {
            value: modularEm(-2),
            comment: 'The Button Group default gap spacing.',
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
        form_group: {
          default: {
            value: modularEm(-5),
            comment: 'The Form Group default gap spacing.',
          },
        },
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
