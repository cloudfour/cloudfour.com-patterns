import path from 'path';
import type { PleasantestUtils } from 'pleasantest';
import { withBrowser } from 'pleasantest';
import { loadTwigTemplate, loadGlobalCSS } from '../../../test-utils';

// Helper to load the Twig template file
const componentMarkup = loadTwigTemplate(
  path.join(__dirname, './button-swap.twig')
);

// Helper to initialize the component JS
const initJS = (
  utils: PleasantestUtils,
  initialCallback?: () => void,
  swappedCallback?: () => void
) =>
  utils.runJS(
    `
    import { initButtonSwap } from './button-swap'
    export default (initialCallback, swappedCallback) => {
      initButtonSwap(document.querySelector('.js-button-swap'), {
        initialCallback,
        swappedCallback
      })
    }
    `,
    [initialCallback, swappedCallback]
  );

test(
  'Initial state',
  withBrowser(async ({ utils, screen }) => {
    await utils.injectHTML(await componentMarkup());
    await loadGlobalCSS(utils);

    // Visually hidden text for a more inclusive UX
    const statusMsg = await screen.getByRole('status');
    await expect(statusMsg).toHaveTextContent(
      /^currently unsubscribed from notifications$/i
    );

    const statusMsgs = await screen.getAllByRole('status');
    expect(statusMsgs.length).toBe(1);

    const firstBtn = await screen.getByRole('button', {
      name: /^get notifications$/i,
    });
    await expect(firstBtn).toBeVisible();

    const secondBtn = await screen.queryByRole('button', {
      name: /^turn off notifications$/i,
    });
    expect(secondBtn).toBeNull();
  })
);

test(
  'Swap UI state when clicked',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(await componentMarkup());
    await loadGlobalCSS(utils);
    await initJS(utils);

    let firstBtn = await screen.queryByRole('button', {
      name: /^get notifications$/i,
    });
    await expect(firstBtn).not.toHaveClass('is-slashed');

    // Button swap action
    await user.click(firstBtn);

    // Visually hidden text for a more inclusive UX
    let statusMsg = await screen.getByRole('alert');
    await expect(statusMsg).toHaveTextContent(
      /^currently subscribed to notifications$/i
    );
    await expect(statusMsg).toHaveFocus();

    // Query for first button again in its new state
    firstBtn = await screen.queryByRole('button', {
      name: /^get notifications$/i,
    });
    expect(firstBtn).toBeNull();

    let secondBtn = await screen.queryByRole('button', {
      name: /^turn off notifications$/i,
    });
    await expect(secondBtn).toBeVisible();
    await expect(secondBtn).toHaveClass('is-slashed');

    // Button swap action
    await user.click(secondBtn);

    // Visually hidden text for a more inclusive UX
    statusMsg = await screen.getByRole('alert');
    await expect(statusMsg).toHaveTextContent(
      /^currently unsubscribed from notifications$/i
    );
    await expect(statusMsg).toHaveFocus();

    // Query for second button again in its new state
    secondBtn = await screen.queryByRole('button', {
      name: /^turn off notifications$/i,
    });
    expect(secondBtn).toBeNull();

    // Query for first button again in its new state
    firstBtn = await screen.queryByRole('button', {
      name: /^get notifications$/i,
    });
    await expect(firstBtn).toBeVisible();
    await expect(firstBtn).not.toHaveClass('is-slashed');
  })
);

test(
  'Set custom messages and labels',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(
      await componentMarkup({
        initial_visual_label: 'Hello world',
        swapped_visual_label: 'Have a great day',
        initial_label: 'Unsubscribed',
        swapped_label: 'Subscribed',
      })
    );
    await loadGlobalCSS(utils);
    await initJS(utils);

    // Visually hidden text for a more inclusive UX
    let statusMsg = await screen.getByRole('status');
    await expect(statusMsg).toHaveTextContent('Unsubscribed');

    const firstBtn = await screen.getByRole('button');
    await expect(firstBtn).toHaveTextContent('Hello world');

    // Button swap action
    await user.click(firstBtn);

    // Visually hidden text for a more inclusive UX
    statusMsg = await screen.getByRole('alert');
    await expect(statusMsg).toHaveTextContent('Subscribed');

    const secondBtn = await screen.queryByRole('button');
    await expect(secondBtn).toHaveTextContent('Have a great day');
  })
);

test(
  'Callback functions are called',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(await componentMarkup());

    const mockInitialCallback = jest.fn();
    const mockSwappedCallback = jest.fn();

    await initJS(utils, mockInitialCallback, mockSwappedCallback);

    const firstBtn = await screen.queryByRole('button', {
      name: /^get notifications$/i,
    });

    await user.click(firstBtn);

    expect(mockInitialCallback).toBeCalledTimes(1);

    const secondBtn = await screen.queryByRole('button', {
      name: /^turn off notifications$/i,
    });

    await user.click(secondBtn);

    expect(mockSwappedCallback).toBeCalledTimes(1);
  })
);
