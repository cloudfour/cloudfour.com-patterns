import events from './data/events.json';
import examplePrototype from './example/example.twig';
import deck from './images/deck.png';
import './example/example.scss';

export default {
  title: 'Prototypes/Speaking Event',
  parameters: {
    docs: { page: null },
    paddings: { disable: true },
  },
};

export const Example = () => examplePrototype({ events, deck });
