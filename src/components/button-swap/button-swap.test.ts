import path from 'path';
import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { withBrowser } from 'pleasantest';
import { loadTwigTemplate, loadGlobalCSS } from '../../../test-utils';

const buttonSwapMarkup = loadTwigTemplate(
  path.join(__dirname, './button-swap.twig')
);
// Helper to test the JS-driven toggling button
const initJS = (utils: PleasantestUtils, buttonSwapEl: ElementHandle, opts) =>
  utils.runJS(
    `
    import { initButtonSwap } from './button-swap'
    export default (buttonSwapEl, opts) => initButtonSwap(buttonSwapEl, opts)
    `,
    [buttonSwapEl, opts]
  );

test(
  'initial state',
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
  'swap UI state when clicked',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(await buttonSwapMarkup());
    await loadGlobalCSS(utils);

    const mockSubscribeCallback = jest.fn();
    const mockUnsubscribeCallback = jest.fn();

    // I'd like to avoid using a test ID, but I couldn't figure out a different way.
    // @todo Can this be done without at test ID?
    await initJS(utils, await screen.getByTestId('test-id'), {
      subscribeCallback: mockSubscribeCallback,
      unsubscribeCallback: mockUnsubscribeCallback,
    });

    let subscribeBtn = await screen.queryByRole('button', {
      name: /^get notifications$/i,
    });

    await user.click(subscribeBtn);

    subscribeBtn = await screen.queryByRole('button', {
      name: /^get notifications$/i,
    });
    expect(subscribeBtn).toBeNull();
    await expect(
      await screen.getByText(/^unsubscribed from notifications$/i)
    ).not.toBeVisible();
    expect(
      await screen.getByRole('button', {
        name: /^turn off notifications$/i,
      })
    ).toBeVisible();
    // Visually hidden text should not be accessible
    await expect(
      await screen.getByText(/^subscribed to notifications$/i)
    ).toBeVisible();

    let unsubscribeBtn = await screen.queryByRole('button', {
      name: /^turn off notifications$/i,
    });
    await user.click(unsubscribeBtn);

    unsubscribeBtn = await screen.queryByRole('button', {
      name: /^turn off notifications$/i,
    });
    expect(unsubscribeBtn).toBeNull();
    await expect(
      await screen.getByText(/^subscribed to notifications$/i)
    ).not.toBeVisible();

    expect(
      await screen.getByRole('button', {
        name: /^get notifications$/i,
      })
    ).toBeVisible();
    // Visually hidden text should not be accessible
    await expect(
      await screen.getByText(/^unsubscribed from notifications$/i)
    ).toBeVisible();
  })
);

test(
  'callback functions are called',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(await buttonSwapMarkup());

    const mockSubscribeCallback = jest.fn();
    const mockUnsubscribeCallback = jest.fn();

    // I'd like to avoid using a test ID, but I couldn't figure out a different way.
    // @todo Can this be done without at test ID?
    await initJS(utils, await screen.getByTestId('test-id'), {
      subscribeCallback: mockSubscribeCallback,
      unsubscribeCallback: mockUnsubscribeCallback,
    });

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
