import articleDemo from './article.twig';
import './r1.scss';

export default {
  title: 'Prototypes/Asides',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
  argTypes: {
    align: {
      options: ['start', 'end'],
      control: { type: 'radio' },
    },
    summary: {
      control: { type: 'text' },
    },
    open: {
      control: { type: 'boolean' },
    },
  },
};

export const Revision1 = (args) => articleDemo(args);
