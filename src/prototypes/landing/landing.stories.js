import ecomR1Template from './ecom/r1.twig';
import './ecom/r1.scss';

export default {
  title: 'Prototypes/Landing Pages',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const EcomR1 = () => ecomR1Template({});

EcomR1.storyName = 'Ecommerce (R1)';
