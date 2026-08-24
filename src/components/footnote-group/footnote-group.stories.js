/** @import { Meta, StoryObj } from '@storybook/html' */
import template from './footnote-group.twig';

/** @type {Meta} */
const meta = {
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

export default meta;

/** @type {StoryObj} */
export const Basic = {};

/** @type {StoryObj} */
export const Compact = {
  args: {
    compact: true,
  },
};
