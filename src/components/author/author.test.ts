import path from 'path';
import { withBrowser } from 'pleasantest';
import { loadTwigTemplate } from '../../../test-utils';

/** Helper to load the Twig template file */
const template = loadTwigTemplate(path.join(__dirname, './author.twig'));

describe('Author', () => {
  test(
    'more accessible experience for publish date',
    withBrowser(async ({ utils, screen }) => {
      await utils.injectHTML(
        await template({
          // The avatar is not included because I couldn't figure out how
          // to include it. For the purposes of this test, though, it is
          // not important so I left it out.
          authors: [
            {
              name: 'Shakira Isabel Mebarak Ripoll',
              link: 'https://www.shakira.com/',
            },
          ],
          date: new Date('March 31, 2021'),
          date_prefix: 'Presented on',
        })
      );

      // Confirm a more accessible user experience
      await screen.getByText('Presented on March 31st, 2021');
    })
  );

  test(
    'meta is prioritized over date',
    withBrowser(async ({ utils, screen }) => {
      await utils.injectHTML(
        await template({
          // The avatar is not included because I couldn't figure out how
          // to include it. For the purposes of this test, though, it is
          // not important so I left it out.
          authors: [
            {
              name: 'Shakira Isabel Mebarak Ripoll',
              link: 'https://www.shakira.com/',
            },
          ],
          date: new Date('March 31, 2021'),
          meta: 'Singer and songwriter',
        })
      );

      // Confirm the meta value is rendered
      await screen.getByText('Singer and songwriter');

      // Confirm the date is not rendered
      const publishDate = await screen.queryByText(
        'Published on March 31st, 2021'
      );
      expect(publishDate).toBeNull();
    })
  );
});
