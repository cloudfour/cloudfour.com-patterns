module.exports = {
  plugins: [
    require('postcss-inline-svg')({
      paths: ['./src/assets'],
    }),
    require('postcss-color-hex-alpha')(),
    require('postcss-media-minmax')(),
  ],
};
