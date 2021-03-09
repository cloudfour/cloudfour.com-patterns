import { m as mediumBreakpoint } from '../../design-tokens/generated/breakpoint.js';

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
export const createSkyNav = (navButton: HTMLButtonElement) => {
  const menu = navButton.nextElementSibling as HTMLElement;
  const largeScreenMediaQuery = window.matchMedia(
    `(min-width: ${mediumBreakpoint})`
  );

  /**
   * Update Menu Layout
   * Sets visibility of menu & navButton for small vs large screen layouts.
   */
  const update = (isLargeScreen: boolean) => {
    if (isLargeScreen) {
      navButton.removeAttribute('aria-expanded');
      menu.removeAttribute('hidden');
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
    const isExpanded =
      navButton.getAttribute('aria-expanded') === 'true' || false;

    navButton.setAttribute('aria-expanded', String(!isExpanded));
    menu.hidden = isExpanded;
  };

  /**
   * Destroy Menu
   * As part of the public API, allow users to remove the event listener
   */
  const destroy = () => navButton.removeEventListener('click', toggle);

  // Initialize the navButton with toggle behavior
  navButton.addEventListener('click', toggle);

  // Run the update method when the media query status changes
  largeScreenMediaQuery.addListener((event) => {
    update(event.matches);
  });

  // Run the update method once to set the initial layout correctly
  update(largeScreenMediaQuery.matches);

  // Return a public API for consumers of this component
  return {
    destroy,
  };
};
