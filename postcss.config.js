module.exports = {
  plugins: [
    require('postcss-inline-svg')({
      paths: ['./src/assets'],
    }),
    require('postcss-media-minmax')(),
  ],
};
