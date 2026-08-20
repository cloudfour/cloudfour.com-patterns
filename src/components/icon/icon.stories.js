import a11yDemo from './demo/a11y.twig';
import a11yDemoSource from './demo/a11y.twig?raw';
import inlineDemo from './demo/inline.twig';
import inlineDemoSource from './demo/inline.twig?raw';
import template from './icon.twig';
const iconStory = (args) => {
  // Don't bother with the inline option if it is the default
  if (args.inline === false) {
    delete args.inline;
  }
  return template(args);
};
const defaultArgs = {
  name: { type: 'string' },
  fallback: { type: 'string' },
  inline: { type: 'boolean' },
  class: { type: 'string' },
  title: { type: 'string' },
  muted: { type: 'boolean' },
  size: { type: 'string' },
};

export default {
  title: 'Components/Icon',
};

export const Basic = {
  args: {
    name: 'heart',
    inline: false,
  },
  argTypes: defaultArgs,
  render: (args) => iconStory(args),
};

export const Muted = {
  args: {
    name: 'heart',
    inline: false,
    muted: true,
  },
  argTypes: defaultArgs,
  render: (args) => iconStory(args),
};

export const MediumSize = {
  name: 'Medium Size',
  args: {
    name: 'heart',
    size: 'medium',
  },
  argTypes: defaultArgs,
  render: (args) => iconStory(args),
};

export const LargeSize = {
  name: 'Large Size',
  args: {
    name: 'heart',
    size: 'large',
  },
  argTypes: defaultArgs,
  render: (args) => iconStory(args),
};

export const XLargeSize = {
  name: 'X-Large Size',
  args: {
    name: 'heart',
    size: 'x-large',
  },
  argTypes: defaultArgs,
  render: (args) => iconStory(args),
};

export const Accessibility = {
  parameters: { docs: { source: { code: a11yDemoSource } } },
  render: a11yDemo,
};

export const Inline = {
  parameters: { docs: { source: { code: inlineDemoSource } } },
  render: inlineDemo,
};
