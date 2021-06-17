import examplePrototype from './example/example.twig';
import cpeImage from './images/collage-cpe.jpg';
import wmImage from './images/collage-wm.jpg';
import cfImage from './images/collage-cf.jpg';
import cpeLogo from './images/cpe-logo.jpg';
import wmLogo from './images/wm-logo.svg';
import cfLogo from './images/cf-logo.jpg';
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
    cpeL: cpeLogo,
    wmL: wmLogo,
    cfL: cfLogo,
  });
