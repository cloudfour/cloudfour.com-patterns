import path from 'path';
import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { withBrowser } from 'pleasantest';
import { loadTwigTemplate } from '../../../test-utils';

const buttonSwapMarkup = loadTwigTemplate(
  path.join(__dirname, './button-swap.twig')
);
// Helper to test the JS-driven toggling button
const initButtonSwap = (utils: PleasantestUtils, buttonSwapEl: ElementHandle) =>
  utils.runJS(
    `
    import { initButtonSwap } from './button-swap'
    export default (buttonSwapEl) => initButtonSwap(buttonSwapEl)
    `,
    [buttonSwapEl]
  );

test(
  'initial setup',
  withBrowser(async ({ utils, screen }) => {
    await utils.injectHTML(await buttonSwapMarkup());

    const subscribeBtn = await screen.getByRole('button', {
      name: /get notifications/i,
    });
    const unsubscribeBtn = await screen.getByRole('button', {
      name: /turn off notifications/i,
    });

    await expect(subscribeBtn).toBeInTheDocument();
    await expect(unsubscribeBtn).not.toBeInTheDocument();
  })
);

// test(
//   'should render an anchor element when href is provided',
//   withBrowser(async ({ utils, screen }) => {
//     await utils.injectHTML(await buttonSwapMarkup({ href: '#' }));

//     const linkButton = await screen.getByRole('link');
//     await expect(linkButton).toHaveTextContent(/^hello world$/i);
//   })
// );

// test(
//   'should render a button when aria_pressed is set',
//   withBrowser(async ({ utils, screen }) => {
//     await utils.injectHTML(
//       // The `aria_pressed` value should override the `tag_name` value and always
//       // render a button element. This test verifies that expecation.
//       await buttonSwapMarkup({
//         tag_name: 'a',
//         aria_pressed: 'false',
//         label: 'I am a button',
//       })
//     );

//     const button = await screen.getByRole('button');
//     await expect(button).toHaveTextContent(/^i am a button$/i);
//   })
// );

// test(
//   'should toggle aria-pressed state',
//   withBrowser(async ({ utils, screen, user }) => {
//     await utils.injectHTML(await buttonSwapMarkup({ aria_pressed: 'false' }));

//     const togglingButton = await screen.getByRole('button');
//     await initButtonSwap(utils, togglingButton);

//     await expect(togglingButton).toHaveAttribute('aria-pressed', 'false');

//     await user.click(togglingButton);
//     await expect(togglingButton).toHaveAttribute('aria-pressed', 'true');

//     await user.click(togglingButton);
//     await expect(togglingButton).toHaveAttribute('aria-pressed', 'false');
//   })
// );
