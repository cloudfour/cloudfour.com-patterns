const StyleDictionary = require('style-dictionary');

const styleDictionaryConfig = {
  log: 'warn',
  source: ['src/tokens/**/*.+(js|json)'],
  platforms: {
    scss: {
      transformGroup: 'custom/transform-group/css',
      buildPath: 'src/compiled/scss/',
      files: [
        {
          destination: '_tokens.scss',
          format: 'scss/variables',
        },
        {
          destination: '_aspect-ratios.scss',
          format: 'scss/variables',
          filter: { attributes: { category: 'number', type: 'aspect_ratio' } },
        },
        {
          destination: '_breakpoints.scss',
          format: 'scss/variables',
          filter: { attributes: { category: 'size', type: 'breakpoint' } },
        },
      ],
    },
    js: {
      transformGroup: 'custom/transform-group/css',
      buildPath: 'src/compiled/js/',
      files: [
        {
          destination: 'tokens.js',
          format: 'javascript/module',
        },
      ],
    },
  },
};

/**
 * Custom Transform Group: CSS
 * This is a modified version of the CSS transform group without the time,
 * size, or icon transformations and using our custom CSS color transform.
 * We also use it for JSON.
 */
StyleDictionary.registerTransformGroup({
  name: 'custom/transform-group/css',
  transforms: ['attribute/cti', 'name/cti/kebab', 'color/css'],
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
const StyleDictionaryExtended = StyleDictionary.extend(styleDictionaryConfig);

// BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();
