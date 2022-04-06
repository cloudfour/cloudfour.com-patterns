import { Parser } from 'html-to-react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import ReactSyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import twig from 'react-syntax-highlighter/dist/esm/languages/prism/twig';
import { withTheme } from './theme-decorator';
import { withTextFlow } from './text-flow-decorator';
import tokens from '../src/compiled/tokens/js/tokens';
import 'focus-visible';
import '../src/index-with-dependencies.scss';
import './preview.scss';
import { makeTwigInclude } from '../src/make-twig-include';
const breakpoints = tokens.size.breakpoint;

// Extend the languages Storybook will highlight
ReactSyntaxHighlighter.registerLanguage('twig', twig);

// Create viewports using widths defined in design tokens
const breakpointViewports = Object.keys(breakpoints).map((name) => {
  return {
    name: `$${breakpoints[name].name}`,
    styles: {
      width: breakpoints[name].value,
      // Account for padding and border around viewport preview
      height: 'calc(100% - 20px)',
    },
    type: 'other',
  };
});

const htmlToReactParser = new Parser();

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
    // Docs support for inlining plain HTML stories
    // https://github.com/storybookjs/storybook/blob/v6.0.21/addons/docs/docs/docspage.md#inline-stories-vs-iframe-stories
    inlineStories: true,
    prepareForInline: (storyFn) => htmlToReactParser.parse(storyFn()),
    transformSource(src, storyContext) {
      try {
        const storyFunction = storyContext.originalStoryFn;
        if (!storyFunction) return src;
        const rendered = storyFunction(storyContext.args);
        // The twing/source-inputs-loader.js file makes it so that whenever twig templates are rendered,
        // the arguments and input path are stored in the window.__twig_inputs__ variable.
        // __twig_inputs__ is a map between the output HTML and and objects with the arguments and input paths
        // Here, since we have the rendered HTML, we can look up what the arguments and path were
        // that correspond to that output
        const input = window.__twig_inputs__?.get(rendered);
        if (!input) return src;
        const twigInclude = makeTwigInclude(input.path, input.args);
        // When I do this, I see the source output many times... some with the
        // args intact, some without args at all. Alert is a good example.
        console.log(storyContext.id, storyContext.args, twigInclude);
        return twigInclude;
      } catch {
        return src;
      }
    },
  },
  viewport: {
    viewports: {
      ...breakpointViewports,
      ...INITIAL_VIEWPORTS,
    },
  },
};

const directions = ['ltr', 'rtl'];
const writingModes = ['horizontal-tb', 'vertical-lr', 'vertical-rl'];
const textFlowItems = directions
  .map((direction) =>
    writingModes.map((writingMode) => {
      return {
        value: JSON.stringify({ direction, writingMode }),
        title: writingMode,
        left: direction,
      };
    })
  )
  .flat();

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
