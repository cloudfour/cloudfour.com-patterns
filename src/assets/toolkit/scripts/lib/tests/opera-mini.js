/**
 * Opera Mini detection
 *
 * 99% of the time, you should absolutely use feature detection over browser
 * detection. But Opera Mini is kind of a different beast, and for things like
 * animation it can be helpful/necessary to detect it specifically.
 *
 * @see https://dev.opera.com/articles/opera-mini-and-javascript/
 */

export default function operaMini () {
  return Object.prototype.toString.call(window.operamini) === "[object OperaMini]";
}
