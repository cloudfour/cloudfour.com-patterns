/** @import { Meta, StoryObj } from '@storybook/html' */
import floatDemo from './demo/float.twig';

/** @type {Meta} */
const meta = {
  title: 'Utilities/Float',
  argTypes: {
    float: {
      options: ['inline-start', 'inline-end', 'none'],
      control: {
        type: 'select',
      },
    },
    breakpoint: {
      options: ['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'],
      control: {
        type: 'inline-radio',
      },
    },
  },
  render: (args) => floatDemo(args),
};

export default meta;

/** @type {StoryObj} */
export const Direction = {
  args: { float: 'inline-end' },
};
