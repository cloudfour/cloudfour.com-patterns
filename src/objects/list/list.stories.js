/** @import { Meta, StoryObj } from '@storybook/html' */
import template from './list.twig';
const defaultItems = [
  'Design Tokens',
  'Objects',
  'Components',
  'Scope',
  'Utilities',
  'Themes',
];
const tagNames = ['ul', 'ol'];

/** @type {Meta} */
const meta = {
  title: 'Objects/List',
  args: {
    items: defaultItems,
    tag_name: tagNames[0],
  },
  argTypes: {
    class: { type: { name: 'string' } },
    items: { type: { name: 'array', value: { name: 'string' } } },
    tag_name: {
      options: tagNames,
      type: { name: 'enum', value: tagNames },
      control: { type: 'inline-radio' },
    },
  },
  parameters: { docs: { story: { inline: false } } },
  render: (args) => template(args),
};

export default meta;

/** @type {StoryObj} */
export const Default = {
  parameters: { docs: { story: { iframeHeight: '200px' } } },
};

/** @type {StoryObj} */
export const Inline = {
  args: { class: 'o-list--inline' },
};

/** @type {StoryObj} */
export const Column = {
  args: { class: 'o-list--3-column@l' },
};
