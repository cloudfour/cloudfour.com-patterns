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
  alternate: false,
  feature_count: 2,
  feature_one_title: 'Nice to meet you',
  feature_one_content:
    'Cloud Four helps organizations solve complex responsive web design and development challenges every day. Let’s connect so we can tailor a solution to fit your needs.',
  feature_two_title: 'Cloud Four, in your inbox',
  feature_two_content:
    'Our latest articles, updates, quick tips and insights in one convenient, occassional newsletter.',
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
  alternate: { control: { type: 'boolean' } },
  feature_count: { control: { type: 'number', min: 0, max: 2 } },
  feature_one_title: { type: { name: 'string' } },
  feature_one_content: { type: { name: 'string' } },
  feature_two_title: { type: { name: 'string' } },
  feature_two_content: { type: { name: 'string' } },
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
  alternate: args.alternate,
  feature_count: args.feature_count,
  feature_one_title: args.feature_one_title,
  feature_one_content: args.feature_one_content,
  feature_two_title: args.feature_two_title,
  feature_two_content: args.feature_two_content,
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
