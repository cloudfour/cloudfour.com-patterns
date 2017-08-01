/**
 * Chromium (with minimum version) detection
 *
 * 99% of the time, you should absolutely use feature detection over browser
 * detection. But Chrome 60 introduced a nasty SVG mask regression that is
 * extremely browser-specific.
 *
 * @see https://bugs.chromium.org/p/chromium/issues/detail?id=750252
 * @see https://github.com/cloudfour/cloudfour.com-patterns/issues/423
 */

export default function isChromium (min) {
  const isChromium = window.chrome;

  if (isChromium && min) {
    const versionMatch = navigator.userAgent.match(/Chrome\/(\S+)/);

    if (versionMatch) {
      const version = parseInt(versionMatch[1].split('.')[0]);
      return (version >= min);
    }

    return false;
  }

  return isChromium;
}
