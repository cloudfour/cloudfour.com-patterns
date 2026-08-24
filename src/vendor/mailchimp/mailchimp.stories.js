/** @import { Meta, StoryObj } from '@storybook/html' */
import signupDemo from './demo/signup.twig';

/** @type {Meta} */
const meta = {
  title: 'Vendor/Mailchimp',
  parameters: {
    layout: 'fullscreen',
  },
  render: signupDemo.bind(this),
};

export default meta;

/** @type {StoryObj} */
export const SignupForm = {
  name: 'Signup Form',
  argTypes: {
    show_example_content: {
      control: {
        type: 'boolean',
      },
    },
    transform_heading: {
      control: {
        type: 'boolean',
      },
    },
  },
};
