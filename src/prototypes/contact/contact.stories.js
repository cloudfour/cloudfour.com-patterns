import { useEffect } from '@storybook/client-api';

import { createElasticTextArea } from '../../components/input/elastic-textarea.ts';

import contactA from './contact-a.twig';
import contactB from './contact-b.twig';
import contactC from './contact-c.twig';
import './contact-a.scss';
import './contact-b.scss';
import './contact-c.scss';

export default {
  title: 'Prototypes/Contact',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

const sharedEffect = () => {
  createElasticTextArea(document.querySelector('.js-elastic-textarea'));
};

export const ContactA = () => {
  useEffect(sharedEffect, []);
  return contactA();
};

export const ContactB = () => {
  useEffect(sharedEffect, []);
  return contactB();
};

export const ContactC = () => {
  useEffect(sharedEffect, []);
  return contactC();
};
