const run = require('gulp-run');

const buildTokens = () => run('npm run preprocess:tokens').exec();

module.exports = buildTokens;
