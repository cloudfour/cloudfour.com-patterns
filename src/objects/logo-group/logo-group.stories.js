import demo from './demo/demo.twig';
import logos from './demo/logos.json';
const justifyOptions = ['start', 'center', 'end'];
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
const demoStory = (args) => demo({ ...args, logos });

export default {
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

export const Default = {};

export const CenteredWithPadding = {
  name: 'Centered with padding',
  args: {
    justify: 'center',
    pad: true,
  },
};
