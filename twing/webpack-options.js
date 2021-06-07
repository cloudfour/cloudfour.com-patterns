const twingEnvironmentNodePath = require.resolve('./environment');
const twingVirtualEnvironmentPath = require.resolve(
  './virtual-bundled-environment'
);

const twingLoader = {
  test: /\.twig$/,
  use: [
    // Webpack loaders run in reverse, so this top loader will run last
    {
      loader: require.resolve('./source-inputs-loader'),
    },
    {
      loader: 'twing-loader',
      options: {
        environmentModulePath: twingEnvironmentNodePath,
      },
    },
  ],
};

const alias = {
  [twingEnvironmentNodePath]: twingVirtualEnvironmentPath,
};

const valLoader = {
  test: twingVirtualEnvironmentPath,
  use: {
    loader: `val-loader`,
  },
};

module.exports = {
  alias,
  valLoader,
  twingLoader,
};
