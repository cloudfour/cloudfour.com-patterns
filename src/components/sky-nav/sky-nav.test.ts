import path from 'path';
import { devices, withBrowser } from 'test-mule';
import { loadTwigTemplate } from '../../../test-utils';
import menu from './demo/menu.json';
const iPhone = devices['iPhone 6'];
const skyNavMarkup = loadTwigTemplate(path.join(__dirname, './sky-nav.twig'));

test(
  'can be opened on small screens',
  withBrowser({ device: iPhone }, async ({ utils, screen, user }) => {
    await utils.injectHTML(await skyNavMarkup({ includeMainDemo: true, menu }));
    await utils.loadCSS('../../../dist/standalone.css');
    const navButton = await screen.getByRole('button', {
      name: /toggle main menu/i,
    });
    await utils.runJS(
      `
      import { initSkyNav } from './sky-nav'
      export default (navButton) => initSkyNav(navButton)
      `,
      [navButton]
    );

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
    const navButton = await screen.getByRole('button', {
      hidden: true, // Allow searching hidden elements (button is hidden on large screens)
    });
    await utils.runJS(
      `
      import { initSkyNav } from './sky-nav'
      export default (navButton) => initSkyNav(navButton)
      `,
      [navButton]
    );

    // Initial state: list is visible, button is hidden
    expect(navButton).not.toBeVisible();
    await expect(await screen.queryByRole('list')).toBeVisible();
  })
);
