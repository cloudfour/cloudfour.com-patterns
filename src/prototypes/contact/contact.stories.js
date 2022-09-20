import { useEffect } from '@storybook/client-api';

import { createElasticTextArea } from '../../components/input/elastic-textarea.ts';

import contactA from './contact-a.twig';
import './contact-a.scss';

export default {
  title: 'Prototypes/Contact',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const ContactA = () => {
  useEffect(() => {
    createElasticTextArea(document.querySelector('.js-elastic-textarea'));
  }, []);
  return contactA();
};
