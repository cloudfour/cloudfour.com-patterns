/**
 * Restores the `util` type-check predicates that Node removed in v22.
 *
 * Twing 3 calls `util.isNullOrUndefined()` in the code it generates for templates, so
 * on Node 22+ every template throws `util_1.isNullOrUndefined is not a function` at
 * render time. Twing fixed this in v7, but that upgrade is tied to the Storybook/Vite
 * migration -- this shim decouples the Node upgrade from that work.
 *
 * Delete this file, and its two require sites, once Twing is on v7.
 * @see https://nodejs.org/api/deprecations.html#DEP0044
 */

const util = require('node:util');

/** Only the predicates Twing actually reaches for, plus their near neighbours. */
const predicates = {
  isNullOrUndefined: (value) => value === null || value === undefined,
  isNull: (value) => value === null,
  isUndefined: (value) => value === undefined,
  isString: (value) => typeof value === 'string',
  isNumber: (value) => typeof value === 'number',
  isBoolean: (value) => typeof value === 'boolean',
  isSymbol: (value) => typeof value === 'symbol',
  isFunction: (value) => typeof value === 'function',
  isArray: Array.isArray,
  isObject: (value) => typeof value === 'object' && value !== null,
  isPrimitive: (value) =>
    value === null ||
    (typeof value !== 'object' && typeof value !== 'function'),
  isRegExp: (value) => value instanceof RegExp,
  isDate: (value) => value instanceof Date,
  isError: (value) => value instanceof Error,
  isBuffer: (value) => Buffer.isBuffer(value),
};

for (const [name, predicate] of Object.entries(predicates)) {
  // Never shadow a predicate the running Node still provides.
  if (typeof util[name] !== 'function') {
    util[name] = predicate;
  }
}
