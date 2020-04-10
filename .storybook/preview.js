import { addDecorator, addParameters } from '@storybook/html';
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
 * Get the category from a story.
 * The story is the 2nd value in an array passed to the comparator function assigned to
 * `addParameters.options.storySort`.
 * The category is the first part of the story object's `kind` property, which is
 * a string delimited with forward slashes.
 * For reference:
 * @see https://storybook.js.org/docs/configurations/options-parameter/#sorting-stories
 */
const getStoryCategory = (storySortParam) =>
  storySortParam[1].kind.split('/')[0];

/**
 * Define an ordered list of story categories. These should match the first part
 * of the `<Meta>` component's `title` attribute, found in each story (`.mdx` file).
 * The order of categories will determine the display order of the top-level
 * menu items in Storybook .
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
 * Compares two stories and sorts by category.
 * Takes in an array of categories (strings) and returns the comparator function.
 * Items in the array determine the top-level menu sorting order.
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
