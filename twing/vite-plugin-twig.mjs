/**
 * Compiles `.twig` imports for Storybook, replacing the webpack chain of twing-loader
 * + source-inputs-loader + val-loader.
 *
 * How it works: a virtual module collects every template's source with Vite's
 * `import.meta.glob` and hands the whole set to one Twing environment. Importing a
 * `.twig` file then yields a function that renders that template by name. Templates
 * refer to each other as `@cloudfour/...`, so the environment is keyed the same way and
 * Twing resolves includes and extends itself.
 *
 * Two notes on why it looks like this:
 *
 * - `twing/light` rather than `twing`. The full build pulls in locutus, which needs
 *   Node's Buffer; webpack 4 shimmed that automatically but Vite does not, and the
 *   resulting bundle dies on load. Every filter these templates use works in `light`.
 *
 * - Rendering is synchronous, via `createSynchronousEnvironment`, so story functions
 *   keep returning strings instead of promises.
 *
 * The old chain also had to string-replace twing-loader's generated
 * `return template.render(context)` to capture each story's arguments for the docs
 * source preview. Here the render wrapper is ours, so it records them directly.
 */

const VIRTUAL_ID = 'virtual:cloudfour-twig-environment';
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`;

/**
 * `/abs/path/src/components/badge/badge.twig` -> `@cloudfour/components/badge/badge.twig`
 *
 * @param {string} id
 */
const templateName = (id) => `@cloudfour/${id.split('/src/').pop()}`;

const environmentModule = /* js */ `
import {
  createSynchronousEnvironment,
  createSynchronousArrayLoader,
} from 'twing/light';

const sources = import.meta.glob('/src/**/*.twig', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const templates = {};
for (const [path, source] of Object.entries(sources)) {
  templates['@cloudfour/' + path.split('/src/').pop()] = source;
}

export const environment = createSynchronousEnvironment(
  createSynchronousArrayLoader(templates)
);

/**
 * Maps rendered HTML back to the template and arguments that produced it, so
 * \`docs.source.transform\` in preview.js can show Twig instead of output HTML.
 */
export const twigInputs =
  globalThis.__twig_inputs__ || (globalThis.__twig_inputs__ = new Map());
`;

export const twigPlugin = () => ({
  name: 'cloudfour-twig',

  /** @param {string} id */
  resolveId(id) {
    if (id === VIRTUAL_ID) {
      return RESOLVED_VIRTUAL_ID;
    }
  },

  /** @param {string} id */
  load(id) {
    if (id === RESOLVED_VIRTUAL_ID) {
      return environmentModule;
    }
  },

  /**
   * @param {string} _code The module source, which we never read: the transform
   *   rewrites `.twig` imports into a render wrapper generated from the id alone.
   * @param {string} id
   */
  transform(_code, id) {
    // Let `?raw` imports through untouched -- the environment module needs the source.
    if (!id.endsWith('.twig')) {
      return;
    }

    return {
      code: /* js */ `
import { environment, twigInputs } from ${JSON.stringify(VIRTUAL_ID)};

const name = ${JSON.stringify(templateName(id))};

export default (context = {}) => {
  const rendered = environment.render(name, context);
  twigInputs.set(rendered, { path: name, args: context });
  return rendered;
};
`,
      map: null,
    };
  },
});

export default twigPlugin;
