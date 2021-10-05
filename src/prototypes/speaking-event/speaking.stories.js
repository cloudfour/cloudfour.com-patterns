import events from './data/events.json';
import singleSpeakerPrototype from './example/single-speaker.twig';
import multipleSpeakersPrototype from './example/multiple-speakers.twig';
import deck from './images/deck.png';
import './example/example.scss';

export default {
  title: 'Prototypes/Speaking Event',
  parameters: {
    docs: { page: null },
    paddings: { disable: true },
  },
};

export const SingleSpeaker = () => singleSpeakerPrototype({ events, deck });

export const MultipleSpeakers = () => multipleSpeakersPrototype({ events, deck });
