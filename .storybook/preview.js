import { Parser } from 'html-to-react';
import { withPaddings } from 'storybook-addon-paddings';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import ReactSyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light';
import twig from 'react-syntax-highlighter/dist/esm/languages/prism/twig';
import { withTheme } from './theme-decorator';
import tokens from '../src/compiled/tokens/js/tokens';
import 'focus-visible';
import '../src/index-with-dependencies.scss';
import './preview.scss';
import { makeTwigInclude } from '../src/make-twig-include';
const breakpoints = tokens.size.breakpoint;

// Extend the languages Storybook will highlight
ReactSyntaxHighlighter.registerLanguage('twig', twig);

// Padding values from modular scale
const paddings = { values: [], default: 'Step 0' };
for (let i = -3; i <= 6; i++) {
  paddings.values.push({
    name: `Step ${i}`,
    // `toFixed` keeps the values from extending past two decimal points.
    // The leading `+` keeps values from having decimal points where they don't
    // need them, so `1.00` becomes `1`.
    value: `${+Math.pow(tokens.number.scale.modular.ratio.value, i).toFixed(
      2
    )}em`,
  });
}

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
        const storyFunction = storyContext.getOriginal();
        const rendered = storyFunction(storyContext.args);
        // The twing/source-inputs-loader.js file makes it so that whenever twig templates are rendered,
        // the arguments and input path are stored in the window.__twig_inputs__ variable.
        // __twig_inputs__ is a map between the output HTML and and objects with the arguments and input paths
        // Here, since we have the rendered HTML, we can look up what the arguments and path were
        // that correspond to that output
        const input = window.__twig_inputs__?.get(rendered);
        if (!input) return src;
        return makeTwigInclude(input.path, input.args);
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
  paddings,
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    toolbar: {
      icon: 'paintbrush',
      items: [
        {
          // 'null' value supports a "no value selected" state, if 'undefined'
          // there are sometimes missing 'key' errors in console
          value: null,
          title: 'No theme',
        },
        {
          value: 't-dark',
          title: 'Dark',
        },
      ],
    },
  },
};

export const decorators = [withPaddings, withTheme];
