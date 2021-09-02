import path from 'path';
import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { withBrowser } from 'pleasantest';
import { loadTwigTemplate, loadGlobalCSS } from '../../../test-utils';

const buttonSwapMarkup = loadTwigTemplate(
  path.join(__dirname, './button-swap.twig')
);
// Helper to initialize the button swap JS
const initJS = (
  utils: PleasantestUtils,
  buttonSwapEl: ElementHandle,
  subscribeCallback?: () => void,
  unsubscribeCallback?: () => void
) =>
  utils.runJS(
    `
    import { initButtonSwap } from './button-swap'
    export default (buttonSwapEl, subscribeCallback, unsubscribeCallback) => {
      initButtonSwap(buttonSwapEl, {
        subscribeCallback,
        unsubscribeCallback
      })
    }
    `,
    [buttonSwapEl, subscribeCallback, unsubscribeCallback]
  );

test(
  'Initial state',
  withBrowser(async ({ utils, screen }) => {
    await utils.injectHTML(await buttonSwapMarkup());
    await loadGlobalCSS(utils);

    // Visually hidden text for a more inclusive UX
    const message = await screen.getByRole('status');
    await expect(message).toHaveTextContent(
      /^unsubscribed from notifications$/i
    );

    const messages = await screen.getAllByRole('status');
    expect(messages.length).toBe(1);

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
    await utils.injectHTML(await buttonSwapMarkup());
    await loadGlobalCSS(utils);
    // I'd like to avoid using a test ID, but I couldn't figure out a different way.
    // @todo Can this be done without at test ID?
    await initJS(utils, await screen.getByTestId('test-id'));

    let subscribeBtn = await screen.queryByRole('button', {
      name: /^get notifications$/i,
    });
    await expect(subscribeBtn).toHaveAttribute('aria-pressed', 'false');

    // Subscribe action
    await user.click(subscribeBtn);

    // Query for subscribe button again in its new state
    subscribeBtn = await screen.queryByRole('button', {
      name: /^get notifications$/i,
    });
    expect(subscribeBtn).toBeNull();

    let unsubscribeBtn = await screen.queryByRole('button', {
      name: /^turn off notifications$/i,
    });
    await expect(unsubscribeBtn).toBeVisible();
    await expect(unsubscribeBtn).toHaveAttribute('aria-pressed', 'true');

    // Visually hidden text for a more inclusive UX
    let statusMsg = await screen.getByRole('alert');
    await expect(statusMsg).toHaveTextContent(/^subscribed to notifications$/i);
    await expect(statusMsg).toHaveFocus();

    // Unsubscribe action
    await user.click(unsubscribeBtn);

    // Query for unsubscribe button again in its new state
    unsubscribeBtn = await screen.queryByRole('button', {
      name: /^turn off notifications$/i,
    });
    expect(unsubscribeBtn).toBeNull();

    // Query for subscribe button again in its new state
    subscribeBtn = await screen.queryByRole('button', {
      name: /^get notifications$/i,
    });
    await expect(subscribeBtn).toBeVisible();
    await expect(subscribeBtn).toHaveAttribute('aria-pressed', 'false');

    // Visually hidden text for a more inclusive UX
    statusMsg = await screen.getByRole('alert');
    await expect(statusMsg).toHaveTextContent(
      /^unsubscribed from notifications$/i
    );
    await expect(statusMsg).toHaveFocus();
  })
);

test(
  'Set custom messages and labels',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(
      await buttonSwapMarkup({
        get_notifications_label: 'Hello world',
        disable_notifications_label: 'Have a great day',
        unsubscribed_message: 'Unsubscribed',
        subscribed_message: 'Subscribed',
      })
    );
    await loadGlobalCSS(utils);
    // I'd like to avoid using a test ID, but I couldn't figure out a different way.
    // @todo Can this be done without at test ID?
    await initJS(utils, await screen.getByTestId('test-id'));

    // Visually hidden text for a more inclusive UX
    let message = await screen.getByRole('status');
    await expect(message).toHaveTextContent(/^unsubscribed$/i);

    const firstBtn = await screen.getByRole('button');
    await expect(firstBtn).toHaveTextContent(/^hello world$/i);

    await user.click(firstBtn);

    // Visually hidden text for a more inclusive UX
    message = await screen.getByRole('alert');
    await expect(message).toHaveTextContent(/^subscribed$/i);

    const secondBtn = await screen.queryByRole('button');
    await expect(secondBtn).toHaveTextContent(/have a great day/i);
  })
);

// @todo Unskip test once a new version of Pleasantest is released
test(
  'Callback functions are called',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(await buttonSwapMarkup());

    const mockSubscribeCallback = jest.fn();
    const mockUnsubscribeCallback = jest.fn();

    // I'd like to avoid using a test ID, but I couldn't figure out a different way.
    // @todo Can this be done without at test ID?
    await initJS(
      utils,
      await screen.getByTestId('test-id'),
      mockSubscribeCallback,
      mockUnsubscribeCallback
    );

    const subscribeBtn = await screen.queryByRole('button', {
      name: /^get notifications$/i,
    });
    await user.click(subscribeBtn);

    expect(mockSubscribeCallback).toBeCalledTimes(1);

    const unsubscribeBtn = await screen.queryByRole('button', {
      name: /^turn off notifications$/i,
    });
    await user.click(unsubscribeBtn);

    expect(mockUnsubscribeCallback).toBeCalledTimes(1);
  })
);
