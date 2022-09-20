import contactA from './contact-a.twig';
import './contact-a.scss';

export default {
  title: 'Prototypes/Contact',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const ContactA = () => contactA({});
