/** @import { Args, Meta, StoryObj } from '@storybook/html' */
import './background.scss';

/** @param {Args} args */
const backgroundStory = (args) => {
  const classNames = [args.color || ''];
  const className = classNames
    .map((segment) => (segment.length > 0 ? `u-bg-${segment}` : 'u-bg'))
    .join(' ');
  return `<div class="u-text-light ${className}  u-pad-n1">${className}</div>`;
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
  },
  render: (args) => backgroundStory(args),
};

export default meta;

/** @type {StoryObj} */
export const Green = {
  args: { color: 'green' },
};

/** @type {StoryObj} */
export const Purple = {
  args: { color: 'purple' },
};

/** @type {StoryObj} */
export const Fuchsia = {
  args: { color: 'fuchsia' },
};

/** @type {StoryObj} */
export const Orange = {
  args: { color: 'orange' },
};

/** @type {StoryObj} */
export const None = {
  args: { color: 'none' },
};
