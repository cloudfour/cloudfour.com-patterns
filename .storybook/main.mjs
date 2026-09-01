import { dirname, join } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

import svgr from 'vite-plugin-svgr';

import { twigPlugin } from '../twing/vite-plugin-twig.mjs';

const here = dirname(fileURLToPath(import.meta.url));

const storybookConfig = {
  stories: ['../src/**/*.stories.js', '../src/**/*.mdx'],
  staticDirs: ['../static', '../src/assets'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@etchteam/storybook-addon-status',
    '@whitespace/storybook-addon-html',
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  managerHead(head) {
    const iconSuffix = process.env.NODE_ENV === 'development' ? '-dev' : '';
    return `${head}
      <link rel="icon" href="favicons/favicon${iconSuffix}.ico" />
      <link rel="icon" href="favicons/icon${iconSuffix}.svg" type="image/svg+xml" />`;
  },
  async viteFinal(config) {
    config.plugins = [
      ...(config.plugins ?? []),
      twigPlugin(),
      // The Icons and Illustrations pages import SVGs as React components.
      svgr({ include: '**/*.svg?react' }),
    ];

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        // Lets CSS url() paths be written as `static/...` rather than relative.
        static: join(here, '..', 'static'),
      },
    };

    // Ts-dedent, a Storybook dependency, advertises a `module` entry that is actually
    // CommonJS. The production build tolerates it; the dev server needs it pre-bundled.
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [...(config.optimizeDeps?.include ?? []), 'ts-dedent'],
    };

    return config;
  },
};

export default storybookConfig;
