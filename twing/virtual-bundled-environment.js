const glob = require('tiny-glob');

/**
 * Returns the string of a virtual webpack module that is used so that webpack
 * bundles all twig files into the bundle.
 */
const getVirtualFile = async () => {
  const files = await glob('src/**/*.twig', { cwd: process.cwd() });

  const preloadedFiles = files
    .map((f) => {
      const newName = f.replace(/^src\//g, '@cloudfour/');
      return `${JSON.stringify(
        newName
      )}: require("!!raw-loader!../${f}").default`;
    })
    .join(',\n');

  return `
  const { TwingEnvironment, TwingLoaderArray } = require('twing');

  const files = { ${preloadedFiles} }

  module.exports = new TwingEnvironment(new TwingLoaderArray(files));`;
};

/** Webpack will call this file in node, the `code` property is the code that gets added to the bundle */
module.exports = async () => ({
  // This is not cached
  // But that is ok, because tiny-glob has its own cache and string concatanation is fast
  code: await getVirtualFile(),
});
