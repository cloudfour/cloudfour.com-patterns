import { addDecorator } from '@storybook/html';
import { withA11y } from '@storybook/addon-a11y';
import centered from '@storybook/addon-centered/html';
import './preview.scss';

addDecorator(centered);
addDecorator(withA11y);
