export const avatarArgTypes = {
  src: { type: { name: 'string' } },
  srcset: { type: { name: 'string' } },
  sizes: { type: { name: 'string' } },
  alt: { type: { name: 'string' } },
  width: { type: { name: 'number' } },
  height: { type: { name: 'number' } },
  size: {
    options: ['small', 'medium', 'full'],
    type: { name: 'string' },
    control: { type: 'select' },
  },
  shape: {
    options: ['circle', 'square', 'squircle'],
    type: { name: 'string' },
    control: { type: 'select' },
  },
};
