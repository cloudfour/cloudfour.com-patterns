/**
 * These functions mimic the structure of WordPress's pagination objects.
 *
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

export default function mockPaginationData({
  current = 1,
  midSize = 2,
  total = 36,
} = {}) {
  const prev = current > 1 && mockPageData(current - 1, current);
  const next = current < total && mockPageData(current + 1, current);
  const pages: object[] = [];
  let start = current - midSize;
  let end = current + midSize;

  if (start < 1) {
    end += 1 - start;
  }

  if (end > total) {
    start -= end - total;
  }

  start = Math.max(1, start);
  end = Math.min(total, end);

  for (let i = start; i <= end; i++) {
    pages.push(mockPageData(i, current));
  }

  return {
    // Using underscore to mimic Timber/Twig/WordPress convention
    // eslint-disable-next-line @typescript-eslint/camelcase
    mid_size: midSize,
    current,
    total,
    prev,
    next,
    pages,
  };
}
