module.exports = {
  plugins: ['stylelint-selector-bem-pattern'],
  extends: ['stylelint-config-cloudfour', 'stylelint-config-prettier'],
  rules: {
    'plugin/selector-bem-pattern': {
      preset: 'bem',
      /** These files are automatically assumed to have components */
      implicitComponents: 'src/components/**/*.scss',
      /** These files are automatically assumed to have utility selectors */
      implicitUtilities: 'src/utilities/**/*.scss',
      utilitySelectors: /^\.u-[a-z-]+(?:\\@[a-z]+)?$/,
      // https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces#the-namespaces
      ignoreSelectors: [
        /^\.t-/,
        /^\/.s-/,
        /\.is-/,
        /\.has-/,
        /\.js-/,
        /\.o-/,
        /\.qa-/,
        /_/
      ],
      componentSelectors: {
        initial: bemSelector,
        combined: () => /.*/
      }
    }
  }
};

// Copied from https://github.com/postcss/postcss-bem-linter/blob/master/lib/preset-patterns.js
// Had to copy so that we can pass `initial` and `combined` separately,
// otherwise `combined` defaults to `initial`

/**
 * @param {String} block
 * @returns {RegExp}
 */
function bemSelector(block) {
  const WORD = '[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*';
  const element = `(?:__${WORD})?`;
  const modifier = `(?:(?:_|--)${WORD}){0,2}`;
  const attribute = '(?:\\[.+\\])?';
  return new RegExp(`^\\.c-${block}${element}${modifier}${attribute}$`);
}
