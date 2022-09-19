import taglineA from './tagline-a.twig';

export default {
  title: 'Prototypes/Home',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const NewTaglineA = () => taglineA({});
