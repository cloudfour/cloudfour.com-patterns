import * as breakpoints from '../../src/design-tokens/breakpoint.yml';

/**
 * List of viewports to use with addon-viewport, based on Theo breakpoints tokens
 */
export const breakpointViewports = Object.keys(breakpoints).map((name) => {
  return {
    name,
    styles: {
      width: breakpoints[name],
      height: '100%',
    },
  };
});
