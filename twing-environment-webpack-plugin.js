const VirtualModulesPlugin = require('webpack-virtual-modules');
const glob = require('tiny-glob');

const twingEnvironmentNodePath = require.resolve('./twing-environment');

/**
 * Creates a virtual webpack module so that webpack bundles all twig files into the bundle.
 */
const setupTwingEnvironment = async () => {
  const files = await glob('src/**/*.twig', { cwd: process.cwd() });

  const preloadedFiles = files
    .map((f) => {
      const newName = f.replace(/^src\//g, '@cloudfour/');
      return `${JSON.stringify(
        newName
      )}: require("!!raw-loader!./${f}").default`;
    })
    .join(',\n');

  const output = `
  const { TwingEnvironment, TwingLoaderArray } = require('twing');

  const files = { ${preloadedFiles} }

  module.exports = new TwingEnvironment(new TwingLoaderArray(files));`;
  return { [twingEnvironmentNodePath]: output };
};

const twingEnvironmentPlugin = async () => {
  return new VirtualModulesPlugin(await setupTwingEnvironment());
};

const twingOptions = {
  environmentModulePath: twingEnvironmentNodePath,
};

module.exports = {
  twingEnvironmentPlugin,
  twingOptions,
};
