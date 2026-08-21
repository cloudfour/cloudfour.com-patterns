import _ from 'lodash';
import StyleDictionary from 'style-dictionary';

import config from './config.mjs';

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
  transform(token, platform) {
    return _.kebabCase([platform.prefix, ...token.path.slice(1)].join(' '));
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
  transform(token, platform) {
    return _.kebabCase([platform.prefix, ...token.path.slice(2)].join(' '));
  },
});

/**
 * Custom Transform: Re-join negative number name segments
 * Looks for occurrences of `n-{number}` and removes the `-`. Useful for keeping
 * negative number modular scale step token names consistent with related class
 * names.
 */
StyleDictionary.registerTransform({
  name: 'custom/name/i/kebab-rejoin-n',
  type: 'name',
  transform(token) {
    return token.name.replaceAll(/-n-(\d)/g, '-n$1');
  },
});

/**
 * Custom Transform: CSS Colors, matched by category
 * Identical to the built-in `color/css` transform, but selected by our CTI
 * category rather than by a `type: 'color'` property on the token.
 *
 * The built-in transform used to match on `attributes.category`, but as of
 * Style Dictionary 4 its filter requires an explicit `type` on each token.
 * Our tokens describe themselves through the CTI path instead, so the built-in
 * filter never matches them and colors would pass through unnormalized —
 * leaving `#3d84F5`, `#000` and `rgba(0, 0, 0, 0.60)` in the output exactly as
 * authored. Re-filtering on the category keeps colors normalized the way they
 * have always been, so authors can keep writing whichever form they like.
 */
StyleDictionary.registerTransform({
  ...StyleDictionary.hooks.transforms['color/css'],
  name: 'custom/value/color/css',
  filter: (token) => token.attributes?.category === 'color',
});

/**
 * Custom Transform Group: CSS
 * This is a modified version of the CSS transform group without the time,
 * size, or icon transformations and using our custom CSS color transform.
 * We also use it for JSON.
 */
StyleDictionary.registerTransformGroup({
  name: 'custom/transform-group/css',
  transforms: [
    'attribute/cti',
    'name/kebab',
    'custom/name/i/kebab-rejoin-n',
    'custom/value/color/css',
  ],
});

/**
 * Custom Transform Group: CSS by Category
 * Same as our custom CSS transform group, but strips the category from
 * the token names for files that are limited to a single category.
 */
StyleDictionary.registerTransformGroup({
  name: 'custom/transform-group/css-category',
  transforms: [
    'attribute/cti',
    'custom/name/ti/kebab',
    'custom/name/i/kebab-rejoin-n',
    'custom/value/color/css',
  ],
});

/**
 * Custom Transform Group: CSS by Category
 * Same as our custom CSS transform group, but strips the category & type from
 * the token names for files that are limited to a single category.
 */
StyleDictionary.registerTransformGroup({
  name: 'custom/transform-group/css-category-type',
  transforms: [
    'attribute/cti',
    'custom/name/i/kebab',
    'custom/name/i/kebab-rejoin-n',
    'custom/value/color/css',
  ],
});

/**
 * Custom Format: JS Flat
 * This custom format is based on `json/flat` but modified to return a JS module
 * containing a `value` and `comment` (if one exists).
 */
StyleDictionary.registerFormat({
  name: 'custom/format/js/flat',
  format({ dictionary }) {
    const tokens = {};
    for (const token of dictionary.allTokens) {
      tokens[token.name] = token;
    }
    return `export default ${JSON.stringify(tokens, null, '  ')}`;
  },
});

/**
 * Custom Format: JS ESM
 * This custom format is based on `javascript/module` but it uses `export default` instead of `module.exports`
 */
StyleDictionary.registerFormat({
  name: 'custom/format/js/esm',
  format({ dictionary }) {
    return `export default ${JSON.stringify(dictionary.tokens, null, '  ')}`;
  },
});

// APPLY THE CONFIGURATION
// IMPORTANT: the registration of custom transforms
// needs to be done _before_ applying the configuration
const sd = new StyleDictionary(config);

// BUILD ALL THE PLATFORMS
await sd.buildAllPlatforms();
