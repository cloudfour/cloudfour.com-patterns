module.exports = {
  plugins: ['stylelint-use-logical-spec'],
  extends: ['stylelint-config-cloudfour', 'stylelint-config-prettier'],
  rules: {
    // disable stylelint-scss rules that conflict with prettier
    // these should be included in stylelint-config-prettier but were removed
    // @see https://github.com/prettier/stylelint-config-prettier/pull/124
    // @see https://github.com/prettier/stylelint-config-prettier/releases/tag/v9.0.2
    'scss/at-else-closing-brace-newline-after': null,
    'scss/at-else-closing-brace-space-after': null,
    'scss/at-else-empty-line-before': null,
    'scss/at-else-if-parentheses-space-before': null,
    'scss/at-function-parentheses-space-before': null,
    'scss/at-if-closing-brace-newline-after': null,
    'scss/at-if-closing-brace-space-after': null,
    'scss/at-mixin-parentheses-space-before': null,
    'scss/dollar-variable-colon-newline-after': null,
    'scss/dollar-variable-colon-space-after': null,
    'scss/dollar-variable-colon-space-before': null,
    'scss/operator-no-newline-after': null,
    'scss/operator-no-newline-before': null,
    'scss/operator-no-unspaced': null,
    /**
     * 1. separating grid-template-rows and grid-template-columns
     *    improves readability
     * 2. removing grid-*-gap because it was forcing us to use
     *    grid-gap even if we were only declaring one value.
     */
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: [
          /^grid-template/i, // 1
          /^grid-.*?gap/i, // 2
        ],
      },
    ],
    // we want to be able to set custom props in components (#617)
    'suitcss/custom-property-no-outside-root': null,
    // we want to be able to compose :root for theme selectors (#1056)
    'suitcss/selector-root-no-composition': null,
    'liberty/use-logical-spec': [
      'always',
      {
        // Until Safari 15 adoption is higher
        except: ['clear', 'float', /^border-.+-radius$/i],
      },
    ],
  },
};
