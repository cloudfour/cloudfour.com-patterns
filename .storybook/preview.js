import { Parser } from 'html-to-react';
import { withPaddings } from 'storybook-addon-paddings';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withTheme } from './theme-decorator';
import tokens from '../src/compiled/tokens/js/tokens';
import 'focus-visible';
import '../src/index-with-dependencies.scss';
import './preview.scss';
const breakpoints = tokens.size.breakpoint;

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
