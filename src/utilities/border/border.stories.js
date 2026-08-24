/** @import { Args, Meta, StoryObj } from '@storybook/html' */
/** @param {Args} args */
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

/** @type {Meta} */
const meta = {
  title: 'Utilities/Border',
  argTypes: {
    width: {
      options: ['small', 'medium', 'large', 'none'],
      type: { name: 'enum', value: ['small', 'medium', 'large', 'none'] },
      control: { type: 'inline-radio' },
    },
  },
  render: (args) => borderStory(args),
};

export default meta;

/** @type {StoryObj} */
export const SmallDefault = {
  name: 'Small (Default)',
};

/** @type {StoryObj} */
export const Medium = {
  args: { width: 'medium' },
};

/** @type {StoryObj} */
export const Large = {
  args: { width: 'large' },
};

/** @type {StoryObj} */
export const None = {
  args: { width: 'none' },
};
