import template from './alert.twig';

export default {
  title: 'Components/Alert',
  argTypes: {
    class: {
      type: 'string',
      description: 'CSS class(es) to append to the root element.',
    },
    message: {
      type: 'string',
      description: 'The message within the alert.',
      table: {
        defaultValue: { summary: 'Hello world!!!' },
      },
    },
    dismissable: {
      type: 'boolean',
      description: 'Adds a close button to the right of the message.',
      table: {
        defaultValue: { summary: false },
      },
    },
    icon: {
      options: [
        '',
        'bell',
        'check',
        'cloud-slash',
        'brands/github',
        'brands/twitter',
      ],
      type: 'string',
      description:
        'An option to add one of our [icons](/?path=/docs/design-icons--page).',
      control: {
        type: 'select',
      },
    },
    floating: {
      type: 'boolean',
      description: 'Adds a light border and shadow for a floating effect.',
      table: {
        defaultValue: { summary: false },
      },
    },
    tag_name: {
      type: 'string',
      description: 'The root element',
      table: {
        defaultValue: { summary: 'div' },
      },
    },
    id: {
      type: 'string',
      description: 'Adds an `id` attribute to the root element',
    },
    hidden: {
      type: 'boolean',
      description: 'Adds a `hidden` attribute to the root element.',
      table: {
        defaultValue: { summary: false },
      },
    },
    role: {
      type: 'string',
      description: 'Adds a `role` attribute on the root element.',
    },
  },
  render: (args) => template(args),
};

export const Basic = {
  args: { message: 'Your comment is awaiting moderation.' },
};

export const Dismissable = {
  args: {
    message: 'Your action was completed successfully! 🎉',
    dismissable: true,
  },
};

export const FullWidth = {
  name: 'Full width',
  args: {
    message: 'You appear to be offline. 🤔',
    dismissable: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Icon = {
  args: {
    message: 'Your action was completed successfully! 🎉',
    icon: 'check',
  },
};

export const Error = {
  args: {
    message: 'Oops! Something went wrong.',
    dismissable: true,
    class: 'c-alert--error',
    icon: 'confused-face',
  },
};

export const Floating = {
  args: {
    message: 'You appear to be offline. 🤔',
    dismissable: true,
    floating: true,
    icon: 'bell',
  },
};

export const ThemedFloating = {
  name: 'Themed Floating',
  args: {
    message: 'You appear to be offline. 🤔',
    dismissable: true,
    floating: true,
    icon: 'bell',
    class: 't-light',
  },
  parameters: {
    theme: 't-dark',
  },
};
