import twig from 'react-syntax-highlighter/dist/esm/languages/prism/twig';
import { SyntaxHighlighter } from 'storybook/internal/components';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';

import tokens from '../src/compiled/tokens/js/tokens.js';
import { makeTwigInclude } from '../src/make-twig-include.js';
// The library's styles must load before Storybook's own preview styles, which
// are meant to override them.
import '../src/index-with-dependencies.scss';

import { withTextFlow } from './text-flow-decorator.js';
import { withTheme } from './theme-decorator.js';
import './preview.scss';

const breakpoints = tokens.size.breakpoint;

// Storybook bundles Prism grammars for a handful of languages, and Twig is not one of
// them -- without this the source previews render as a single untokenized block.
SyntaxHighlighter.registerLanguage('twig', twig);

// Create viewports using widths defined in design tokens
const breakpointViewports = Object.fromEntries(
  Object.entries(breakpoints).map(([name, value]) => [
    `breakpoint-${name}`,
    {
      name: `$${value.name}`,
      styles: {
        width: value.value,
        // Account for padding and border around viewport preview
        height: 'calc(100% - 20px)',
      },
      type: 'other',
    },
  ]),
);

export const parameters = {
  options: {
    storySort: {
      method: 'alphabetical',
      order: [
        'Introduction',
        'Contributing',
        'Changelog',
        'Design',
        'Objects',
        'Components',
        'Utilities',
        'Combos',
        'Compositions',
        'Sass',
        'Vendor',
        'Prototypes',
      ],
    },
  },
  docs: {
    source: {
      language: 'twig',
      /**
       * Show the Twig that produced a story rather than the HTML it rendered.
       *
       * The Vite Twig plugin records every render's template path and arguments,
       * keyed by the HTML it produced, so re-running the story function here gives us
       * the key to look up. Storybook 6 called this hook `docs.transformSource`.
       *
       * @param {string} code
       * @param {object} storyContext
       */
      transform(code, storyContext) {
        try {
          const storyFunction = storyContext.originalStoryFn;
          if (!storyFunction) {
            return code;
          }
          const rendered = storyFunction(
            storyContext.args || storyContext.initialArgs,
          );
          const input = globalThis.__twig_inputs__?.get(rendered);
          if (!input) {
            return code;
          }
          return makeTwigInclude(input.path, input.args);
        } catch {
          return code;
        }
      },
    },
  },
  viewport: {
    options: {
      ...breakpointViewports,
      ...INITIAL_VIEWPORTS,
    },
  },
};

const directions = ['ltr', 'rtl'];
const writingModes = ['horizontal-tb', 'vertical-lr', 'vertical-rl'];
const textFlowItems = directions.flatMap((direction) =>
  writingModes.map((writingMode) => ({
    value: JSON.stringify({ direction, writingMode }),
    title: writingMode,
    left: direction,
  })),
);

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      showName: true,
      items: [
        {
          // 'null' value supports a "no value selected" state, if 'undefined'
          // there are sometimes missing 'key' errors in console
          value: null,
          title: 'No theme',
          right: '(default)',
        },
        {
          value: 't-light',
          title: 'Light',
          right: '.t-light',
        },
        {
          value: 't-dark',
          title: 'Dark',
          right: '.t-dark',
        },
        {
          value: 't-light,t-alternate',
          title: 'Light Alt',
          right: '.t-light.t-alternate',
        },
        {
          value: 't-dark,t-alternate',
          title: 'Dark Alt',
          right: '.t-dark.t-alternate',
        },
      ],
    },
  },
  textFlow: {
    name: 'Text flow',
    toolbar: {
      icon: 'redirect',
      showName: true,
      items: [
        {
          value: null,
          title: 'Default text flow',
        },
        ...textFlowItems,
      ],
    },
  },
};

export const decorators = [withTheme, withTextFlow];
