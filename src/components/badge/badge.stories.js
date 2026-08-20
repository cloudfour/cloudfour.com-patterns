import template from './badge.twig';
const badgeStory = (args) => {
  // Don't bother with the inline options if they don't exist or are defaults
  if (args.icon === '') {
    delete args.icon;
  }
  return template(args);
};

export default {
  title: 'Components/Badge',
  argTypes: {
    label: { type: { name: 'string' } },
    href: { type: { name: 'string' } },
    icon: {
      options: ['', 'asterisk', 'check', 'heart', 'pencil'],
      type: { name: 'string' },
      control: {
        type: 'select',
      },
    },
    parenthetical: { type: { name: 'boolean' } },
  },
  render: (args) => badgeStory(args),
};

export const Basic = {
  args: { label: 'Hello' },
};

export const WithIcon = {
  name: 'With icon',
  args: { icon: 'check', label: 'Verified' },
};

export const Linked = {
  args: { icon: 'paperclip', label: 'Attachment', href: '#', rel: 'tag' },
};
