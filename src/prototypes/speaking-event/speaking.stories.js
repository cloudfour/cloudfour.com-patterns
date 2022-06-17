import events from './data/events.json';
import multipleSpeakersPrototype from './example/multiple-speakers.twig';
import singleSpeakerPrototype from './example/single-speaker.twig';
import deck from './images/deck.png';
import './example/example.scss';

export default {
  title: 'Prototypes/Speaking Event',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const SingleSpeaker = () => singleSpeakerPrototype({ events, deck });

export const MultipleSpeakers = () =>
  multipleSpeakersPrototype({ events, deck });
