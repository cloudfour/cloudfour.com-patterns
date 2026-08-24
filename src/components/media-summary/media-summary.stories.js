/** @import { Meta, StoryObj } from '@storybook/html' */
import bookDemo from './demo/book.twig';
import bookDemoSource from './demo/book.twig?raw';
import eventDemo from './demo/event.twig';
import eventDemoSource from './demo/event.twig?raw';

/** @type {Meta} */
const meta = {
  title: 'Components/Media Summary',
};

export default meta;

/** @type {StoryObj} */
export const Event = {
  parameters: { docs: { source: { code: eventDemoSource } } },
  render: (args) => eventDemo(args),
};

/** @type {StoryObj} */
export const Book = {
  parameters: { docs: { source: { code: bookDemoSource } } },
  render: (args) => bookDemo(args),
};
