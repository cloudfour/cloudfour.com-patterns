const borderStory = (args) => {
  const classNames = [args.width || ''];
  if (args.color) {
    classNames.push(args.color);
  }
  const className = classNames
    .map((segment) => (segment.length > 0 ? `u-border-${segment}` : 'u-border'))
    .join(' ');
  return `<div class="${className} u-pad-n1">${className}</div>`;
};

export default {
  title: 'Utilities/Border',
  argTypes: {
    width: {
      options: ['small', 'medium', 'large', 'none'],
      type: { name: 'enum' },
      control: { type: 'inline-radio' },
    },
  },
  render: (args) => borderStory(args),
};

export const SmallDefault = {
  name: 'Small (Default)',
};

export const Medium = {
  args: { width: 'medium' },
};

export const Large = {
  args: { width: 'large' },
};

export const None = {
  args: { width: 'none' },
};
