import withLabelDemo from './demo/with-label.twig';
import './demo/styles.scss';

export default {
  title: 'Components/Radio',
  argTypes: {
    disabled: { type: { name: 'boolean' } },
  },
  render: (args) => withLabelDemo(args),
};

export const Enabled = {
  parameters: {
    docs: {
      source: {
        code: `{% include '@cloudfour/components/radio/radio.twig' with {
  name: 'demo-radio-enabled',
  value: 'example',
  checked: true,
} only %}`,
      },
    },
  },
};

export const Disabled = {
  args: { disabled: true },
  parameters: {
    docs: {
      source: {
        code: `{% include '@cloudfour/components/radio/radio.twig' with {
  name: 'demo-radio-disabled',
  value: 'example',
  checked: true,
  disabled: true,
} only %}`,
      },
    },
  },
};
