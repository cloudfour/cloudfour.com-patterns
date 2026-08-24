/** @import { Meta, StoryObj } from '@storybook/html' */
import faviconApps from './demo/favicon-apps.twig';
import faviconTabs from './demo/favicon-tabs.twig';
import './demo/favicon-apps.scss';
import './demo/favicon-tabs.scss';

/** @type {Meta} */
const meta = {
  title: 'Design/Favicons',
};

export default meta;

/** @type {StoryObj} */
export const Favicons = {
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `<link rel="icon" href="path/to/favicon.ico" />
<link rel="icon" href="path/to/icon.svg" type="image/svg+xml" />`,
      },
    },
  },
  render: faviconTabs,
};

/** @type {StoryObj} */
export const FaviconsDev = {
  name: 'Favicons (Dev)',
  parameters: {
    layout: 'fullscreen',
    docs: {
      source: {
        code: `<link rel="icon" href="path/to/favicon-dev.ico" />
<link rel="icon" href="path/to/icon-dev.svg" type="image/svg+xml" />`,
      },
    },
  },
  render: () => faviconTabs({ dev: true }),
};

/** @type {StoryObj} */
export const Android = {
  parameters: {
    docs: {
      source: {
        code: `{
  "icons": [
    {
      "src": "path/to/icon-192.png",
      "type": "image/png",
      "sizes": "192x192",
      "purpose": "maskable",
    },
    {
      "src": "path/to/icon-512.png",
      "type": "image/png",
      "sizes": "512x512",
      "purpose": "maskable",
    },
  ]
}`,
      },
    },
  },
  render: faviconApps,
};

/** @type {StoryObj} */
export const Apple = {
  parameters: {
    docs: {
      source: {
        code: `<link rel="apple-touch-icon" href="path/to/apple-touch-icon.png">`,
      },
    },
  },
  render: () => faviconApps({ platform: 'apple' }),
};
