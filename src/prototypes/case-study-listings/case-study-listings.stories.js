import examplePrototype from './example/example.twig';
import cpeImage from './images/collage-cpe.jpg';
import wmImage from './images/walmart.jpg';
import cfImage from './images/collage-cf.jpg';
import bookApart from './images/bookicon.png';
import mobileWeb from './images/bookicon2.png';
import pwaStat from './images/pwastat.jpg';
import responsiveImg from './images/responsive.svg';
import svgPlaceholder from './images/placeholder.jpg';
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
    book: bookApart,
    mobile: mobileWeb,
    pwa: pwaStat,
    responsive: responsiveImg,
    svg: svgPlaceholder,
  });
