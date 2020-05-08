/**
 * These functions mimic the structure of WordPress's pagination objects.
 *
 * @see https://developer.wordpress.org/reference/functions/paginate_links/
 * @see https://timber.github.io/docs/guides/pagination/
 */

function mockPageData(page = 1, current = 1) {
  const data = {
    title: page,
    text: page,
    name: page,
  };

  if (page === current) {
    data.current = true;
  } else {
    data.link = `#page-${page}`;
  }

  return data;
}

export default function mockPaginationData({
  current = 1,
  midSize = 2,
  total = 36,
} = {}) {
  const data = { current, total, mid_size: midSize, pages: [] };
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
    data.pages.push(mockPageData(i, current));
  }

  if (current > 1) {
    data.prev = mockPageData(current - 1, current);
  }

  if (current < total) {
    data.next = mockPageData(current + 1, current);
  }

  return data;
}
