import basicDemo from './demo/basic.twig';
import fillDemo from './demo/fill.twig';
import fillDemoSource from './demo/fill.twig?raw';
const basicDemoStory = (args) => {
  const modifiers = [];
  if (args.prose) {
    modifiers.push('prose');
  }
  if (args.pad && args.pad.length > 0) {
    if (args.pad.length === 2) {
      modifiers.push('pad');
    } else {
      modifiers.push(`pad-${args.pad[0]}`);
    }
  }
  const classNames = modifiers.map((modifier) => `o-container--${modifier}`);
  return basicDemo({ ...args, class: classNames.join(' ') });
};
const padOptions = ['block', 'inline'];

// Inline stories disabled so media queries will behave as expected within
// embedded examples.

export default {
  title: 'Objects/Container',
  argTypes: {
    prose: {
      control: {
        type: 'boolean',
      },
    },
    pad: {
      options: padOptions,
      control: { type: 'inline-check' },
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: { story: { inline: false } },
  },
};

export const Basic = {
  args: { prose: false, pad: padOptions },
  parameters: {
    docs: {
      source: {
        code: `{% embed '@cloudfour/objects/container/container.twig' with {
  class: 'o-container--pad'
} only %}
  {% block content %}
    {# content #}
  {% endblock %}
{% endembed %}`,
      },
    },
  },
  render: basicDemoStory.bind({}),
};

export const Prose = {
  args: { prose: true, pad: padOptions },
  parameters: {
    docs: {
      source: {
        code: `{% embed '@cloudfour/objects/container/container.twig' with {
  class: 'o-container--prose o-container--pad'
} only %}
  {% block content %}
    {# content #}
  {% endblock %}
{% endembed %}`,
      },
    },
  },
  render: basicDemoStory.bind({}),
};

export const Fill = {
  argTypes: {},
  parameters: { docs: { source: { code: fillDemoSource } } },
  render: fillDemo.bind({}),
};
