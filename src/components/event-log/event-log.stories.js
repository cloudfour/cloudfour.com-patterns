/** @import { Args, Meta, StoryObj } from '@storybook/html' */
import events from './demo/events.json';
import eventsDemo from './demo/events.twig';
import eventsDemoSource from './demo/events.twig?raw';
/** @param {Args} args */
const eventsDemoStory = (args) => eventsDemo({ items: events, ...args });

/** @type {Meta} */
const meta = {
  title: 'Components/Event Log',
  render: eventsDemoStory.bind({}),
};

export default meta;

/** @type {StoryObj} */
export const Example = {
  parameters: {
    docs: {
      source: {
        code: eventsDemoSource,
      },
    },
  },
};
