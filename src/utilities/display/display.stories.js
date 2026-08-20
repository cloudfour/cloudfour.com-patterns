import clearfixDemo from './demo/clearfix.twig';
import hiddenVisuallyDemo from './demo/hidden-visually.twig';

export default {
  title: 'Utilities/Display',
};

export const HiddenVisually = {
  name: 'Hidden Visually',
  render: hiddenVisuallyDemo,
};

export const Clearfix = {
  render: clearfixDemo,
};
