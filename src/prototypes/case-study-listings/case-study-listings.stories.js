import examplePrototype from './example/example.twig';
import cpeImage from './images/collage-cpe.jpg';
import wmImage from './images/walmart.jpg';
import cfImage from './images/collage-cf.jpg';
import bookApart from './images/aba.jpg';
import codePiece from './images/code.jpg';
import pwaStat from './images/pwastat.jpg';
import responsiveImg from './images/responsiveimg.jpg';
import svgPlaceholder from './images/svgplaceholder.jpg';
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
    code: codePiece,
    pwa: pwaStat,
    responsive: responsiveImg,
    svg: svgPlaceholder,
  });
