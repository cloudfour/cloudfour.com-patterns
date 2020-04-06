import * as breakpoints from '../../src/design-tokens/breakpoint.yml';

const breakpointNames = Object.keys(breakpoints);

const defaultNum = Math.round(breakpointNames.length / 2) - 1;

/**
 * Default is arbitrarily set to the middle breakpoint of an odd-numbered set or
 * the largest of the lower half of breakpoints for an even-numbered set
 */
export const defaultBreakpoint = breakpointNames[defaultNum];

/**
 * List of viewports to use with addon-viewport, based on Theo breakpoints tokens
 */
export const breakpointViewports = breakpointNames.map((name) => {
  return {
    name,
    styles: {
      width: breakpoints[name],
      height: '100%',
    },
  };
});
