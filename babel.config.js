module.exports = function babelConfig(api) {
  const isTest = api.env('test');
  return {
    presets: [
      '@babel/preset-typescript',
      ['@babel/preset-env', isTest ? { modules: 'commonjs' } : {}],
    ],
  };
};
