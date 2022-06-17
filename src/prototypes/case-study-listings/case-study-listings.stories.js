import logos from './data/logos.json';
import examplePrototype from './example/example.twig';
import cfImage from './images/collage-cf.jpg';
import cpeImage from './images/collage-cpe.jpg';
import wmImage from './images/walmart.jpg';
import './example/example.scss';

export default {
  title: 'Prototypes/Case Study Listings',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const Example = () =>
  examplePrototype({
    cpe: cpeImage,
    wm: wmImage,
    cf: cfImage,
    logos,
  });
