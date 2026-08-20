import button from './button.twig';
import iconButtonCustomDemo from './demo/icon-button-custom-demo.twig';
import iconButtonCustomDemoSource from './demo/icon-button-custom-demo.twig?raw';
import slashedIconButtonCustomDemo from './demo/slashed-icon-button-custom-demo.twig';
import slashedIconButtonCustomDemoSource from './demo/slashed-icon-button-custom-demo.twig?raw';
import stylesDemo from './demo/styles.twig';
import stylesDemoSource from './demo/styles.twig?raw';
const iconControlConfig = {
  options: [
    '',
    'bell',
    'cube-alt',
    'magnifying-glass',
    'heart',
    'brands/github',
    'brands/twitter',
  ],
  type: { name: 'string' },
  control: {
    type: 'select',
  },
};
const buttonStory = (args) => {
  // Don't bother with the inline options if they don't exist or are defaults
  if (args.content_start_icon === '') {
    delete args.content_start_icon;
  }
  if (args.content_end_icon === '') {
    delete args.content_end_icon;
  }
  if (args.disabled === false) {
    delete args.disabled;
  }
  if (args.type === 'button') {
    delete args.type;
  }
  return button(args);
};

export default {
  title: 'Components/Button',
  args: {
    type: 'button',
    disabled: false,
  },
  argTypes: {
    href: { type: { name: 'string' } },
    type: {
      options: ['button', 'submit'],
      type: { name: 'enum' },
      control: { type: 'inline-radio' },
    },
    disabled: { type: { name: 'boolean' } },
    content_start_icon: iconControlConfig,
    content_end_icon: iconControlConfig,
  },
};

export const ButtonElement = {
  name: 'Button Element',
  args: { label: 'Button', href: false },
  render: (args) => buttonStory(args),
};

export const LinkElement = {
  name: 'Link Element',
  args: { label: 'Link', tagName: 'a' },
  render: (args) => buttonStory(args),
};

export const Styles = {
  parameters: { docs: { source: { code: stylesDemoSource } } },
  render: (args) => stylesDemo(args),
};

export const StylesDark = {
  name: 'Styles (Dark)',
  parameters: {
    theme: 't-dark',
    docs: { source: { code: stylesDemoSource } },
  },
  render: (args) => stylesDemo(args),
};

export const Icon = {
  args: {
    content_start_icon: 'bell',
    label: 'Get notifications',
  },
  render: (args) => buttonStory(args),
};

export const CustomIcon = {
  name: 'Custom Icon',
  parameters: {
    docs: { source: { code: iconButtonCustomDemoSource } },
  },
  render: (args) => iconButtonCustomDemo(args),
};

export const Disabled = {
  args: { label: 'Disabled', disabled: true },
  render: (args) => buttonStory(args),
};

export const ARIADisabled = {
  name: 'ARIA Disabled',
  args: { label: 'ARIA Disabled', aria_disabled: 'true' },
  render: (args) => buttonStory(args),
};

export const Loading = {
  args: { label: 'Loading', class: 'is-loading' },
  render: (args) => buttonStory(args),
};

export const SlashedIcon = {
  name: 'Slashed Icon',
  args: {
    class: 'is-slashed',
  },
  render: (args) => buttonStory(args),
};

export const SecondaryButtonWithSlashedIcon = {
  name: 'Secondary Button with Slashed Icon',
  args: {
    class: 'c-button--secondary is-slashed',
  },
  render: (args) => buttonStory(args),
};

export const TertiaryButtonWithSlashedIcon = {
  name: 'Tertiary Button with Slashed Icon',
  args: {
    class: 'c-button--tertiary is-slashed',
  },
  render: (args) => buttonStory(args),
};

export const SlashedCustomIcon = {
  name: 'Slashed Custom Icon',
  parameters: {
    docs: { source: { code: slashedIconButtonCustomDemoSource } },
  },
  render: (args) => slashedIconButtonCustomDemo(args),
};
