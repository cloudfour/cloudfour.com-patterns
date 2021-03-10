const StyleDictionary = require('style-dictionary');
const _ = require('lodash');

/**
 * Custom Transform: Kebab-Case without Category
 * Creates a kebab case name without the category at the front.
 * This is most useful when filtering a file to only contain tokens from one
 * category (e.g., colors.$base-dark-red instead of tokens.$color-base-dark-red).
 * If you define a prefix on the platform in your config, it will be prepended.
 *
 * ```js
 * // Matches: all
 * // Returns:
 * "background-button-primary-active"
 * "prefix-background-button-primary-active"
 * ```
 */
StyleDictionary.registerTransform({
  name: 'custom/name/ti/kebab',
  type: 'name',
  transformer: function (prop, options) {
    return _.kebabCase(
      [options.prefix].concat(prop.path.slice(1, prop.path.length)).join(' ')
    );
  },
});

/**
 * Custom Transform: Kebab-Case without Category or Type
 * Creates a kebab case name without the category or type at the front.
 * This is most useful when filtering a file to only contain tokens from one
 * category & type (e.g., base-colors.$dark-red instead of tokens.$color-base-dark-red).
 * If you define a prefix on the platform in your config, it will be prepended.
 *
 * ```js
 * // Matches: all
 * // Returns:
 * "button-primary-active"
 * "prefix-button-primary-active"
 * ```
 */
StyleDictionary.registerTransform({
  name: 'custom/name/i/kebab',
  type: 'name',
  transformer: function (prop, options) {
    return _.kebabCase(
      [options.prefix].concat(prop.path.slice(2, prop.path.length)).join(' ')
    );
  },
});

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
 * Custom Transform Group: CSS by Category
 * Same as our custom CSS transform group, but strips the category from
 * the token names for files that are limited to a single category.
 */
StyleDictionary.registerTransformGroup({
  name: 'custom/transform-group/css-category',
  transforms: ['attribute/cti', 'custom/name/ti/kebab', 'color/css'],
});

/**
 * Custom Transform Group: CSS by Category
 * Same as our custom CSS transform group, but strips the category & type from
 * the token names for files that are limited to a single category.
 */
StyleDictionary.registerTransformGroup({
  name: 'custom/transform-group/css-category-type',
  transforms: ['attribute/cti', 'custom/name/i/kebab', 'color/css'],
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
  __dirname + '/config.js'
);

// BUILD ALL THE PLATFORMS
StyleDictionaryExtended.buildAllPlatforms();
