const glob = require('tiny-glob');
const fs = require('fs/promises');
const path = require('path');

/** @returns {import('vite').Plugin} */
const twingPlugin = () => {
  const twingEnv = '\0twingEnv';
  return {
    name: 'twing',
    async resolveId(id) {
      if (id === twingEnv) return twingEnv;
    },
    async load(id) {
      if (id !== twingEnv) return;

      const files = await glob('src/**/*.twig', { cwd: process.cwd() });

      return `
        import { TwingEnvironment, TwingLoaderArray } from 'twing/dist/es/browser.js'
        ${files
          .map(
            (file, i) =>
              `import template${i} from ${JSON.stringify(`./${file}?raw`)}`
          )
          .join('\n')}

        const files = {
          ${files
            .map((file, i) => {
              const newName = file.replace(/^src\//g, '@cloudfour/');
              return `${JSON.stringify(newName)}: template${i}`;
            })
            .join(',\n')}
        }
        export default new TwingEnvironment(new TwingLoaderArray(files))
      `;
    },
    async transform(_code, id) {
      const templateName = path
        .relative(process.cwd(), id)
        .replace(/^src\//g, '@cloudfour/');
      if (id.startsWith('\0') || !id.endsWith('.twig')) return;

      return `
        import twingEnv from ${JSON.stringify(twingEnv)}
        export default async (args) => {
          const template = await twingEnv.load(${JSON.stringify(templateName)})
          return template.render(args)
        }
      `;
    },
  };
};

module.exports = { twingPlugin };
