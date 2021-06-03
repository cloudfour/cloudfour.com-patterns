import articleHeading from './example/example-a.twig';
import footerForm from './example/example-b.twig';
import './example/example.scss';

export default {
  title: 'Prototypes/Email Signup Form',
  parameters: {
    docs: { page: null },
    paddings: { disable: true },
  },
};

export const ArticleHeading = () => articleHeading({});

export const FooterForm = () => footerForm({});
