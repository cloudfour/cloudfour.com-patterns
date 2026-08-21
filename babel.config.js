// Only the Rollup library build runs Babel (see gulpfile.js/tasks/build-scripts.js).
// Tests used to come through here too, under Jest, which needed the output
// transformed to CommonJS; Vitest transforms with Vite instead.
module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-env'],
};
