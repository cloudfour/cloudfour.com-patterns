import alignmentDemo from './demo/alignment.twig';
import logoTemplate from './logo.twig';
import './demo/alignment.scss';
const alignOptions = ['start', 'center', 'end'];

// This component's options rely on CSS custom properties, which are currently
// broken in the library we use for inlining Storybook stories. Until that issue
// is resolved, we must fallback to iframes for these stories. 🙈️
//
// @see https://github.com/aknuds1/html-to-react/issues/144

export default {
  title: 'Components/Logo',
  parameters: { docs: { story: { inline: false } } },
};

export const BasicOptions = {
  name: 'Basic Options',
  args: {
    src: '/media/logos/pleasantest.svg',
    alt: 'Pleasantest',
    width: 180,
    height: 58,
  },
  argTypes: {
    src: { control: { type: 'text' } },
    alt: { control: { type: 'text' } },
    class: { control: { type: 'text' } },
    width: { control: { type: 'number' } },
    height: { control: { type: 'number' } },
    scale: { control: { type: 'number' } },
    align: {
      options: alignOptions,
      control: { type: 'inline-radio' },
    },
    justify: {
      options: alignOptions,
      control: { type: 'inline-radio' },
    },
  },
  render: (args) => logoTemplate(args),
};

export const BeforeAlignment = {
  name: 'Before Alignment',
  render: alignmentDemo.bind({}),
};

export const AfterAlignment = {
  name: 'After Alignment',
  args: { align: true },
  render: alignmentDemo.bind({}),
};
