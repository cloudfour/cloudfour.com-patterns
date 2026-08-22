import fs from 'node:fs/promises';
import path from 'node:path';

import { rollup } from 'rollup';
import dts from 'rollup-plugin-dts';

import {
  createVirtualRootEntry,
  outDir,
  tsTmpDist,
} from './rollup-root-entry.mjs';

const pathName = 'cloudfour-patterns';

// Using a virtual root file didn't work for rollup-plugin-dts
const tsRootFile = path.join(tsTmpDist, 'generated-ts-root-file.d.ts');
await fs.mkdir(tsTmpDist, { recursive: true });
await fs.writeFile(tsRootFile, await createVirtualRootEntry());

// Read documentation for rollup-plugin-dts to understand what this is doing
const bundle = await rollup({
  input: tsRootFile,
  plugins: [dts()],
});

await bundle.write({
  format: 'esm',
  file: path.join(outDir, `${pathName}.d.ts`),
});

await bundle.close();
