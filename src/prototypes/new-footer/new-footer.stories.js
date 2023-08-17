import r1Prototype from './r1.twig';
import './r1.scss';

export default {
  title: 'Prototypes/New Footer',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const r1 = () => r1Prototype({});
