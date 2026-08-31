/** @import { Args, Meta, StoryContext, StoryObj } from '@storybook/html' */
import demo from './demo/demo.twig';
import logos from './demo/logos.json';

const justifyOptions = ['start', 'center', 'end'];
/**
 * @param {string} _src
 * @param {StoryContext} storyContext
 */
const demoTemplateSource = (_src, storyContext) => {
  const args = storyContext.args || storyContext.initialArgs;
  const twigArgs =
    Object.keys(args).length > 0
      ? ` with ${JSON.stringify(args, null, 2)}`
      : '';
  return `{% embed '@cloudfour/objects/logo-group/logo-group.twig'${twigArgs} %}
  {% block content %}
    {# logos #}
  {% endblock %}
{% endembed %}`;
};
/** @param {Args} args */
const demoStory = (args) => demo({ ...args, logos });

/** @type {Meta} */
const meta = {
  title: 'Objects/Logo Group',
  argTypes: {
    justify: {
      options: justifyOptions,
      control: { type: 'inline-radio' },
    },
    pad: {
      type: { name: 'boolean' },
    },
  },
  parameters: {
    docs: {
      source: { transform: demoTemplateSource },
    },
  },
  render: (args) => demoStory(args),
};

export default meta;

/** @type {StoryObj} */
export const Default = {};

/** @type {StoryObj} */
export const CenteredWithPadding = {
  name: 'Centered with padding',
  args: {
    justify: 'center',
    pad: true,
  },
};
