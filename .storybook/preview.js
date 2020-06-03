import { addDecorator, addParameters } from '@storybook/html';
import { withA11y } from '@storybook/addon-a11y';
import { Parser } from 'html-to-react';
import { withPaddings } from 'storybook-addon-paddings';
import { withHTML } from '@whitespace/storybook-addon-html/html';
import * as colors from '../src/design-tokens/colors.yml';
import * as breakpoints from '../src/design-tokens/breakpoint.yml';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ratio } from '../src/design-tokens/modular-scale.yml';
import 'focus-visible';
import '../src/index.scss';
import './preview.scss';

// Accessibility testing via aXe
addDecorator(withA11y);

// Add HTML tab with output source
addDecorator(withHTML);

// Theme selection from stories
const themes = [{ name: 'Dark', class: 't-dark', color: colors.primaryBrand }];
addParameters({ themes });

/**
 * The parameters for Storybook sorting functions are sparsely documented.
 * Including a detailed type definition in lieu of clear documentation to
 * link to.
 * @see https://github.com/storybookjs/storybook/blob/4f65ccb38dc724a7a9ea15935ef11dbad7cc8657/lib/client-api/src/types.ts#L33-L40
 * @see https://github.com/storybookjs/storybook/blob/b6136e1539c85d253504391a7d3f65e2c1239143/lib/addons/src/types.ts#L49-L53
 * @typedef { [String, import('@storybook/client-api/dist/types').StoreItem] } StoryItem
 */

/**
 * Get the category from a story (StoryItem)
 * @param {StoryItem} story - Item passed to `addParameters.options.storySort`
 * @returns {string} - Story's category, the first part of the `StoreItem.kind`
 * value, which is a string delimited with forward slashes
 */
const getStoryCategory = (story) => story[1].kind.split('/')[0];

/**
 * Define an ordered list of story categories. These should match the first part
 * of the `<Meta>` component's `title` attribute found in each story (`.mdx` file).
 * The order of categories will determine the display order of the top-level
 * menu items in Storybook .
 */
const orderedCategories = [
  'Getting Started',
  'Design',
  'Design Tokens',
  'Objects',
  'Components',
  'Themes',
  'Utilities',
  'Vendor',
  'Prototypes',
];

/**
 * Compares two stories and sorts by category, according to a predefined order
 * @param {String[]} categories - Array of categories to use for sorting. Order of
 * items in the array determines the top-level menu sorting order.
 * @returns {(a: StoryItem, b: StoryItem) => (0 | 1 | -1)} - Sorts two stories based on
 * the order of the passed-in array of categories
 */
const storySort = (categories) => (a, b) => {
  const indexA = categories.indexOf(getStoryCategory(a));
  const indexB = categories.indexOf(getStoryCategory(b));
  return indexA === indexB ? 0 : indexA > indexB ? 1 : -1;
};

// Sort stories according to preferred top-level settings
addParameters({
  options: {
    storySort: storySort(orderedCategories),
  },
});

// Padding values from modular scale
const paddings = [];
for (let i = -3; i <= 6; i++) {
  paddings.push({
    name: `Step ${i}`,
    // `toFixed` keeps the values from extending past two decimal points.
    // The leading `+` keeps values from having decimal points where they don't
    // need them, so `1.00` becomes `1`.
    value: `${+Math.pow(ratio, i).toFixed(2)}em`,
    default: i === 0,
  });
}
addDecorator(withPaddings);
addParameters({ paddings });

// Create viewports using widths defined in design tokens
const breakpointViewports = Object.keys(breakpoints).map((name) => {
  return {
    name: `breakpoint.$${name}`,
    styles: {
      width: breakpoints[name],
      // Account for padding and border around viewport preview
      height: 'calc(100% - 20px)',
    },
    type: 'other',
  };
});
addParameters({
  viewport: {
    viewports: {
      ...breakpointViewports,
      ...INITIAL_VIEWPORTS,
    },
  },
});

// Add Docs support for inlining plain HTML stories
// @see https://github.com/storybookjs/storybook/blob/v5.3.19/addons/docs/docs/docspage.md#inline-stories-vs-iframe-stories

// Initialize the parser
const htmlToReactParser = new Parser();

// Add the function to Docs settings
addParameters({
  docs: {
    inlineStories: true,
    prepareForInline: (storyFn) => htmlToReactParser.parse(storyFn()),
  },
});
