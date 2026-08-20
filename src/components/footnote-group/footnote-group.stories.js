import template from './footnote-group.twig';

export default {
  title: 'Components/Footnote/Footnote Group',
  argTypes: {
    compact: { type: { name: 'boolean' } },
    id_suffix: { type: { name: 'string' } },
  },
  render: (args) =>
    template({
      items: ['Footnote 1', 'Footnote 2', 'Footnote 3', 'Footnote 4'],
      ...args,
    }),
};

export const Basic = {};

export const Compact = {
  args: {
    compact: true,
  },
};
