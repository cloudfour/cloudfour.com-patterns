/** @import { ArgTypes, Meta, StoryObj } from '@storybook/html' */
import { mediaArgTypes } from '../../objects/media/demo/arg-types.js';
import { avatarArgTypes } from '../avatar/demo/arg-types.js';

import template from './media-link.twig';
/** @type {Partial<ArgTypes>} */
const mediaLinkArgTypes = {
  ...mediaArgTypes,
  label: {
    type: { name: 'string' },
    description: 'The text content for the Media Link.',
  },
  href: {
    type: { name: 'string' },
    description: 'The destination URL for the Media Link.',
    table: {
      defaultValue: {
        summary: '#',
      },
    },
  },
  icon: {
    type: { name: 'string' },
    description: 'A key corresponding to one of our compact icons.',
  },
  icon_class: {
    type: { name: 'string' },
    description:
      'Optional class name(s) to append to the icon. Useful for adjusting size or color.',
  },
  action_class: {
    type: { name: 'string' },
    description:
      'Optional class name(s) to append to the action element (the link itself). Useful for applying typographic adjustments.',
  },
  avatar: {
    ...avatarArgTypes.src,
    description:
      'The `src` path for an Avatar component to use as the media object.',
  },
  avatar_alt: avatarArgTypes.alt,
  avatar_width: avatarArgTypes.width,
  avatar_height: avatarArgTypes.height,
  avatar_srcset: avatarArgTypes.srcset,
  avatar_sizes: avatarArgTypes.sizes,
  avatar_size: avatarArgTypes.size,
  avatar_shape: avatarArgTypes.shape,
};

/** @type {Meta} */
const meta = {
  title: 'Components/Media Link',
  argTypes: mediaLinkArgTypes,
  render: (args) => template(args),
};

export default meta;

/** @type {StoryObj} */
export const Basic = {
  args: {
    href: 'https://cloudfour.com/thinks/performance-is-an-issue-of-equity/',
    label:
      'Cloud Four partner Megan Notarte explains why performance is an issue of equity',
    avatar: '/media/megan.png',
    avatar_width: 88,
    avatar_height: 88,
    icon: 'arrow-right',
  },
};
