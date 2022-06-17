import path from 'node:path';

import type { PleasantestUtils } from 'pleasantest';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';

const loader = new TwingLoaderFilesystem(process.cwd());
loader.addPath(path.join(process.cwd(), 'src'), 'cloudfour');

const twing = new TwingEnvironment(loader);

/**
 @param templatePath Absolute path to template file
 */
export const loadTwigTemplate = (templatePath: string) => {
  const templatePromise = twing.load(
    path.relative(process.cwd(), templatePath)
  );
  return async (data: any = {}) => {
    // Using "await" here because next version of twing returns promises
    // eslint-disable-next-line @cloudfour/typescript-eslint/await-thenable
    const template = await templatePromise;
    return template.render(data);
  };
};

export const loadGlobalCSS = async (utils: PleasantestUtils) => {
  await utils.loadCSS('../../../dist/standalone.css');
};
