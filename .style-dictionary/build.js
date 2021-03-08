const StyleDictionary = require('style-dictionary');

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

/**
 * Custom Format: JS Flat
 * This custom format is based on `json/flat` but modified to return a JS module
 * containing a `value` and `comment` (if one exists).
 */
StyleDictionary.registerFormat({
  name: 'custom/format/js/flat',
  formatter(dictionary) {
    const tokens = {};
    dictionary.allProperties.forEach((prop) => {
      tokens[prop.name] = prop;
    });
    return `module.exports = ${JSON.stringify(tokens, null, '  ')}`;
  },
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
const StyleDictionaryExtended = StyleDictionary.extend(
  __dirname + '/config.json'
);

// BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();
