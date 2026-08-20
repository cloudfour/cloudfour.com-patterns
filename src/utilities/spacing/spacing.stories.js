import tokens from '../../compiled/tokens/js/tokens.js';

import directionsDemo from './demo/directions.twig';
import responsiveDemo from './demo/responsive.twig';
import './demo/styles.scss';

const minimumStep = tokens.number.scale.modular.minimum_step.value;
const maximumStep = tokens.number.scale.modular.maximum_step.value;
const defaultArgTypes = {
  step: {
    type: { name: 'number' },
    control: { type: 'range', min: minimumStep, max: maximumStep, step: 1 },
  },
};
const defaultArgs = {
  step: 1,
};

export default {
  title: 'Utilities/Spacing',
};

export const Padding = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  render: (args) => directionsDemo({ name: 'pad', ...args }),
};

export const Margin = {
  args: defaultArgs,
  argTypes: defaultArgTypes,
  render: (args) => directionsDemo({ name: 'space', ...args }),
};

export const NegativeMargin = {
  name: 'Negative Margin',
  render: () =>
    directionsDemo({
      name: 'pull',
      step: 1,
    }),
};

export const Responsive = {
  render: () => responsiveDemo(),
};
