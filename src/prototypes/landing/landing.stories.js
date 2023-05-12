import { useEffect } from '@storybook/client-api';

import { createElasticTextArea } from '../../components/input/elastic-textarea.ts';

import ecomR1Template from './ecom/r1.twig';
import './ecom/r1.scss';

export default {
  title: 'Prototypes/Landing Pages',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const EcomR1 = () => {
  useEffect(() => {
    createElasticTextArea(document.querySelector('.js-elastic-textarea'));
  }, []);
  return ecomR1Template();
};

EcomR1.storyName = 'Ecommerce (R1)';
