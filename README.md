<p align="center"><img src="https://cloudfour.com/android-chrome-512x512.png" alt="" width="128" height="128"></p>

# Cloud Four Patterns 🚧

[![Netlify Status](https://api.netlify.com/api/v1/badges/1923e350-3172-409a-9361-b04d54d1c3b4/deploy-status)](https://app.netlify.com/sites/cloudfour-patterns/deploys?filter=v-next)

You are currently viewing the `v-next` branch. This represents a significant refactor of our environment and coding standards. It is a work in progress and not yet ready for use.

If you’re looking for the most stable version of our pattern library, check out [the `master` branch](https://github.com/cloudfour/cloudfour.com-patterns/tree/master).

[View Netlify Preview →](https://v-next--cloudfour-patterns.netlify.com/)

## Getting Started

1. `npm ci`
1. `npm run storybook`

## Building

- `npm run build` Builds CSS+JS for npm package
- `npm run build-storybook` Creates a static storybook site build, for example for publishing the pattern library to Netlify

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
├── README.md             # ⬅️ You are here!
├── netlify.toml          # Netlify build settings
└── package.json          # Project info and dependencies
```
