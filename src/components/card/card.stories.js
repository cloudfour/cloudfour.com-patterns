import cloudyDemo from './demo/cloudy.twig';
import cloudyDemoSource from './demo/cloudy.twig?raw';
import singleDemo from './demo/single.twig';
const singleDemoProps = (args = {}, storyId) => {
  const props = {
    heading_id: args.heading_id || `${storyId}-heading`,
    href: args.href,
  };
  const classNames = [];
  const modifiers = [];
  if (args.horizontal !== 'none') {
    modifiers.push(`horizontal${args.horizontal}`);
  }
  if (args.contained) {
    modifiers.push('contained');
  }
  if (modifiers.length > 0) {
    classNames.push(...modifiers.map((modifier) => `c-card--${modifier}`));
  }
  if (args.theme !== 'none') {
    classNames.push(`t-${args.theme}`);
  }
  if (args.class) {
    classNames.push(args.class);
  }
  if (classNames.length > 0) {
    props.class = classNames.join(' ');
  }
  return props;
};
const singleDemoStory = (args) => {
  const props = singleDemoProps(args);
  if (args.show && args.show.length > 0) {
    for (const block of args.show) {
      props[`show_${block}`] = true;
    }
  }
  return singleDemo(props);
};
const singleDemoBlockExamples = {
  heading: 'Lorem ipsum dolor sit amet',
  eyebrow: `{% include '@cloudfour/components/logo/logo.twig' with { } only %}`,
  cover: `<img src="/media/feature-ozzie-wide.jpg" alt="">`,
  content: `<p>Consectetur adipiscing elit...</p>`,
  footer: `<p>{{'now'|date('M j, Y')}}</p>`,
};
// Custom function for generating story source from args given
const singleDemoTransformSource = (_src, storyContext) => {
  const args = storyContext.args || storyContext.initialArgs;
  const props = singleDemoProps(args, storyContext.id);
  const propsString =
    Object.keys(props).length > 0
      ? ` with ${JSON.stringify(props, null, 2)}`
      : '';
  const blocks = (args.show || []).map(
    (blockName) =>
      `{% block ${blockName} %}${singleDemoBlockExamples[blockName]}{% endblock %}`,
  );
  return `{% embed '@cloudfour/components/card/card.twig'${propsString} only %}
  ${blocks.join('\n  ')}
{% endembed %}`;
};

export default {
  title: 'Components/Card',
  args: {
    show: ['heading', 'cover', 'content', 'footer'],
    horizontal: 'none',
    theme: 'none',
  },
  argTypes: {
    show: {
      options: ['heading', 'eyebrow', 'cover', 'content', 'footer'],
      control: {
        type: 'inline-check',
      },
    },
    heading_id: { type: { name: 'string' } },
    href: { type: { name: 'string' } },
    horizontal: {
      options: ['none', '@m', '@l', '@xl'],
      type: { name: 'string' },
      control: { type: 'inline-radio' },
    },
    contained: { type: { name: 'boolean' } },
    theme: {
      options: ['none', 'light', 'dark'],
      type: { name: 'string' },
      control: { type: 'inline-radio' },
    },
  },
  parameters: {
    docs: {
      source: { transform: singleDemoTransformSource },
    },
  },
};

export const ContentBlocks = {
  name: 'Content Blocks',
  args: {
    show: ['heading', 'content', 'footer'],
  },
  render: singleDemoStory.bind({}),
};

export const Link = {
  args: {
    href: '#',
    show: ['heading', 'content', 'footer'],
  },
  render: singleDemoStory.bind({}),
};

export const CoverImage = {
  name: 'Cover Image',
  args: { href: '#' },
  render: singleDemoStory.bind({}),
};

export const Eyebrow = {
  args: {
    href: '#',
    horizontal: '@m',
    show: ['heading', 'eyebrow', 'cover', 'content'],
  },
  render: singleDemoStory.bind({}),
};

export const Horizontal = {
  args: { href: '#', horizontal: '@m' },
  render: singleDemoStory.bind({}),
};

export const CircularCoverImage = {
  name: 'Circular Cover Image',
  args: { class: 'c-card--circle-cover', href: '#', horizontal: '@m' },
  render: singleDemoStory.bind({}),
};

export const Contained = {
  args: { href: '#', horizontal: '@m', contained: true },
  render: singleDemoStory.bind({}),
};

export const Themed = {
  args: { href: '#', horizontal: '@m', contained: true, theme: 'light' },
  parameters: { theme: 't-dark' },
  render: singleDemoStory.bind({}),
};

export const Cloudy = {
  parameters: {
    docs: {
      source: {
        code: cloudyDemoSource,
      },
    },
  },
  render: cloudyDemo.bind({}),
};
