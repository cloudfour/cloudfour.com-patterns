import * as breakpoints from '../../src/design-tokens/breakpoint.yml';

const breakpointEntries = Object.entries(breakpoints);

const defaultNum = Math.round(breakpointEntries.length / 2) - 1;

/**
 * Default is arbitrarily set to the middle breakpoint of an odd-numbered set or
 * the largest of the lower half of breakpoints for an even-numbered set
 */
export const defaultBreakpoint = breakpointEntries[defaultNum][0];

/**
 * List of viewports to use with addon-viewport, based on Theo breakpoints tokens
 */
export const breakpointViewports = breakpointEntries.map((viewport, index) => {
  return {
    name: viewport[0],
    styles: {
      width: viewport[1],
      height: '100%',
    },
  };
});
