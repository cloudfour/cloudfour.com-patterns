import examplePrototype from './example/example.twig';
import cpeImage from './images/collage-cpe.jpg';
import wmImage from './images/walmart.jpg';
import cfImage from './images/collage-cf.jpg';
import './example/example.scss';

export default {
  title: 'Prototypes/Case Study Listings',
  parameters: {
    docs: { page: null },
    paddings: { disable: true },
  },
};

export const Example = () =>
  examplePrototype({
    cpe: cpeImage,
    wm: wmImage,
    cf: cfImage,
  });
