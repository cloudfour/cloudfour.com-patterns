const plugins = [
  require('postcss-inline-svg')({
    paths: ['./src/assets'],
  }),
  /**
   * Enables Stage 2 options, by default.
   * This includes logical properties and values.
   * However, due to the possibility that the spec will change and browser support
   * appears inconsistent with what's currently documented, for now we will always
   * process these to directional properties.
   * @TODO - Reconsider this decision as logical properties move to full adoption.
   * @see https://preset-env.cssdb.org/features#logical-properties-and-values
   * @see https://github.com/csstools/postcss-preset-env#stage
   * @see https://github.com/csstools/postcss-preset-env/blob/master/INSTALL.md#postcss-cli
   */
  require('postcss-preset-env')({
    features: {
      'logical-properties-and-values': {
        /**
         * @see https://github.com/csstools/postcss-logical#options
         * Using preserve:true overrides global `dir`.
         * Setting `dir: 'ltr'` breaks some examples that depend on other `dir` settings.
         * PostCSS logical properties may also be broken, as `preserve:true`
         * doesn't seem to affect things like `margin-block-start`. It always
         * produces only directional output.
         */
        preserve: true,
      },
    },
  }),
];

// For production only, add cssnano
if (/prod/.test(process.env.NODE_ENV)) {
  plugins.push(require('cssnano')());
}

module.exports = {
  plugins,
};
