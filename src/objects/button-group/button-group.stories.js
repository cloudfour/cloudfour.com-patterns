/** @import { Meta, StoryObj } from '@storybook/html' */
import demo from './demo/demo.twig';

/** @type {Meta} */
const meta = {
  title: 'Objects/Button Group',
  args: {
    grow: false,
    count: 2,
  },
  argTypes: {
    grow: {
      type: { name: 'boolean' },
      description: 'Controls the button full width modifier',
    },
    count: {
      type: { name: 'number' },
      description: 'Number of buttons to render',
      control: {
        type: 'range',
        min: 1,
        max: 10,
        step: 1,
      },
    },
  },
  render: (args) => demo(args),
};

export default meta;

/** @type {StoryObj} */
export const Default = {
  parameters: {
    docs: {
      source: {
        code: `{% embed '@cloudfour/objects/button-group/button-group.twig' only %}
  {% block content %}
    {% include '@cloudfour/components/button/button.twig' with {
      label: 'Button 1'
    } only %}
    {% include '@cloudfour/components/button/button.twig' with {
      label: 'Button 2'
    } only %}
  {% endblock %}
{% endembed %}`,
      },
    },
  },
};

/** @type {StoryObj} */
export const Grow = {
  args: { count: 5, grow: true },
  parameters: {
    docs: {
      source: {
        code: `{% embed '@cloudfour/objects/button-group/button-group.twig' with {
  grow: true
} only %}
  {# buttons #}
{% endembed %}`,
      },
    },
  },
};
