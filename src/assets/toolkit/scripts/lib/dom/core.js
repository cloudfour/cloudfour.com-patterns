'use strict';

/**
 * Returns an array from a specified selector.
 *
 * @param {String} selectors - A string containing one or more CSS selectors
 * separated by commas.
 * @param {DOM} context - A DOM element providing context for query selection.
 * Defaults to `document`.
 * @return {Array}
 */
export function arrayFromSelector(selectors, context = document) {
  if (!selectors) {
    throw new TypeError('A "selectors" argument is required.');
  }

  return Array.from(context.querySelectorAll(selectors));
}
