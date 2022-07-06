import groundNavMenu from '../../components/ground-nav/demo/menu.json';
import organization from '../../components/ground-nav/demo/organization.json';
import social from '../../components/ground-nav/demo/social.json';
import skyNavMenu from '../../components/sky-nav/demo/menu.json';
import { useSkyNav } from '../use-sky-nav.ts';
import './example/example.scss';

import singleArticlePrototype from './example/example.twig';

export default {
  title: 'Prototypes/Article Series',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Example = () => {
  useSkyNav();
  return singleArticlePrototype({
    skyNavMenu,
    menu: { items: [...skyNavMenu.items, ...groundNavMenu.items] },
    social,
    action: {
      lead_in: 'Let’s discuss your project!',
      title: 'Email us',
      link: 'mailto:info@cloudfour.com',
      icon: 'envelope',
    },
    organization: {
      name: organization.name,
      address: {
        street_address: organization.address.street_address,
        address_locality: organization.address.address_locality,
        address_region: organization.address.address_region,
        postal_code: organization.address.postal_code,
        address_country: organization.address.address_country,
      },
      email: organization.email,
      telephone: organization.telephone,
      url: organization.url,
      founding_date: organization.founding_date,
    },
  });
};
