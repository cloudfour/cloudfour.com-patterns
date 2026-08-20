import mockPaginationData from './demo/mock-pagination-data.js';
import template from './pagination.twig';

export default {
  title: 'Components/Pagination',
  render: (args) => template({ pagination: mockPaginationData(args) }),
};

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
