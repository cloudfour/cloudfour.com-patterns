module.exports = {
  stories: ['../src/**/*.stories.js'],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.twig$/,
      use: 'twigjs-loader'
    });

    return config;
  }
};
