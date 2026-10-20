/** @import { Args, Meta, StoryObj } from '@storybook/html' */
import './background.scss';

/** @param {Args} args */
const backgroundStory = (args) => {
  const classNames = [args.color || ''];
  const textColor = [args.text || ''];
  const className = classNames
    .map((segment) => (segment.length > 0 ? `u-bg-${segment}` : 'u-bg'))
    .join(' ');
  return `<div class="u-text-${textColor} ${className}  u-pad-n1">${className}</div>`;
};

/** @type {Meta} */
const meta = {
  title: 'Utilities/Background',
  argTypes: {
    color: {
      options: ['green', 'purple', 'fuchsia', 'orange', 'none'],
      type: {
        name: 'enum',
        value: ['green', 'purple', 'fuchsia', 'orange', 'none'],
      },
      control: { type: 'inline-radio' },
    },
    text: {
      options: ['light', 'dark'],
    },
  },
  render: (args) => backgroundStory(args),
};

export default meta;

/** @type {StoryObj} */
export const Green = {
  args: { color: 'green', text: 'light' },
};

/** @type {StoryObj} */
export const Purple = {
  args: { color: 'purple', text: 'light' },
};

/** @type {StoryObj} */
export const Fuchsia = {
  args: { color: 'fuchsia', text: 'light' },
};

/** @type {StoryObj} */
export const Orange = {
  args: { color: 'orange', text: 'light' },
};

/** @type {StoryObj} */
export const None = {
  args: { color: 'none', text: 'dark' },
};
