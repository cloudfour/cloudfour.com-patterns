import path from 'path';

import type { ElementHandle, PleasantestUtils } from 'pleasantest';
import { withBrowser } from 'pleasantest';

import { loadGlobalCSS, loadTwigTemplate } from '../../../test-utils.js';

const textInputHTML = loadTwigTemplate(path.join(__dirname, './input.twig'));
const initTextareaJS = (utils: PleasantestUtils, textarea: ElementHandle) =>
  utils.runJS(
    `
    import { createElasticTextArea } from './elastic-textarea'
    export default (textarea) => createElasticTextArea(textarea);
    `,
    [textarea]
  );

test(
  'Resizes correctly with no rows attribute',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(
      await textInputHTML({
        class: 'c-input--elastic js-elastic-textarea',
        type: 'textarea',
      })
    );
    await loadGlobalCSS(utils);
    const textarea = await screen.getByRole('textbox');
    await initTextareaJS(utils, textarea);

    textarea.evaluate((el) => (el.style.maxWidth = '500px'));

    // Default of 2 rows
    await expect(textarea).toHaveAttribute('rows', '2');

    // This wraps, so both lines should be full now
    await user.type(
      textarea,
      'this is a very long sentence with a lot of words that make it wrap'
    );
    await expect(textarea).toHaveAttribute('rows', '2');

    // Enter is pressed, so now there should be 3 lines (this line doesn't wrap)
    await user.type(textarea, '{enter}this is a very long sentence with a lot');
    await expect(textarea).toHaveAttribute('rows', '3');

    // After emptying it out, it should have 2 rows, since that is the default
    await user.clear(textarea);
    await expect(textarea).toHaveAttribute('rows', '2');
  })
);

test(
  'Allows you to override the minimum number of rows',
  withBrowser(async ({ utils, screen, user }) => {
    await utils.injectHTML(
      await textInputHTML({
        class: 'c-input--elastic js-elastic-textarea',
        type: 'textarea',
        rows: 1,
      })
    );
    const textarea = await screen.getByRole('textbox');
    await initTextareaJS(utils, textarea);
    await textarea.evaluate((el) => (el.style.maxWidth = '500px'));

    // Starts at 1 row since we set rows attribute
    await expect(textarea).toHaveAttribute('rows', '1');

    await user.type(textarea, 'I have {enter}{enter}{enter} a long message');
    await expect(textarea).toHaveAttribute('rows', '4');

    // After emptying it out, it should have 1 row, since that is what we initialized `rows` to
    await user.clear(textarea);
    await expect(textarea).toHaveAttribute('rows', '1');
  })
);

test(
  'Should update to fit content when textarea is resized',
  withBrowser(async ({ utils, screen, page, waitFor }) => {
    await loadGlobalCSS(utils);
    await utils.injectHTML(
      await textInputHTML({
        class: 'js-elastic-textarea',
        type: 'textarea',
        value:
          'We are a small, versatile team who care passionately about the web. We’re full of what our industry considers unicorns. Our designers code. Our developers went to art school.',
      })
    );
    const textarea = await screen.getByRole('textbox');
    await initTextareaJS(utils, textarea);

    // First test the viewport changing size, start with a wide viewport
    await page.setViewport({ width: 800, height: 400 });
    // The text should wrap two lines
    await expect(textarea).toHaveAttribute('rows', '2');

    // Then size it down to a narrow viewport width
    await page.setViewport({ width: 250, height: 400 });
    // The textarea should resize forcing the text to wrap multiple lines
    await waitFor(() => expect(textarea).toHaveAttribute('rows', '6'));

    // Reset the viewport back to a larger size
    await page.setViewport({ width: 800, height: 400 });
    // The textarea should go back to only 2 lines
    await waitFor(() => expect(textarea).toHaveAttribute('rows', '2'));

    // Now validate it works when the width of the textarea itself changes
    // Change the width of the textarea directly
    await textarea.evaluate((el) => (el.style.width = '250px'));
    // This should resize the textarea forcing multiple lines of text
    await waitFor(() => expect(textarea).toHaveAttribute('rows', '7'));

    // Reset back to larger size
    await textarea.evaluate((el) => (el.style.width = '800px'));
    // Should go back to two lines of text
    await waitFor(() => expect(textarea).toHaveAttribute('rows', '2'));
  })
);
