export const mediaArgTypes = {
  tag_name: {
    type: { name: 'string' },
    description: 'The root tag for the component',
    table: {
      defaultValue: {
        summary: 'div',
      },
    },
  },
  inner_tag_name: {
    type: { name: 'string' },
    description: 'The tag for both the media content and media object elements',
    table: {
      defaultValue: {
        summary: 'div',
      },
    },
  },
  content_tag_name: {
    type: { name: 'string' },
    description: 'The tag for the media content element',
    table: {
      defaultValue: {
        summary: '`inner_tag_name`',
      },
    },
  },
  object_tag_name: {
    type: { name: 'string' },
    description: 'The tag for the media object element',
    table: {
      defaultValue: {
        summary: '`inner_tag_name`',
      },
    },
  },
  class: { type: { name: 'string' } },
  content_class: { type: { name: 'string' } },
  object_class: { type: { name: 'string' } },
  reverse: { type: { name: 'boolean' } },
};
