import path from 'path';
import { TwingEnvironment, TwingLoaderFilesystem } from 'twing';
import type { PleasantestUtils } from 'pleasantest';

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
  // Using "await" here because next version of twing returns promises
  // eslint-disable-next-line @cloudfour/typescript-eslint/await-thenable
  return async (data: any) => (await templatePromise).render(data);
};

export const loadGlobalCSS = async (utils: PleasantestUtils) => {
  await utils.loadCSS('../../../dist/standalone.css');
};
