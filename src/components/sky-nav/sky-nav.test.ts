import path from 'path';

import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { devices, getAccessibilityTree, withBrowser } from 'pleasantest';

import { loadGlobalCSS, loadTwigTemplate } from '../../../test-utils.js';

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
    // The rendered markup needs to be captured so we can pass it into the
    // `page.evaluate` function below
    const renderedMarkup = await skyNavMarkup({
      includeMainDemo: true,
      menu,
    });
    // Pleasantest uses `document.innerHTML` to inject the markup into the DOM,
    // but that means inline scripts are not executed.
    // @see https://github.com/cloudfour/pleasantest/issues/526
    //
    // > HTML5 specifies that a <script> tag inserted with innerHTML should not execute.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations
    //
    // This causes this test to fail because the Sky Nav template has an inline
    // script. To get around that, the code below uses `document.write` instead
    // which _will_ execute the inline script.
    //
    // Using `document.write` is discouraged. For the purposes of this test,
    // though, it is okay.
    // @see https://developer.mozilla.org/en-US/docs/Web/API/Document/write
    await page.evaluate((renderedMarkup) => {
      document.body.innerHTML = '';
      document.write(renderedMarkup);
    }, renderedMarkup);

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
          heading "Main Menu" (level=2)
            text "Main Menu"
          button "Toggle Main Menu" (expanded=false)
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
          heading "Main Menu" (level=2)
            text "Main Menu"
          button "Toggle Main Menu" (expanded=true) (focused)
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
          heading "Main Menu" (level=2)
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
