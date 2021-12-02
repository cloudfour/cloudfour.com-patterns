import path from 'path';
import { withBrowser } from 'pleasantest';
import { loadTwigTemplate } from '../../../test-utils';

/** Helper to load the Twig template file */
const template = loadTwigTemplate(path.join(__dirname, './author.twig'));

describe('Author', () => {
  test(
    'single author with a date',
    withBrowser(async ({ utils, screen }) => {
      await utils.injectHTML(
        await template({
          // The avatars are not included because I couldn't figure out how
          // to include them. For the purposes of these tests, though, it's
          // not important so I left them out.
          authors: [
            {
              name: 'Megan Notarte',
              link: 'https://cloudfour.com/is/megnotarte',
              job_title: 'Partner, Vice President',
            },
          ],
          date: new Date('March 31, 2021'),
        })
      );

      // The date should render
      const publishDate = await screen.queryByText(
        /published\son\s\w*\s\d{1,2}\D*,\s\d{2,4}/i
      );
      expect(publishDate).not.toBeNull();

      // The job title should not render when a date is provided
      const jobTitle = await screen.queryByText('Partner, Vice President');
      expect(jobTitle).toBeNull();
    })
  );

  test(
    'single author without a date',
    withBrowser(async ({ utils, screen }) => {
      await utils.injectHTML(
        await template({
          // The avatars are not included because I couldn't figure out how
          // to include them. For the purposes of these tests, though, it's
          // not important so I left them out.
          authors: [
            {
              name: 'Megan Notarte',
              link: 'https://cloudfour.com/is/megnotarte',
              job_title: 'Partner, Vice President',
            },
          ],
        })
      );

      // The date should not render
      const publishDate = await screen.queryByText(
        /published\son\s\w*\s\d{1,2}\D*,\s\d{2,4}/i
      );
      expect(publishDate).toBeNull();

      // The job title should render when a date is not provided
      const jobTitle = await screen.queryByText('Partner, Vice President');
      expect(jobTitle).not.toBeNull();
    })
  );

  test(
    'multiple authors with a date',
    withBrowser(async ({ utils, screen }) => {
      await utils.injectHTML(
        await template({
          // The avatars are not included because I couldn't figure out how
          // to include them. For the purposes of these tests, though, it's
          // not important so I left them out.
          authors: [
            {
              name: 'Megan Notarte',
              link: 'https://cloudfour.com/is/megnotarte',
              job_title: 'Partner, Vice President',
            },
            {
              name: 'Tyler Sticka',
              link: 'https://cloudfour.com/is/tyler',
              job_title: 'Partner, Vice President',
            },
          ],
          date: new Date('March 31, 2021'),
        })
      );

      // The date should render
      const publishDate = await screen.queryByText(
        /published\son\s\w*\s\d{1,2}\D*,\s\d{2,4}/i
      );
      expect(publishDate).not.toBeNull();

      // The job title should not render when multiple authors are provided
      const jobTitle = await screen.queryByText('Partner, Vice President');
      expect(jobTitle).toBeNull();
    })
  );

  test(
    'multiple authors without a date',
    withBrowser(async ({ utils, screen }) => {
      await utils.injectHTML(
        await template({
          // The avatars are not included because I couldn't figure out how
          // to include them. For the purposes of these tests, though, it's
          // not important so I left them out.
          authors: [
            {
              name: 'Megan Notarte',
              link: 'https://cloudfour.com/is/megnotarte',
              job_title: 'Partner, Vice President',
            },
            {
              name: 'Tyler Sticka',
              link: 'https://cloudfour.com/is/tyler',
              job_title: 'Partner, Vice President',
            },
            {
              name: 'Gerardo Rodriguez',
              link: 'https://cloudfour.com/is/gerardo',
              job_title: 'Senior Front-end Developer',
            },
          ],
        })
      );

      // The date should not render
      const publishDate = await screen.queryByText(
        /published\son\s\w*\s\d{1,2}\D*,\s\d{2,4}/i
      );
      expect(publishDate).toBeNull();

      // The job title should not render when multiple authors are provided
      const jobTitle = await screen.queryByText('Partner, Vice President');
      expect(jobTitle).toBeNull();
    })
  );
});
