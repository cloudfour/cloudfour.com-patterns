module.exports = {
  extends: ['plugin:@cloudfour/recommended', 'plugin:mdx/recommended'],
  globals: {
    Prism: true,
  },
  plugins: ['react'],
  settings: {
    node: {
      allowModules: [
        '@storybook/addon-docs',
        '@storybook/addon-knobs',
        '@storybook/client-api',
      ],
    },
  },
  rules: {
    'padding-line-between-statements': 'off',
    'react/jsx-uses-vars': 'error',
  },
  overrides: [
    {
      // This override shouldn't be necessary because the cloudfour plugin has the exact same override,
      // but eslint isn't merging the overrides from the cloudfour plugin and the mdx plugin as expected.
      // Specifying this here fixes it.
      files: ['*.ts', '*.tsx'],
      parser: require.resolve(
        // This package has to be resolved from the eslint plugin
        // since it isn't installed into the pattern library directly.
        '@cloudfour/eslint-plugin/node_modules/@typescript-eslint/parser'
      ),
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
