import tokens from '../../compiled/tokens/js/tokens';

/**
 * Create Sky Nav Menu
 *
 * Adds an event listener to the toggle button of a Sky Nav component for click
 * events, which runs the toggle command to show or hide the menu with animation.
 * Responds to breakpoint changes to show or hide the nav for large and small
 * screens. Returns an object containing a `destroy()` method to remove the
 * event listener.
 *
 * @param navButton - the toggle button for the navigation
 */
export const initSkyNav = (navButton: HTMLButtonElement) => {
  const menu = navButton.nextElementSibling as HTMLElement;
  const largeScreenMediaQuery = window.matchMedia(
    `(min-width: ${tokens.size.breakpoint.m.value})`
  );

  /**
   * Update Menu Layout
   * Sets visibility of menu & navButton for small vs large screen layouts.
   */
  const update = () => {
    const isLargeScreen = largeScreenMediaQuery.matches;
    if (isLargeScreen) {
      navButton.removeAttribute('aria-expanded');
      menu.hidden = false;
    } else {
      navButton.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
  };

  /**
   * Toggle Menu State (expanded/closed)
   * Sets aria-expanded & hidden attributes to show or hide the menu.
   */
  const toggle = () => {
    const isExpanded = navButton.getAttribute('aria-expanded') === 'true';

    navButton.setAttribute('aria-expanded', String(!isExpanded));
    menu.hidden = isExpanded;
  };

  navButton.addEventListener('click', toggle);
  // Run the update method when the media query status changes
  largeScreenMediaQuery.addEventListener('change', update);

  // Run the update method once to set the initial layout correctly
  update();

  /** Clean up event listeners */
  const destroy = () => {
    navButton.removeEventListener('click', toggle);
    largeScreenMediaQuery.removeEventListener('change', update);
  };

  // Return a public API for consumers of this component
  return { destroy };
};
