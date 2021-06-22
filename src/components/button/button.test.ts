import path from 'path';
import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { withBrowser } from 'pleasantest';
import { loadTwigTemplate } from '../../../test-utils';

const buttonMarkup = loadTwigTemplate(path.join(__dirname, './button.twig'));
// Helper to test the JS-driven toggling button
const initTogglingButtonJS = (
  utils: PleasantestUtils,
  togglingButton: ElementHandle
) =>
  utils.runJS(
    `
    import { initTogglingButton } from './toggling-button'
    export default (togglingButton) => initTogglingButton(togglingButton)
    `,
    [togglingButton]
  );

test(
  'should render a button element by default',
  withBrowser(async ({ utils, screen }) => {
    await utils.injectHTML(await buttonMarkup());

    const button = await screen.getByRole('button');
    await expect(button).toHaveTextContent(/^hello world$/i);
  })
);

test(
  'should render an anchor element when href is provided',
  withBrowser(async ({ utils, screen }) => {
    await utils.injectHTML(await buttonMarkup({ href: '#' }));

    const linkButton = await screen.getByRole('link');
    await expect(linkButton).toHaveTextContent(/^hello world$/i);
  })
);

test(
  'should render a button when aria_pressed is set',
  withBrowser(async ({ utils, screen }) => {
    await utils.injectHTML(
      // The `aria_pressed` value should override the `tag_name` value and always
      // render a button element. This test verifies that expecation.
      await buttonMarkup({
        tag_name: 'a',
        aria_pressed: 'false',
        label: 'I am a button',
      })
    );

    const button = await screen.getByRole('button');
    await expect(button).toHaveTextContent(/^i am a button$/i);
  })
);

test(
  'should toggle aria-pressed state',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(await buttonMarkup({ aria_pressed: 'false' }));

    const togglingButton = await screen.getByRole('button');
    await initTogglingButtonJS(utils, togglingButton);

    await expect(togglingButton).toHaveAttribute('aria-pressed', 'false');

    await user.click(togglingButton);
    await expect(togglingButton).toHaveAttribute('aria-pressed', 'true');

    await user.click(togglingButton);
    await expect(togglingButton).toHaveAttribute('aria-pressed', 'false');
  })
);
