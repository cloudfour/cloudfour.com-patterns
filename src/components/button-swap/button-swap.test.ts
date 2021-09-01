import path from 'path';
import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { withBrowser } from 'pleasantest';
import { loadTwigTemplate, loadGlobalCSS } from '../../../test-utils';

const buttonSwapMarkup = loadTwigTemplate(
  path.join(__dirname, './button-swap.twig')
);
// Helper to test the JS-driven toggling button
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

    await expect(
      await screen.getByRole('button', {
        name: /^get notifications$/i,
      })
    ).toBeVisible();
    // Ensure visually hidden text is accessible
    await expect(
      await screen.getByText(/^unsubscribed from notifications$/i)
    ).toBeVisible();

    expect(
      await screen.queryByRole('button', {
        name: /^turn off notifications$/i,
      })
    ).toBeNull();
    // Visually hidden text should not be accessible
    await expect(
      await screen.getByText(/^subscribed to notifications$/i)
    ).not.toBeVisible();
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

    const subscribeBtn = await screen.getByRole('button', {
      name: /^hello world$/i,
    });
    await expect(subscribeBtn).toBeVisible();
    // Ensure visually hidden text is accessible
    await expect(await screen.getByText(/^unsubscribed$/i)).toBeVisible();

    // Subscribe action
    await user.click(subscribeBtn);

    const unsubscribeBtn = await screen.queryByRole('button', {
      name: /^have a great day$/i,
    });
    await expect(unsubscribeBtn).toBeVisible();
    // Ensure visually hidden text is accessible
    await expect(await screen.getByText(/^subscribed$/i)).toBeVisible();
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
    expect(subscribeBtn).toHaveAttribute('aria-pressed', 'false');

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
    expect(unsubscribeBtn).toBeVisible();
    expect(unsubscribeBtn).toHaveAttribute('aria-pressed', 'true');

    await expect(
      await screen.getByText(/^unsubscribed from notifications$/i)
    ).not.toBeVisible();
    await expect(
      await screen.getByText(/^subscribed to notifications$/i)
    ).toBeVisible();

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
    expect(subscribeBtn).toBeVisible();
    expect(subscribeBtn).toHaveAttribute('aria-pressed', 'false');

    await expect(
      await screen.getByText(/^subscribed to notifications$/i)
    ).not.toBeVisible();
    await expect(
      await screen.getByText(/^unsubscribed from notifications$/i)
    ).toBeVisible();
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
