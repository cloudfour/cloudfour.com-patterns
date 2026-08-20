import fs from 'node:fs';
import path from 'node:path';

import type { PleasantestUtils } from 'pleasantest';
import {
  createSynchronousEnvironment,
  createSynchronousFilesystemLoader,
} from 'twing';

/**
 * Twing expects `null` for a missing file rather than a thrown error, which is not how
 * `node:fs` behaves.
 */
const filesystem = {
  statSync: (filePath: string) =>
    fs.existsSync(filePath) ? fs.statSync(filePath) : null,
  readFileSync: (filePath: string) =>
    fs.existsSync(filePath) ? fs.readFileSync(filePath) : null,
};

const loader = createSynchronousFilesystemLoader(filesystem);
loader.addPath(process.cwd());
// The namespace includes the "@": Twing 7 matches everything before the first slash
// verbatim, where Twing 3 stripped the sigil first.
loader.addPath(path.join(process.cwd(), 'src'), '@cloudfour');

const twing = createSynchronousEnvironment(loader);

/**
 @param templatePath Absolute path to template file
 */
export const loadTwigTemplate = (templatePath: string) => {
  const name = path.relative(process.cwd(), templatePath);
  // Returns a promise so existing callers can keep awaiting, even though Twing 7
  // renders synchronously.
  return (data: any = {}) => Promise.resolve(twing.render(name, data));
};

export const loadGlobalCSS = async (utils: PleasantestUtils) => {
  await utils.loadCSS('../../../dist/standalone.css');
};
