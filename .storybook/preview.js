import { addDecorator, addParameters } from '@storybook/html';
import { withA11y } from '@storybook/addon-a11y';
import centered from '@storybook/addon-centered/html';
// import * as colors from '../src/design-tokens/colors.yml';
import 'focus-visible';
import './preview.scss';

// Add decorators to all stories
addDecorator(centered);
addDecorator(withA11y);

// Set choosable backgrounds for stories
// const backgrounds = [
//   'primaryBrand',
//   'primaryBrandDarker',
//   'grayLighter'
// ].map(name => ({ name, value: colors[name] }));

// addParameters({ backgrounds });
