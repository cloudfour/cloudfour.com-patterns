import { expect, onTestFinished, test } from 'vitest';
import { page, userEvent } from 'vitest/browser';

import '../../../dist/standalone.css';

import menu from './demo/menu.json';
import { initSkyNav } from './sky-nav.js';
import template from './sky-nav.twig';

const body = () => page.elementLocator(document.body);

/**
 * Renders the nav and starts its script, tearing the instance down when the test
 * ends so its media query listeners do not outlive it.
 *
 * The viewport has to be set before this runs: the script reads the current
 * breakpoint as it initialises.
 */
const renderSkyNav = (navButtonName?: RegExp) => {
  document.body.innerHTML = template({ includeMainDemo: true, menu });

  const navButton = page
    .getByRole('button', { name: navButtonName, includeHidden: true })
    .element() as HTMLButtonElement;

  const { destroy } = initSkyNav(navButton);
  onTestFinished(destroy);

  return navButton;
};

test('can be opened on small screens', async () => {
  // Roughly an iPhone 6, which is the device Pleasantest emulated here.
  await page.viewport(375, 667);
  const navButton = renderSkyNav(/toggle main menu/i);

  // Initial state: menu is closed
  await expect.element(navButton).toHaveAttribute('aria-expanded', 'false');
  expect(page.getByRole('list').query()).toBeNull();
  await expect.element(body()).toMatchAriaInlineSnapshot(`
    - link "Skip to main content":
      - /url: "#main"
    - banner:
      - link "Home: Cloud Four":
        - /url: /
        - text: "Home: Cloud Four"
        - img
      - navigation "Main Menu":
        - heading "Main Menu" [level=2]
        - button "Toggle Main Menu"
  `);

  await userEvent.click(navButton);

  // After click: menu is open
  await expect.element(navButton).toHaveAttribute('aria-expanded', 'true');
  await expect.element(page.getByRole('list')).toBeVisible();
  // Focus stays on the toggle. ARIA snapshots do not record focus, so this is
  // asserted directly rather than read out of the tree below.
  await expect.element(navButton).toHaveFocus();
  await expect.element(body()).toMatchAriaInlineSnapshot(`
    - link "Skip to main content":
      - /url: "#main"
    - banner:
      - link "Home: Cloud Four":
        - /url: /
        - text: "Home: Cloud Four"
        - img
      - navigation "Main Menu":
        - heading "Main Menu" [level=2]
        - button "Toggle Main Menu" [expanded]
        - list:
          - listitem:
            - link "What We Do":
              - /url: /does
          - listitem:
            - link "Our Approach":
              - /url: /believes
          - listitem:
            - link "Our Work":
              - /url: /made
          - listitem:
            - link "Articles":
              - /url: /thinks
          - listitem:
            - link "Speaking":
              - /url: /presents
          - listitem:
            - link "Team":
              - /url: /is
          - listitem:
            - link "Hire Us":
              - /url: /and-you
  `);
});

test('is expanded on large screens', async () => {
  await page.viewport(800, 600);
  // The toggle button is hidden at this size, so it has to be searched for among
  // hidden elements.
  const navButton = renderSkyNav();

  // Initial state: list is visible, button is hidden
  await expect.element(navButton).not.toBeVisible();
  await expect.element(page.getByRole('list')).toBeVisible();
  await expect.element(body()).toMatchAriaInlineSnapshot(`
    - link "Skip to main content":
      - /url: "#main"
    - banner:
      - link "Home: Cloud Four":
        - /url: /
        - text: "Home: Cloud Four"
        - img
      - navigation "Main Menu":
        - heading "Main Menu" [level=2]
        - list:
          - listitem:
            - link "What We Do":
              - /url: /does
          - listitem:
            - link "Our Approach":
              - /url: /believes
          - listitem:
            - link "Our Work":
              - /url: /made
          - listitem:
            - link "Articles":
              - /url: /thinks
          - listitem:
            - link "Speaking":
              - /url: /presents
          - listitem:
            - link "Team":
              - /url: /is
          - listitem:
            - link "Hire Us":
              - /url: /and-you
  `);
});
