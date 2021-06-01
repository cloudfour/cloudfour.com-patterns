import path from 'path';
import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { devices, withBrowser } from 'pleasantest';
import { loadTwigTemplate } from '../../../test-utils';
import menu from './demo/menu.json';

const iPhone = devices['iPhone 6'];
const skyNavMarkup = loadTwigTemplate(path.join(__dirname, './sky-nav.twig'));
const initSkyNavJS = (utils: PleasantestUtils, navButton: ElementHandle) =>
  utils.runJS(
    `
    import { initSkyNav } from './sky-nav'
    export default (navButton) => initSkyNav(navButton)
    `,
    [navButton]
  );

test(
  'can be opened on small screens',
  withBrowser({ device: iPhone }, async ({ utils, screen, user }) => {
    await utils.injectHTML(await skyNavMarkup({ includeMainDemo: true, menu }));
    await utils.loadCSS('../../../dist/standalone.css');
    const navButton = await screen.getByRole('button', {
      name: /toggle main menu/i,
    });
    await initSkyNavJS(utils, navButton);

    // Initial state: menu is closed
    await expect(navButton).toHaveAttribute('aria-expanded', 'false');
    expect(await screen.queryByRole('list')).toBeNull();

    await user.click(navButton);

    // After click: menu is open
    await expect(navButton).toHaveAttribute('aria-expanded', 'true');
    await expect(await screen.queryByRole('list')).toBeVisible();
  })
);

test(
  'is expanded on large screens',
  withBrowser(async ({ utils, screen }) => {
    await utils.injectHTML(await skyNavMarkup({ includeMainDemo: true, menu }));
    await utils.loadCSS('../../../dist/standalone.css');
    // Hidden: true allows searching hidden elements (button is hidden on large screens)
    const navButton = await screen.getByRole('button', { hidden: true });
    await initSkyNavJS(utils, navButton);

    // Initial state: list is visible, button is hidden
    expect(navButton).not.toBeVisible();
    await expect(await screen.queryByRole('list')).toBeVisible();
  })
);
