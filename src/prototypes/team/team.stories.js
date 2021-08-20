import teamListPrototype from './example/team-list.twig';
import teamIndividualPrototype from './example/team-individual.twig';
import teamArticlePage2 from './example/team-articles-page2.twig';
import avatars from './data/avatars.json';
import './example/team-individual.scss';

export default {
  title: 'Prototypes/Team Page',
  parameters: {
    docs: { page: null },
    paddings: { disable: true },
  },
};

export const List = () =>
  teamListPrototype({
    avatars,
  });

export const IndividualBio = () =>
  teamIndividualPrototype({
    avatars,
  });

export const ArticlesPage2 = () => teamArticlePage2({});
