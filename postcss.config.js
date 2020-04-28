const plugins = [
  require('postcss-inline-svg')({
    paths: ['./src/assets'],
  }),
];

// For production only, add cssnano
if (/prod/.test(process.env.NODE_ENV)) {
  plugins.push(require('cssnano')());
}

module.exports = {
  plugins,
};
