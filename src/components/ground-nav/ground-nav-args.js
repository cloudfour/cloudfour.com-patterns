// eslint-disable-next-line @cloudfour/import/order
import skyNavMenu from '../sky-nav/demo/menu.json';
import groundNavMenu from './demo/menu.json';
import organization from './demo/organization.json';
import social from './demo/social.json';
import topics from './demo/topics.json';
const menu = { items: [...skyNavMenu.items, ...groundNavMenu.items] };

/**
 * Default args for Ground Nav stories
 *
 * Currently storybook doesn't have support for nested or grouped args.
 * @see https://github.com/storybookjs/storybook/issues/11525
 * @see https://github.com/storybookjs/storybook/issues/10979
 */
export const defaultArgs = {
  buttonLeadIn: 'Let’s discuss your project!',
  buttonTitle: 'Email us',
  buttonLink: 'mailto:info@cloudfour.com',
  buttonIcon: 'envelope',
  organizationName: organization.name,
  organizationStreetAddress: organization.address.street_address,
  organizationAddressLocality: organization.address.address_locality,
  organizationAddressRegion: organization.address.address_region,
  organizationPostalCode: organization.address.postal_code,
  organizationAddressCountry: organization.address.address_country,
  organizationEmail: organization.email,
  organizationTelephone: organization.telephone,
  organizationUrl: organization.url,
  organizationFoundingDate: organization.founding_date,
};

/**
 * Storybook arg types for the defaultArgs
 */
export const defaultArgTypes = {
  buttonLeadIn: { type: { name: 'string', required: false } },
  buttonTitle: { type: { name: 'string', required: false } },
  buttonLink: { type: { name: 'string', required: false } },
  buttonIcon: { type: { name: 'string', required: false } },
  organizationName: { type: { name: 'string' } },
  organizationStreetAddress: { type: { name: 'string' } },
  organizationAddressLocality: { type: { name: 'string' } },
  organizationAddressRegion: { type: { name: 'string' } },
  organizationPostalCode: { type: { name: 'string' } },
  organizationAddressCountry: { type: { name: 'string' } },
  organizationEmail: { type: { name: 'string' } },
  organizationTelephone: { type: { name: 'string' } },
  organizationUrl: { type: { name: 'string' } },
  organizationFoundingDate: { type: { name: 'string' } },
};

/**
 * Generate Ground Nav Template Props
 *
 * Takes the flat args object and structures it as the template expects.
 *
 * @param {defaultArgs} args
 */
export const generateGroundNavProps = (args) => ({
  menu,
  social,
  topics,
  action:
    args.buttonLeadIn && args.buttonTitle && args.buttonLink && args.buttonIcon
      ? {
          lead_in: args.buttonLeadIn,
          title: args.buttonTitle,
          link: args.buttonLink,
          icon: args.buttonIcon,
        }
      : null,
  organization: {
    name: args.organizationName,
    address: {
      street_address: args.organizationStreetAddress,
      address_locality: args.organizationAddressLocality,
      address_region: args.organizationAddressRegion,
      postal_code: args.organizationPostalCode,
      address_country: args.organizationAddressCountry,
    },
    email: args.organizationEmail,
    telephone: args.organizationTelephone,
    url: args.organizationUrl,
    founding_date: args.organizationFoundingDate,
  },
});
