/**
 * Prepare mock data for a single page object.
 *
 * @param {number} [page=1] - The page number to mock data for.
 * @param {number} [current=1] -  The current page number. Used to determine if
 * `page` represents the current, previous or next page.
 * @returns {object} Mock data similar to what WordPress pagination functions
 * would return.
 * @see https://developer.wordpress.org/reference/functions/paginate_links/
 * @see https://timber.github.io/docs/guides/pagination/
 */

function mockPageData(page = 1, current = 1) {
  return {
    title: page,
    text: page,
    name: page,
    current: page === current,
    link: page !== current && `#page-${page}`,
  };
}

/**
 * Prepare mock WordPress pagination data. Used to demonstrate our pagination
 * component without requiring an API or manual object creation.
 *
 * @param {object} [param] - Parameters for generating the pagination object.
 * @param {number} [param.current=1] - Number of current page.
 * @param {number} [param.midSize=2] - Number of pages to include before or
 * after the current page. Approximate's WordPress's `mid_size` option.
 * @param {number} [param.total=36] - Total number of pages. Defaults to the
 * actual page count of the live site at the time of this writing!
 * @returns {object} Mock data similar to what WordPress pagination functions
 * would return.
 * @see https://developer.wordpress.org/reference/functions/paginate_links/
 * @see https://timber.github.io/docs/guides/pagination/
 */

export default function mockPaginationData({
  current = 1,
  midSize = 2,
  total = 36,
} = {}) {
  // If this isn't the first page, mock the previous page data
  const prev = current > 1 && mockPageData(current - 1, current);
  // If this isn't the last page, mock the next page data
  const next = current < total && mockPageData(current + 1, current);
  // Create an array to store the sequential page data objects
  const pages = [];
  // The first page to include
  let start = current - midSize;
  // The last page to include
  let end = current + midSize;

  // If there are fewer than `midSize` pages between `current` and page 1,
  // pad the last page number to compensate.
  if (start < 1) {
    end += 1 - start;
  }

  // If there are fewer than `midSize` pages between `current` and `total`,
  // pad the first page number to compensate.
  if (end > total) {
    start -= end - total;
  }

  // After adjustments, prevent the earliest page from being less than 1 and
  // the latest page from being greater than the total page count.
  start = Math.max(1, start);
  end = Math.min(total, end);

  // Populate the `pages` object with mock data
  for (let i = start; i <= end; i++) {
    pages.push(mockPageData(i, current));
  }

  return {
    // Using underscore to mimic Timber/Twig/WordPress convention
    mid_size: midSize,
    current,
    total,
    prev,
    next,
    pages,
  };
}
