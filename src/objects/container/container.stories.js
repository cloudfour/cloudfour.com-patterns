/** @import { Args, Meta, StoryObj } from '@storybook/html' */
import basicDemo from './demo/basic.twig';
import fillDemo from './demo/fill.twig';
import fillDemoSource from './demo/fill.twig?raw';
/** @param {Args} args */
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

/** @type {Meta} */
const meta = {
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

export default meta;

/** @type {StoryObj} */
export const Basic = {
  args: { prose: false, pad: padOptions },
  parameters: {
    docs: {
      story: { iframeHeight: '300px' },
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

/** @type {StoryObj} */
export const Prose = {
  args: { prose: true, pad: padOptions },
  parameters: {
    docs: {
      story: { iframeHeight: '300px' },
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

/** @type {StoryObj} */
export const Fill = {
  argTypes: {},
  parameters: {
    docs: {
      story: { iframeHeight: '500px' },
      source: { code: fillDemoSource },
    },
  },
  render: fillDemo.bind({}),
};
