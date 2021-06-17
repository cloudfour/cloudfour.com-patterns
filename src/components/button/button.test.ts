import path from 'path';
import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { withBrowser } from 'pleasantest';
import { loadTwigTemplate } from '../../../test-utils';

const buttonMarkup = loadTwigTemplate(path.join(__dirname, './button.twig'));
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
    // If I don't pass _something_ to buttonMarkup(), I get an error.
    // To get around that, I pass an empty object.
    await utils.injectHTML(await buttonMarkup({}));

    const button = await screen.getByRole('button');
    await expect(button).toBeVisible();
  })
);

test(
  'should render an anchor element when href is provided',
  withBrowser(async ({ utils, screen }) => {
    await utils.injectHTML(await buttonMarkup({ href: '#' }));

    const linkButton = await screen.getByRole('link');
    await expect(linkButton).toBeVisible();
  })
);

test(
  'should be a button when aria_pressed is set',
  withBrowser(async ({ utils, screen }) => {
    await utils.injectHTML(
      await buttonMarkup({ tag_name: 'a', aria_pressed: 'false' })
    );

    const button = await screen.getByRole('button');
    await expect(button).toBeVisible();
  })
);

test(
  'should toggle aria-pressed state',
  withBrowser(async ({ utils, screen }) => {
    await utils.injectHTML(await buttonMarkup({ aria_pressed: 'false' }));
    // await utils.loadCSS('../../../dist/standalone.css');

    const togglingButton = await screen.getByRole('button');
    await initTogglingButtonJS(utils, togglingButton);

    await expect(togglingButton).toBeVisible();
  })
);
