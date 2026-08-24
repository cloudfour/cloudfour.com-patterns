/** @import { ArgTypes, Meta, StoryObj } from '@storybook/html' */
import tokens from '../../compiled/tokens/js/tokens.js';

import directionsDemo from './demo/directions.twig';
import responsiveDemo from './demo/responsive.twig';
import './demo/styles.scss';

const minimumStep = tokens.number.scale.modular.minimum_step.value;
const maximumStep = tokens.number.scale.modular.maximum_step.value;
/** @type {Partial<ArgTypes>} */
const defaultArgTypes = {
  step: {
    type: { name: 'number' },
    control: { type: 'range', min: minimumStep, max: maximumStep, step: 1 },
  },
};
const defaultArgs = {
  step: 1,
};

/** @type {Meta} */
const meta = {
  title: 'Utilities/Spacing',
};

export default meta;

/** @type {StoryObj} */
export const Padding = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  render: (args) => directionsDemo({ name: 'pad', ...args }),
};

/** @type {StoryObj} */
export const Margin = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  render: (args) => directionsDemo({ name: 'space', ...args }),
};

/** @type {StoryObj} */
export const NegativeMargin = {
  name: 'Negative Margin',
  render: () =>
    directionsDemo({
      name: 'pull',
      step: 1,
    }),
};

/** @type {StoryObj} */
export const Responsive = {
  render: () => responsiveDemo(),
};
