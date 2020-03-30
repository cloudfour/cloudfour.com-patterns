import { addDecorator, addParameters } from '@storybook/html';
import { withA11y } from '@storybook/addon-a11y';
import { withPaddings } from 'storybook-addon-paddings';
import * as colors from '../src/design-tokens/colors.yml';
import * as ms from '../src/design-tokens/modular-scale.yml';
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
    value: `${+Math.pow(ms.ratio, i).toFixed(2)}em`,
    default: i === 0,
  });
}
addDecorator(withPaddings);
addParameters({ paddings });
