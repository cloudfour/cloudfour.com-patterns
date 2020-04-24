module.exports = {
  plugins: [
    require('postcss-inline-svg')({
      paths: ['./src/assets'],
    }),
    /**
     * Enables Stage 2 options, by default.
     * This includes logical properties and values.
     * @see https://preset-env.cssdb.org/features#logical-properties-and-values
     * @see https://github.com/csstools/postcss-preset-env#stage
     * @see https://github.com/csstools/postcss-preset-env/blob/master/INSTALL.md#postcss-cli
     */
    require('postcss-preset-env')(),
  ],
};
