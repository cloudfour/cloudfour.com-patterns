import bookDemo from './demo/book.twig';
import bookDemoSource from './demo/book.twig?raw';
import eventDemo from './demo/event.twig';
import eventDemoSource from './demo/event.twig?raw';

export default {
  title: 'Components/Media Summary',
};

export const Event = {
  parameters: { docs: { source: { code: eventDemoSource } } },
  render: (args) => eventDemo(args),
};

export const Book = {
  parameters: { docs: { source: { code: bookDemoSource } } },
  render: (args) => bookDemo(args),
};
