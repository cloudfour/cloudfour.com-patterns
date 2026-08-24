import cloudFourConfig from '@cloudfour/eslint-config';
import * as mdx from 'eslint-plugin-mdx';
import react from 'eslint-plugin-react';

export default [
  {
    ignores: [
      'dist/',
      'ts-dist/',
      'src/compiled/',
      'storybook-static/',
      // Ignore all files in the prototypes directory except for stories.
      // The `*.*` syntax is required so we don't ignore entire directories:
      // if we ignore directories there's no way to unignore `stories` files in them.
      'src/prototypes/**/*.*',
      '!src/prototypes/**/*.stories.*',
      // Ignore syntax highlighting examples
      'src/vendor/highlight/demo/samples/',
    ],
  },

  ...cloudFourConfig,

  {
    // The shared config resolves the TypeScript project relative to its own package
    // directory, which finds no tsconfig. Point the type-aware rules at ours.
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        projectService: true,
      },
    },
  },

  {
    settings: {
      n: {
        // Without this the `n/no-unsupported-features/*` rules guess, since we
        // declare no `engines.node` -- and they should not read one if we ever do,
        // because that field describes what *consumers* of the published package
        // need, not what our build scripts, Storybook config and tests run on.
        // Those files are never published, so they should be checked against the
        // Node version we actually develop and run CI on (see .nvmrc).
        version: '>=24.19.0',
        allowModules: [
          '@storybook/addon-docs',
          '@storybook/addon-docs/blocks',
          'storybook',
        ],
      },
    },
    plugins: { react },
    rules: {
      'padding-line-between-statements': 'off',
      'react/jsx-uses-vars': 'error',
    },
  },

  mdx.flat,
  mdx.flatCodeBlocks,

  {
    files: ['src/**'],
    rules: {
      // Src files are bundled so they do not have to follow Node's resolution rules
      'n/no-missing-import': 'off',
      // These files are bundled for the browser, where node: imports have no meaning
      'unicorn/prefer-node-protocol': 'off',
      // `window` is the correct global in browser-only code, and TypeScript types it
      // more precisely than `globalThis`: rewriting `window.setTimeout` resolves the
      // call to Node's overload, which returns a `Timeout` rather than the `number`
      // these components store. The auto-fix introduces a type error.
      'unicorn/prefer-global-this': 'off',
    },
  },

  {
    // Plain Markdown is prose, not source. eslint-plugin-mdx routes these files
    // through the JS rule set, where rules written for code misfire: the
    // directory tree in CONTRIBUTING.md is indented with non-breaking spaces, and
    // kebab-case is not the convention for README/CHANGELOG/CONTRIBUTING. What we
    // actually want to lint here is the Markdown itself, which `mdx/remark` does
    // via .remarkrc.js.
    files: ['**/*.md'],
    rules: {
      'no-irregular-whitespace': 'off',
      'unicorn/filename-case': 'off',
    },
  },

  {
    files: ['**/*.mdx'],
    rules: {
      // The auto-fixer for this rule does not work with .mdx files.
      'import/order': 'off',
    },
  },

  {
    // Stories and docs pages import Storybook through package export subpaths
    // (`@storybook/addon-docs/blocks`, `storybook/preview-api`). This rule cannot
    // tell a subpath from a file path, so it demands a `.js` that then breaks
    // resolution -- its auto-fix actively introduces a bug here.
    files: ['**/*.mdx', '**/*.stories.js', '.storybook/**'],
    rules: {
      'n/file-extension-in-import': 'off',
    },
  },
];
