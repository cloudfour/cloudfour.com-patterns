import signupDemo from './demo/signup.twig';

export default {
  title: 'Vendor/Mailchimp',
  parameters: {
    layout: 'fullscreen',
  },
  render: signupDemo.bind(this),
};

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
