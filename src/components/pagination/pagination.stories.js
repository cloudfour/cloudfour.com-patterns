/** @import { Meta, StoryObj } from '@storybook/html' */
import mockPaginationData from './demo/mock-pagination-data.js';
import template from './pagination.twig';

/** @type {Meta} */
const meta = {
  title: 'Components/Pagination',
  render: (args) => template({ pagination: mockPaginationData(args) }),
};

export default meta;

/** @type {StoryObj} */
export const Example = {
  args: {
    current: 2,
    midSize: 2,
    total: 36,
  },
  argTypes: {
    current: { type: { name: 'number' } },
    midSize: { type: { name: 'number' } },
    total: { type: { name: 'number' } },
  },
};
