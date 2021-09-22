import errorPrototype from './example/404.twig';
import offlinePrototype from './example/offline.twig';
import './example/example.scss';

export default {
  title: 'Prototypes/Error Pages',
  parameters: {
    docs: { page: null },
    paddings: { disable: true },
  },
};

export const Error404 = () => errorPrototype({});

export const Offline = () => offlinePrototype({});
