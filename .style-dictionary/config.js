module.exports = {
  log: 'warn',
  source: ['src/tokens/**/*.+(js|json)'],
  platforms: {
    // Export all the tokens in a single SCSS file.
    scss: {
      transformGroup: 'custom/transform-group/css',
      buildPath: 'src/compiled/tokens/scss/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables',
        },
      ],
    },
    // Export some categories to their own SCSS files for easier importing,
    // removing the category from the variable names.
    'scss-categories': {
      transformGroup: 'custom/transform-group/css-category',
      buildPath: 'src/compiled/tokens/scss/',
      files: [
        {
          destination: '_color.scss',
          format: 'scss/variables',
          filter: { attributes: { category: 'color' } },
        },
        {
          destination: '_ease.scss',
          format: 'scss/variables',
          filter: { attributes: { category: 'ease' } },
        },
        {
          destination: '_size.scss',
          format: 'scss/variables',
          filter: { attributes: { category: 'size' } },
        },
      ],
    },
    // Export some category types to their own SCSS files for easier importing,
    // removing the category and type from the variable names.
    'scss-category-types': {
      transformGroup: 'custom/transform-group/css-category-type',
      buildPath: 'src/compiled/tokens/scss/',
      files: [
        {
          destination: '_aspect-ratio.scss',
          format: 'scss/variables',
          filter: {
            attributes: { category: 'number', type: 'aspect_ratio' },
          },
        },
        {
          destination: '_breakpoint.scss',
          format: 'scss/variables',
          filter: {
            attributes: { category: 'size', type: 'breakpoint' },
          },
        },
        {
          destination: '_brightness.scss',
          format: 'scss/variables',
          filter: {
            attributes: { category: 'number', type: 'brightness' },
          },
        },
        {
          destination: '_font-family.scss',
          format: 'scss/variables',
          filter: { attributes: { category: 'font', type: 'family' } },
        },
        {
          destination: '_font-weight.scss',
          format: 'scss/variables',
          filter: {
            attributes: { category: 'number', type: 'font_weight' },
          },
        },
        {
          destination: '_opacity.scss',
          format: 'scss/variables',
          filter: {
            attributes: { category: 'number', type: 'opacity' },
          },
        },
        {
          destination: '_scale.scss',
          format: 'scss/variables',
          filter: {
            attributes: { category: 'number', type: 'scale' },
          },
        },
        {
          destination: '_transition.scss',
          format: 'scss/variables',
          filter: {
            attributes: { category: 'time', type: 'transition' },
          },
        },
      ],
    },
    js: {
      transformGroup: 'custom/transform-group/css',
      buildPath: 'src/compiled/tokens/js/',
      files: [
        // Export all the tokens in a single JS file.
        {
          destination: 'tokens.js',
          format: 'javascript/module',
        },
        // Export a flattened version of just the size tokens for easier looping.
        {
          destination: 'size-tokens.js',
          format: 'custom/format/js/flat',
          filter: { attributes: { category: 'size' } },
        },
      ],
    },
  },
};
