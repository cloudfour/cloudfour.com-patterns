module.exports = {
  color: {
    brand: {
      /**
       * We list each color as `primary_*` rather than
       * nesting in a `primary` object so we can have
       * `$color-brand-primary` without the `-default`.
       */
      primary_lighter: {
        value: '{color.base.blue_lighter}',
        comment: 'Accessible on -darker colors.',
      },
      primary_light: {
        value: '{color.base.blue_light}',
      },
      primary: {
        value: '{color.base.blue}',
        comment: 'Accessible on white.',
      },
      primary_dark: {
        value: '{color.base.blue_dark}',
        comment: 'Accessible on white.',
      },
      primary_darker: {
        value: '{color.base.blue_darker}',
        comment: 'Accessible on white.',
      },
    },
  },
};
