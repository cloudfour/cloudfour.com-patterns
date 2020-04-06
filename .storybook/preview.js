import { addDecorator, addParameters } from '@storybook/html';
import { withA11y } from '@storybook/addon-a11y';
import { withPaddings } from 'storybook-addon-paddings';
import * as colors from '../src/design-tokens/colors.yml';
import { breakpointViewports } from './helpers/breakpoint-viewports';
import { ratio } from '../src/design-tokens/modular-scale.yml';
import 'focus-visible';
import './preview.scss';

// Accessibility testing via aXe
addDecorator(withA11y);

// Theme selection from stories
const themes = [{ name: 'Dark', class: 't-dark', color: colors.primaryBrand }];
addParameters({ themes });

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
/**
 * Default viewport is Responsive: 100% x 100%. When a breakpoint is chosen, this
 * will show as the Reset Viewport option
 */
addParameters({
  viewport: {
    viewports: breakpointViewports,
  },
});
