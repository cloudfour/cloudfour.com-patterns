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

export default {
  title: 'Objects/List',
  args: {
    items: defaultItems,
    tag_name: tagNames[0],
  },
  argTypes: {
    class: { type: { name: 'string' } },
    items: { type: { name: 'array' } },
    tag_name: {
      options: tagNames,
      type: { name: 'enum' },
      control: { type: 'inline-radio' },
    },
  },
  parameters: { docs: { story: { inline: false } } },
  render: (args) => template(args),
};

export const Default = {};

export const Inline = {
  args: { class: 'o-list--inline' },
};

export const Column = {
  args: { class: 'o-list--3-column@l' },
};
