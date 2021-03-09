const run = require('gulp-run');

const buildTokens = () => {
  return run('npm run preprocess:tokens').exec();
};

module.exports = buildTokens;
