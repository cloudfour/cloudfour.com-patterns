/** @import { Meta, StoryObj } from '@storybook/html' */
import withLabelDemo from './demo/with-label.twig';
import './demo/styles.scss';

/** @type {Meta} */
const meta = {
  title: 'Components/Checkbox',
  argTypes: {
    disabled: { type: { name: 'boolean' } },
  },
  render: (args) => withLabelDemo(args),
};

export default meta;

/** @type {StoryObj} */
export const Enabled = {
  args: { disabled: false },
  parameters: {
    docs: {
      source: {
        code: `<label>
  {% include '@cloudfour/components/checkbox/checkbox.twig' only %}
  Unchecked
</label>
<label>
  {% include '@cloudfour/components/checkbox/checkbox.twig' with { checked: true } only %}
  Checked
</label>`,
      },
    },
  },
};

/** @type {StoryObj} */
export const Disabled = {
  args: { disabled: true },
  parameters: {
    docs: {
      source: {
        code: `<label>
  {% include '@cloudfour/components/checkbox/checkbox.twig' with { disabled: true } only %}
  Unchecked
</label>
<label>
  {% include '@cloudfour/components/checkbox/checkbox.twig' with { disabled: true, checked: true } only %}
  Checked
</label>`,
      },
    },
  },
};
