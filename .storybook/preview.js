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

const menuSort = (a, b) => {
  // @TODO - fill in. Needs to be a recursive sort, maybe?
};

// Sort stories according to preferred top-level settings
addParameters({
  options: {
    storySort: (a, b) => {
      const topLevelA = a[1].kind.split('/')[0];
      const topLevelB = b[1].kind.split('/')[0];
      console.log(topLevelA);
      console.log(topLevelB);
      return topLevelA === topLevelB
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    },
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
