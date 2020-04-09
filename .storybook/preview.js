import { addDecorator, addParameters } from '@storybook/html';
import { sanitize } from '@storybook/csf';
import { withA11y } from '@storybook/addon-a11y';
import { withPaddings } from 'storybook-addon-paddings';
import * as colors from '../src/design-tokens/colors.yml';
import * as breakpoints from '../src/design-tokens/breakpoint.yml';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';
import { ratio } from '../src/design-tokens/modular-scale.yml';
import 'focus-visible';
import '../src/index.scss';
import './preview.scss';

// Accessibility testing via aXe
addDecorator(withA11y);

// Theme selection from stories
const themes = [{ name: 'Dark', class: 't-dark', color: colors.primaryBrand }];
addParameters({ themes });

/**
 * Define the type of value passed to `addParameters.options.storySort`, which is
 * parsed to get to the name of each story's category
 * @typedef { [String, import('@storybook/client-api/dist/types').StoreItem] } StoryItem
 */

/**
 * Get the category from a `storySort` story
 * @param {StoryItem} story - Item passed to `addParameters.options.storySort`
 * @returns {string} - Story's category, the first part of the `StoreItem.kind`
 * value, which is a string delimited with forward slashes
 */
const getStoryCategory = (story) => story[1].kind.split('/')[0];

/**
 * Define an ordered list of story categories. These should match the first part
 * of the `<Meta>` component's `title` attribute found in each story (`.mdx` file)
 */
const orderedCategories = [
  'Getting Started',
  'Design',
  'Design Tokens',
  'Objects',
  'Components',
  'Utilities',
  'Themes',
  'Third-Party',
  'Prototypes',
];
/**
 * Sanitize (slufigy) each entry in the list of categories, to normalize odd characters,
 * capitalization, and use of spaces vs dashes. Do this outside of the `storySort`
 * sorting function. Each `StoryItem`'s category will also be passed to `sanitize`
 * for comparison with values in this list.
 */
const sanitizedCategories = orderedCategories.map((kind) => sanitize(kind));

/**
 * Compares two stories and sorts by category, according to a predefined order
 * @param {String[]} sanitizedCategories - Sanitized array of categories to use for sorting
 * @returns {(a: StoryItem, b: StoryItem) => (0 | 1 | -1)} - Sorts two stories based on
 * the order of the passed-in array of categories
 */
const storySort = (sanitizedCategories) => (a, b) => {
  /**
   * Each `StoryItem`'s category is passed to `sanitize` for comparison with values
   * in this list.
   */
  const indexA = sanitizedCategories.indexOf(sanitize(getStoryCategory(a)));
  const indexB = sanitizedCategories.indexOf(sanitize(getStoryCategory(b)));
  return indexA === indexB ? 0 : indexA > indexB ? 1 : -1;
};

// Sort stories according to preferred top-level settings
addParameters({
  options: {
    storySort: storySort(sanitizedCategories),
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
    name: `breakpoints.$${name}`,
    styles: {
      width: breakpoints[name],
      height: '100%',
    },
    type: 'other',
  };
});
addParameters({
  viewport: {
    viewports: {
      ...breakpointViewports,
      ...MINIMAL_VIEWPORTS,
    },
  },
});
