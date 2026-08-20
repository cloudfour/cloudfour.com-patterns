import events from './demo/events.json';
import eventsDemo from './demo/events.twig';
import eventsDemoSource from './demo/events.twig?raw';
const eventsDemoStory = (args) => eventsDemo({ items: events, ...args });

export default {
  title: 'Components/Event Log',
  render: eventsDemoStory.bind({}),
};

export const Example = {
  parameters: {
    docs: {
      source: {
        code: eventsDemoSource,
      },
    },
  },
};
