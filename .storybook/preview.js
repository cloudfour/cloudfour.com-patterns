import { addDecorator, addParameters } from '@storybook/html';
import { withA11y } from '@storybook/addon-a11y';
import centered from '@storybook/addon-centered/html';
import * as colors from '../src/design-tokens/colors.yml';
import 'focus-visible';
import './preview.scss';

// Add decorators to all stories
addDecorator(centered);
addDecorator(withA11y);

// Theme selection from stories
const themes = [{ name: 'Dark', class: 't-dark', color: colors.primaryBrand }];
addParameters({ themes });
