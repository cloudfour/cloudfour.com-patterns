module.exports = {
  plugins: ['stylelint-use-logical-spec'],
  extends: ['stylelint-config-cloudfour'],
  rules: {
    // Disable stylelint-scss rules that conflict with Prettier.
    //
    // stylelint 15 deprecated its own stylistic rules and 16 removed them, which is
    // why `stylelint-config-prettier` is gone -- it has nothing left to turn off and
    // is unusable past stylelint 14. That retirement did not extend to stylelint-scss,
    // which still ships and enables every one of these, so they still have to be
    // disabled by hand.
    'scss/at-else-closing-brace-newline-after': null,
    'scss/at-else-closing-brace-space-after': null,
    'scss/at-else-empty-line-before': null,
    'scss/at-else-if-parentheses-space-before': null,
    'scss/at-function-parentheses-space-before': null,
    'scss/at-if-closing-brace-newline-after': null,
    'scss/at-if-closing-brace-space-after': null,
    'scss/at-mixin-parentheses-space-before': null,
    'scss/dollar-variable-colon-space-after': null,
    'scss/dollar-variable-colon-space-before': null,
    'scss/operator-no-newline-after': null,
    'scss/operator-no-newline-before': null,
    'scss/operator-no-unspaced': null,
    /**
     * 1. separating grid-template-rows and grid-template-columns
     *    improves readability
     * 2. removing the gap shorthands because they were forcing us to use
     *    `gap` even if we were only declaring one value. stylelint 16 reports
     *    these as `gap` rather than `grid-gap`, so match on the suffix.
     * 3. the block and inline shorthands are deliberately avoided in
     *    utilities/spacing, which documents that they are not as well
     *    supported in browsers as the longhands.
     */
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: [
          /^grid-template/i, // 1
          /gap$/i, // 2
          /^(?:margin|padding)-(?:block|inline)$/i, // 3
        ],
      },
    ],
    /**
     * Stylelint reads the Sass module namespace in `@media (width >= breakpoint.$l)`
     * as a media feature name. It recognises a bare `$variable` in range syntax but
     * not a namespaced `namespace.$variable`. Only the range form is affected --
     * `@media (min-width: breakpoint.$m)` is parsed correctly.
     */
    'media-feature-name-no-unknown': [
      true,
      { ignoreMediaFeatureNames: ['breakpoint'] },
    ],
    // We want to be able to set custom props in components (#617)
    'suitcss/custom-property-no-outside-root': null,
    // We want to be able to compose :root for theme selectors (#1056)
    'suitcss/selector-root-no-composition': null,
    'liberty/use-logical-spec': [
      'always',
      {
        // 1. Until Safari 15 adoption is higher
        // 3. Removing matches for `margin` and `padding` shorthand, which
        //    stylelint-use-logical-spec wants to break into the longhand
        //    `-block` and `-inline` properties.
        except: [
          'clear', // 1
          'float', // 1
          /^border-.+-radius$/i, // 1
          /^margin$/i, // 2
          /^padding$/i, // 2
        ],
      },
    ],
  },
};
