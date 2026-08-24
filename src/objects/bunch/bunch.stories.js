/** @import { Args, Meta, StoryObj } from '@storybook/html' */
import { shuffle } from 'lodash';

import avatarsDemo from './demo/avatars.twig';
const demoImages = import.meta.glob('./demo/*.png', {
  eager: true,
  import: 'default',
});
const demoImageSrcs = Object.values(demoImages);
/** @param {Args} args */
const avatarsDemoStory = (args) => {
  const srcs = shuffle(demoImageSrcs).slice(0, args.count);
  return avatarsDemo({ srcs });
};
// The story demo is kind of specific to Storybook, so we're manually defining
// a source code example that will be easier to understand.
const avatarsDemoSrc = `{% embed '@cloudfour/objects/bunch/bunch.twig' only %}
  {% block content %}
    {# avatars #}
  {% endblock %}
{% endembed %}`;

/** @type {Meta} */
const meta = {
  title: 'Objects/Bunch',
  args: {
    count: 3,
  },
  argTypes: {
    count: {
      type: 'number',
      description: 'Number of avatars to show',
      control: {
        type: 'range',
        min: 1,
        max: demoImageSrcs.length,
        step: 1,
      },
    },
  },
  render: avatarsDemoStory.bind({}),
};

export default meta;

/** @type {StoryObj} */
export const OfAvatars = {
  name: 'Of avatars',
  parameters: {
    docs: {
      source: {
        code: avatarsDemoSrc,
      },
    },
  },
};
