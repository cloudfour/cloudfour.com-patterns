import * as breakpoints from '../../src/design-tokens/breakpoint.yml';

/**
 * List of viewports to use with addon-viewport, based on Theo breakpoints tokens
 * @typedef {import('@storybook/addon-viewport/ts3.5/dist/models').ViewportMap}
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
