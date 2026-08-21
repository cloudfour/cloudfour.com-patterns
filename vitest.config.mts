import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

import { twigPlugin } from './twing/vite-plugin-twig.mjs';

export default defineConfig({
  // Importing a `.twig` file yields a function that renders it, exactly as in
  // Storybook. This replaces the filesystem Twing environment the tests used to
  // build themselves in `test-utils.ts`.
  plugins: [twigPlugin()],
  // Twing is reached through the virtual module the Twig plugin generates, so Vite
  // does not see it while crawling the test files. Without this it gets discovered
  // mid-run, and the reload that follows races the test that triggered it.
  optimizeDeps: { include: ['twing/light'] },
  server: {
    forwardConsole: {
      // Vite mirrors the browser's window errors into the terminal, and so does
      // Vitest -- which reports them better, under a heading that fails the run and
      // names the test they came from. Only Vite's copy is dropped here, and only
      // the error copy: console output stays forwarded, so a component logging
      // something during a test is still visible.
      //
      // The duplicate is not free. Elastic Textarea resizes a textarea from inside
      // a `ResizeObserver` watching that same textarea, which is the point of the
      // component, and Chromium reports the pass it cannot deliver as a window
      // error -- in real browsers as much as here. Vite cannot filter by message,
      // so this halves an eight-line-per-run distraction rather than removing it.
      unhandledErrors: false,
      // Passing the object form resets this to nothing, so Vite's own default set
      // is restated rather than widened.
      logLevels: ['error', 'warn'],
    },
  },
  test: {
    projects: [
      {
        // Tests that only assert what a template rendered. These need a DOM but not
        // a browser, so they run in Node against jsdom, where they cost milliseconds.
        extends: true,
        test: {
          name: 'node',
          environment: 'jsdom',
          include: ['src/**/*.test.ts'],
          exclude: ['src/**/*.browser.test.ts'],
          setupFiles: ['./vitest.setup.node.ts'],
        },
      },
      {
        // Tests that need a real browser: anything asserting an accessibility tree,
        // computed layout, or focus behaviour. jsdom computes none of those.
        extends: true,
        test: {
          name: 'browser',
          include: ['src/**/*.browser.test.ts'],
          setupFiles: ['./vitest.setup.browser.ts'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [
              {
                browser: 'chromium',
                // Puppeteer's default, which is what these tests were written
                // against under Pleasantest. Browser mode's own default is a
                // phone-sized 414x896, which would put every component on the
                // small-screen side of the `m` (40em / 640px) breakpoint.
                viewport: { width: 800, height: 600 },
              },
            ],
          },
        },
      },
    ],
  },
});
