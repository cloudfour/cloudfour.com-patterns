import r1Prototype from './r1.twig';
import r2Prototype from './r2.twig';
import r3Prototype from './r3.twig';
import './r1.scss';
import './r2.scss';
import './r3.scss';

export default {
  title: 'Prototypes/New Footer',
  parameters: {
    docs: { page: null },
    layout: 'fullscreen',
  },
};

export const r1 = () => r1Prototype({});

export const r2 = () =>
  r2Prototype({
    organization: {
      name: 'Cloud Four, Inc.',
      url: 'https://cloudfour.com/',
      address1: '510 SW 3rd Ave, Suite 420',
      address2: 'Portland, OR 97204 USA',
      phone: '+1 (503) 290-1090',
      email: 'info@cloudfour.com',
    },
    nav: [
      {
        title: 'What We Do',
      },
      {
        title: 'Our Approach',
      },
      {
        title: 'Our Work',
      },
      {
        title: 'Articles',
      },
      {
        title: 'Speaking',
      },
      {
        title: 'Team',
      },
      {
        title: 'Hire Us',
      },
    ],
    topics: [
      {
        title: 'Responsive Web Design',
      },
      {
        title: 'Ecommerce',
      },
      {
        title: 'Performance',
      },
      {
        title: 'Images',
      },
      {
        title: 'Accessibility',
      },
      {
        title: 'Cloud Four Spotlight',
      },
      {
        title: 'CSS',
      },
    ],
    social: [
      {
        icon: 'brands/linkedin',
      },
      {
        icon: 'brands/mastodon',
      },
      {
        icon: 'brands/youtube',
      },
      {
        icon: 'brands/instagram',
      },
      {
        icon: 'feed',
      },
    ],
  });

export const r3 = () =>
  r3Prototype({
    organization: {
      name: 'Cloud Four, Inc.',
      url: 'https://cloudfour.com/',
      address1: '510 SW 3rd Ave, Suite 420',
      address2: 'Portland, OR 97204 USA',
      phone: '+1 (503) 290-1090',
      email: 'info@cloudfour.com',
    },
    nav: [
      {
        title: 'What We Do',
      },
      {
        title: 'Our Approach',
      },
      {
        title: 'Our Work',
      },
      {
        title: 'Articles',
      },
      {
        title: 'Speaking',
      },
      {
        title: 'Team',
      },
      {
        title: 'Hire Us',
      },
    ],
    topics: [
      {
        title: 'Responsive Web Design',
      },
      {
        title: 'Ecommerce',
      },
      {
        title: 'Performance',
      },
      {
        title: 'Images',
      },
      {
        title: 'Accessibility',
      },
      {
        title: 'Cloud Four Spotlight',
      },
      {
        title: 'CSS',
      },
    ],
    social: [
      {
        icon: 'brands/linkedin',
      },
      // {
      //   icon: 'brands/mastodon',
      // },
      {
        icon: 'brands/youtube',
      },
      {
        icon: 'brands/instagram',
      },
      {
        icon: 'feed',
      },
    ],
  });
