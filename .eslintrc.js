module.exports = {
  extends: ['plugin:@cloudfour/recommended', 'plugin:mdx/recommended'],
  plugins: ['react'],
  settings: {
    n: {
      allowModules: [
        '@storybook/addon-docs',
        '@storybook/addon-docs/blocks',
        'storybook',
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
        // eslint-disable-next-line @cloudfour/n/no-extraneous-require
        '@typescript-eslint/parser'
      ),
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    {
      files: ['src/**'],
      rules: {
        // Src files are bundled so they do not have to follow Node's resolution rules
        '@cloudfour/n/no-missing-import': 'off',
        // These files are bundled for the browser, where node: imports have no meaning
        '@cloudfour/unicorn/prefer-node-protocol': 'off',
      },
    },
    {
      files: ['*.mdx'],
      rules: {
        // The auto-fixer for this rule does not work with .mdx files.
        '@cloudfour/import/order': 'off',
      },
    },
    {
      // Stories and docs pages import Storybook through package export subpaths
      // (`@storybook/addon-docs/blocks`, `storybook/preview-api`). This rule cannot
      // tell a subpath from a file path, so it demands a `.js` that then breaks
      // resolution -- its auto-fix actively introduces a bug here.
      files: ['*.mdx', '*.stories.js', '.storybook/**'],
      rules: {
        '@cloudfour/n/file-extension-in-import': 'off',
      },
    },
  ],
};
