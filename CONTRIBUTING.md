# Contributing

Thanks for contributing to the Cloud Four Pattern Library!

## Getting Started

1. `npm ci` — to install dependencies
1. `npm start` — to run a local instance of Storybook

## Building

- `npm run build` — Builds CSS+JS for npm package
- `npm run build-storybook` — Creates a static storybook site build, for example for publishing the pattern library to Netlify

## Validating

You can run `npm run validate` to run all of the checks that will be run in CI (except for building).

You can also run checks individually:

- **Linters/formatters**: `npm run lint` (runs Prettier, ESLint, and Stylelint)
- **Tests**: `npm run test` (runs Jest tests)
  You can also run `npm run test:watch` to run Jest in watch mode
  Note that tests will fail if you have not built the project. If you see tests failing with errors like "file not found in `dist` folder", try running `npm run build` and then re-run the tests.
- **Typechecking** `npm run type` (runs TypeScript)
  You can also run `npm run type:watch` to run TypeScript in watch mode

## Project Structure

```
cloudfour.com-patterns
├── .github               # GitHub workflows and templates
├── .storybook
│   ├── main.js           # Settings for Storybook UI
│   └── preview.js        # Settings for story previews
├── .style-dictionary
│   ├── config.json       # Settings for design token processing
│   └── build.js          # Design token build script
├── gulpfile.js
│   └── tasks/*.js        # Complex build tasks
├── src
│   ├── **/*.scss         # Styles (Sass)
│   ├── **/*.stories.mdx  # Documentation (Storybook Docs)
│   ├── **/*.twig         # Templates (Twig)
│   └── tokens/*          # Design tokens (Style Dictionary)
├── .editorconfig         # Low-level code consistency
├── .nvmrc                # Node version (used by Netlify)
├── .svgo.yml             # Inline SVG optimization settings
├── CONTRIBUTING.md       # ⬅️ You are here!
├── README.md             # Pattern library install instructions
├── netlify.toml          # Netlify build settings
└── package.json          # Project info and dependencies
```

## Changelog entries

Before you submit a PR, if that PR has changes that will affect consumers of this package, you should run `npx changeset` on your branch. It will ask you [the scope of your changes](https://semver.org/#summary), and it will ask you to describe them.

If you forget to run `npx changeset`, changeset-bot will pester you in your PR. It will provide a link you can use to create the changesets file from the GitHub interface.

## Coding standards

Use [snake_case for Twig template variables](https://symfony.com/doc/current/best_practices.html#use-snake-case-for-template-names-and-variables).

Follow the [Symfony Twig Coding Standards](https://twig.symfony.com/doc/3.x/coding_standards.html) for proper spacing, indentation, and variable guidelines.

## Publishing to npm

This process happens automatically after any PR with a changeset is merged to `main`.

## Manually publishing to npm

This is generally not necessary, but in case you need to manually publish a version:

1. `git checkout main`
1. `git pull`
1. Make sure you have a clean working tree (`git status` should show no changes)
1. `git checkout -b release-X.Y.Z` - Create a new release branch, where `X.Y.Z` is the version number you're about to release.
1. `npm version [major | minor | patch]` - This will bump the version number in `package.json` and `package-lock.json`. e.g., `npm version minor` to bump from `1.1.0` to `1.2.0`.
1. `git push` your branch.
1. Make a PR, get it approved, and merge your changes to `main`.
1. `git checkout main`
1. `git pull`
1. Make sure you have a clean working tree (`git status` should show no changes)
1. Reinstall dependencies and run build: `npm ci && npm run preprocess && npm run build`
1. `npm publish --access public` - This will automatically install and compile everything, run linting, and publish

You can run `npm publish --dry-run` to see everything that _would_ happen during publish, without actually publishing to the npm registry.

## Overriding source code previews in Storybook

For most stories, we are able to generate a twig source code snippet for Storybook to display automatically. When stories use `useEffect` or other hooks, the source code snippet cannot be generated automatically, so the JS that was passed to `<Story>` is shown instead (there may be other cases where this happens as well). In those cases, you can manually pass the source code to `<Story>`:

```jsx
import { makeTwigInclude } from '../../make-twig-include';
<Story
  name="Story Name"
  parameters={{
    docs: { source: { code: makeTwigInclude('asdf', { foo: 'bar' }) } },
  }}
>
  {(args) => template(args)}
</Story>;
```

This generates a source code snippet like this:

```twig
{% include 'asdf' with {
  "foo": "bar"
} only %}
```
