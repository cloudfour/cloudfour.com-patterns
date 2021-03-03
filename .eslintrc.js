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
        // eslint-disable-next-line @cloudfour/node/no-extraneous-require
        '@typescript-eslint/parser'
      ),
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};
