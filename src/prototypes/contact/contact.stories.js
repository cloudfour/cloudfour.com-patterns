import { useEffect } from '@storybook/client-api';

import { createElasticTextArea } from '../../components/input/elastic-textarea.ts';

import contactA from './contact-a.twig';
import contactB from './contact-b.twig';
import './contact-a.scss';
import './contact-b.scss';

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

export const ContactB = () => {
  useEffect(() => {
    createElasticTextArea(document.querySelector('.js-elastic-textarea'));
  }, []);
  return contactB();
};
