import cloudFourConfig from '@cloudfour/eslint-config';
import * as mdx from 'eslint-plugin-mdx';

const config = [
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
    rules: {
      'padding-line-between-statements': 'off',
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
      'import-x/order': 'off',
      // Our docs pages import Storybook's doc components and their own stories
      // module, then reference them only inside JSX:
      //
      //   import { Canvas, Meta } from '@storybook/addon-docs/blocks';
      //   import * as AlertStories from './alert.stories.js';
      //   <Meta of={AlertStories} />
      //
      // `no-unused-vars` does not treat a JSX reference as a use, so it reports
      // every one of those imports -- 171 of them across 83 files. We used to
      // silence that with `react/jsx-uses-vars` from eslint-plugin-react, but
      // that package supports ESLint 9 at most and was blocking our upgrade to
      // 10, so it is gone. The trade-off is that a genuinely unused import in an
      // .mdx file no longer gets reported. These are documentation pages, so
      // that is a cheap price for dropping a dependency.
      'no-unused-vars': 'off',
    },
  },

  {
    // `checkJs` is on, so JSDoc is how our .js files carry type information
    // rather than a place we write prose. Blocks like
    //
    //   /** @param {Args} args */
    //
    // exist to type a parameter, and demanding a description above each one
    // produces filler rather than documentation. The rules that check the types
    // themselves stay on.
    files: ['**/*.{js,mjs,cjs}'],
    rules: {
      'jsdoc/require-description': 'off',
    },
  },

  {
    // Every snake_case identifier these files declare belongs to someone else's
    // naming scheme, so renaming them would break something:
    //
    // - Stories and arg files pass variables into Twig templates, where
    //   snake_case is the convention and the names are the template's contract.
    // - Design tokens become CSS custom properties and Sass variables via
    //   style-dictionary, so a token key is part of our published output.
    // - Demo and mock data mirror the shape of an external API, e.g. WordPress's
    //   `paginate_links()`.
    // - `scripts/build-js.mjs` sets terser options such as `join_vars`.
    files: [
      '**/*.stories.js',
      '**/*-args.js',
      '**/arg-types.js',
      'src/tokens/**',
      '**/demo/**',
      'scripts/build-js.mjs',
    ],
    rules: {
      camelcase: 'off',
    },
  },

  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      // This and xo's `non-nullable-type-assertion-style` want opposite things.
      // That rule rewrites `closest('.js-sky-nav') as HTMLElement` into
      // `closest('.js-sky-nav')!`, which this rule then rejects. The elements
      // are guaranteed by the templates that render these components, and
      // adding null guards would change what happens when one is missing --
      // from throwing to silently doing nothing -- which is a behaviour
      // decision rather than lint cleanup.
      '@typescript-eslint/no-non-null-assertion': 'off',
      // Ambient type packages -- `@vitest/browser/matchers`,
      // `@testing-library/jest-dom/vitest`, `vite/client` -- are only loadable
      // through a triple-slash reference. They export no value, so the `import`
      // form the rule suggests does not pull their globals in.
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },

  {
    files: ['**/*.browser.test.ts'],
    rules: {
      // Regexes handed to Vitest's browser locators, e.g.
      // `getByRole('button', {name: /^reply$/i})`, are never executed as
      // regexes. Vitest serialises them into a selector string, and its parser
      // rejects the `v` flag outright:
      //
      //   Error while parsing selector `button[name=/^reply$/iv]`
      //     - unexpected symbol "v"
      //
      // Adding the flag here turns passing tests into failing ones.
      'require-unicode-regexp': 'off',
    },
  },

  {
    // Storybook's preview file and the Vitest setup files exist to run for
    // their side effects: registering a syntax-highlighting language, pulling
    // in matchers, loading global styles. There is nothing to assign.
    files: ['.storybook/preview.js', 'vitest.setup.*.ts'],
    rules: {
      'import-x/no-unassigned-import': 'off',
      'unicorn/no-top-level-side-effects': 'off',
    },
  },

  {
    files: ['package.json'],
    rules: {
      // The rule reads `preprocess` as a `pre` hook for a `process` script we
      // do not have. It is its own script, named for what it does.
      'package-json/no-orphan-script-hooks': 'off',
      // Both of these describe what we publish, and getting either wrong breaks
      // consumers quietly: an inaccurate `sideEffects` lets bundlers drop our
      // styles, and the `.d.ts`/`.mjs` pairing the types rule objects to is
      // decided by `scripts/build-types.mjs`. Worth doing, but as a deliberate
      // look at packaging rather than inside an ESLint upgrade.
      'package-json/prefer-side-effects-field': 'off',
      'package-json/require-types-in-exports': 'off',
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

export default config;
