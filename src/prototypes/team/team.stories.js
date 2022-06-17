import { useSkyNav } from '../use-sky-nav.ts';

import avatars from './data/avatars.json';
import teamArticlePage2 from './example/team-articles-page2.twig';
import teamIndividualPrototype from './example/team-individual.twig';
import teamListPrototype from './example/team-list.twig';

import './example/team-individual.scss';

export default {
  title: 'Prototypes/Team Page',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const List = () => {
  useSkyNav();
  return teamListPrototype({
    avatars,
  });
};

export const IndividualBio = () => {
  useSkyNav();
  return teamIndividualPrototype({
    avatars,
  });
};

export const ArticlesPage2 = () => {
  useSkyNav();
  return teamArticlePage2({});
};
