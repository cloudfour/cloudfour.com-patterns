module.exports = {
  extends: ['stylelint-config-cloudfour'],
  rules: {
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
          /^grid-template/iv, // 1
          /gap$/iv, // 2
          /^(?:margin|padding)-(?:block|inline)$/iv, // 3
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
  },
};
