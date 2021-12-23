import path from 'path';
import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { getAccessibilityTree, devices, withBrowser } from 'pleasantest';
import { loadTwigTemplate, loadGlobalCSS } from '../../../test-utils';
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
  withBrowser({ device: iPhone }, async ({ utils, screen, user, page }) => {
    await utils.injectHTML(await skyNavMarkup({ includeMainDemo: true, menu }));
    await loadGlobalCSS(utils);
    const navButton = await screen.getByRole('button', {
      name: /toggle main menu/i,
    });
    await initSkyNavJS(utils, navButton);

    // Initial state: menu is closed
    await expect(navButton).toHaveAttribute('aria-expanded', 'false');
    expect(await screen.queryByRole('list')).toBeNull();
    const body = await page.evaluateHandle<ElementHandle>(() => document.body);
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      link "Skip to main content"
        text "Skip to main content"
      banner
        link "Home: Cloud Four"
          text "Home: Cloud Four"
        navigation "Main Menu"
          heading "Main Menu"
            text "Main Menu"
          button "Toggle Main Menu"
    `);

    await user.click(navButton);

    // After click: menu is open
    await expect(navButton).toHaveAttribute('aria-expanded', 'true');
    await expect(await screen.queryByRole('list')).toBeVisible();
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      link "Skip to main content"
        text "Skip to main content"
      banner
        link "Home: Cloud Four"
          text "Home: Cloud Four"
        navigation "Main Menu"
          heading "Main Menu"
            text "Main Menu"
          button "Toggle Main Menu" (focused)
          list
            listitem
              link "What We Do"
                text "What We Do"
            listitem
              link "Our Approach"
                text "Our Approach"
            listitem
              link "Our Work"
                text "Our Work"
            listitem
              link "Articles"
                text "Articles"
            listitem
              link "Speaking"
                text "Speaking"
            listitem
              link "Labs"
                text "Labs"
            listitem
              link "Team"
                text "Team"
    `);
  })
);

test(
  'is expanded on large screens',
  withBrowser(async ({ utils, screen, page }) => {
    await utils.injectHTML(await skyNavMarkup({ includeMainDemo: true, menu }));
    await loadGlobalCSS(utils);
    // Hidden: true allows searching hidden elements (button is hidden on large screens)
    const navButton = await screen.getByRole('button', { hidden: true });
    await initSkyNavJS(utils, navButton);

    // Initial state: list is visible, button is hidden
    expect(navButton).not.toBeVisible();
    await expect(await screen.queryByRole('list')).toBeVisible();
    const body = await page.evaluateHandle<ElementHandle>(() => document.body);
    expect(await getAccessibilityTree(body)).toMatchInlineSnapshot(`
      link "Skip to main content"
        text "Skip to main content"
      banner
        link "Home: Cloud Four"
          text "Home: Cloud Four"
        navigation "Main Menu"
          heading "Main Menu"
            text "Main Menu"
          list
            listitem
              link "What We Do"
                text "What We Do"
            listitem
              link "Our Approach"
                text "Our Approach"
            listitem
              link "Our Work"
                text "Our Work"
            listitem
              link "Articles"
                text "Articles"
            listitem
              link "Speaking"
                text "Speaking"
            listitem
              link "Labs"
                text "Labs"
            listitem
              link "Team"
                text "Team"
    `);
  })
);
