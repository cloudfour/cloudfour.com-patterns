import examplePrototype from './example/example.twig';
import './example/example.scss';
import cpeImage from './images/collage-cpe.jpg';
import homeGoals from './images/home-goals.svg';
import speedyWebComponents from './images/speedy-web-components.png';
import cooperativePlugins from './images/cooperative-plugins.png';

export default {
  title: 'Prototypes/Home',
  parameters: {
    docs: { page: null },
    paddings: { disable: true },
  },
};

export const Example = () =>
  examplePrototype({
    cpe: cpeImage,
    plugins: cooperativePlugins,
    speedy: speedyWebComponents,
    goals: homeGoals,
  });
