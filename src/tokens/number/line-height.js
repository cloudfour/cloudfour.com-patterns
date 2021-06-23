const { modularScale } = require('../../scripts/modular-scale');

module.exports = {
  number: {
    line_height: {
      loose: {
        value: modularScale(2),
        comment: 'For multiline copy.',
      },
      tight: {
        value: modularScale(1),
        comment: 'For headings and single-line text.',
      },
      tighter: {
        value: modularScale(0),
        comment:
          'For very large headings or UI elements with built-in height or padding.',
      },
    },
  },
};
