# Contributing

Thanks for contributing to the Cloud Four Pattern Library!

## Getting Started

1. `npm ci` — to install dependencies
1. `npm run storybook` — to run a local instance of Storybook

## Building

- `npm run build` — Builds CSS+JS for npm package
- `npm run build-storybook` — Creates a static storybook site build, for example for publishing the pattern library to Netlify

## Project Structure

```
cloudfour.com-patterns
├── .github               # GitHub workflows and templates
├── .storybook
│   ├── main.js           # Settings for Storybook UI
│   └── preview.js        # Settings for story previews
├── .theo                 # Settings for design token processing
├── gulpfile.js
│   └── tasks/*.js        # Complex build tasks
├── src
│   ├── **/*.scss         # Styles (Sass)
│   ├── **/*.stories.mdx  # Documentation (Storybook Docs)
│   ├── **/*.twig         # Templates (Twig)
│   └── **/*.yml          # Design tokens (Theo)
├── .editorconfig         # Low-level code consistency
├── .nvmrc                # Node version (used by Netlify)
├── .svgo.yml             # Inline SVG optimization settings
├── CONTRIBUTING.md       # ⬅️ You are here!
├── README.md             # Pattern library install instructions
├── netlify.toml          # Netlify build settings
└── package.json          # Project info and dependencies
```

## Publishing to npm

1. `git checkout v-next`
2. `git pull`
3. Make sure you have a clean working tree (`git status` should show no changes)
4. `git checkout -b release-X.Y.Z` - Create a new release branch, where `X.Y.Z` is the version number you're about to release.
5. `npm version [major | minor | patch]` - This will bump the version number in `package.json` and `package-lock.json`. e.g., `npm version minor` to bump from `1.1.0` to `1.2.0`.
6. `git push` your branch.
7. Make a PR, get it approved, and merge your changes to `v-next`.
8. `git checkout v-next`
9. `git pull`
10. Make sure you have a clean working tree (`git status` should show no changes)
11. `npm publish --access public` - This will automatically install and compile everything, run linting, and publish

You can run `npm publish --dry-run` to see everything that _would_ happen during publish, without actually publishing to the npm registry.

Note the branch is `v-next` for now. When we we merge this branch to `master`, these instructions should be updated.
