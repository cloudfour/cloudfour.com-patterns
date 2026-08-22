import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Re-runs the preprocess steps when their sources change, for `npm start`.
 *
 * Uses `node:fs.watch` rather than a watcher library: this is the only thing in
 * the build that needed one, and recursive watching is supported on all three
 * platforms as of the Node version in `.nvmrc`.
 */
const watches = [
  {
    label: 'svg',
    dir: 'src/assets',
    matches: (file) => file.endsWith('.svg'),
    script: 'scripts/build-svg-twig.mjs',
  },
  {
    label: 'tokens',
    dir: 'src/tokens',
    matches: (file) => /\.(js|json)$/.test(file),
    script: '.style-dictionary/build.mjs',
  },
];

/** Editors often touch a file several times per save, so coalesce the runs. */
const DEBOUNCE_MS = 100;

for (const { label, dir, matches, script } of watches) {
  let timer;
  let running = false;
  let queued = false;

  const run = () => {
    if (running) {
      queued = true;
      return;
    }
    running = true;
    const child = spawn(process.execPath, [script], { stdio: 'inherit' });
    child.on('close', (code) => {
      running = false;
      if (code !== 0) console.error(`[${label}] exited with code ${code}`);
      if (queued) {
        queued = false;
        run();
      }
    });
  };

  fs.watch(dir, { recursive: true }, (_event, filename) => {
    if (!filename || !matches(filename)) return;
    // Ignore the task's own output, which lands beside its input.
    if (filename.endsWith('.svg.twig')) return;
    clearTimeout(timer);
    timer = setTimeout(run, DEBOUNCE_MS);
  });

  console.log(`Watching ${path.normalize(dir)} for ${label} changes`);
}
