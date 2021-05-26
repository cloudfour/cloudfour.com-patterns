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
  const navWrapper = navButton.closest('.c-sky-nav') as HTMLElement; // Review: should this use a .js- class or some different selector?
  const largeScreenMediaQuery = window.matchMedia(
    `(min-width: ${tokens.size.breakpoint.m.value})`
  );
  const reducedMotionMediaQuery = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
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

  let timeoutId = -1;

  /**
   * Toggle Menu State (expanded/closed)
   * Sets aria-expanded & hidden attributes to show or hide the menu.
   */
  const toggle = () => {
    const isExpanded = navButton.getAttribute('aria-expanded') === 'true';

    navButton.setAttribute('aria-expanded', String(!isExpanded));

    if (reducedMotionMediaQuery.matches) {
      menu.hidden = isExpanded;
      return;
    }

    // We need to keep track of the siblings after the menu,
    // because we will push them down for the animation
    const elementsToShift: HTMLElement[] = [navWrapper];
    let sibling: HTMLElement | null = navWrapper;
    // eslint-disable-next-line no-unmodified-loop-condition
    while ((sibling = sibling.nextElementSibling as HTMLElement | null)) {
      elementsToShift.push(sibling);
    }

    const duration = Number.parseFloat(tokens.time.transition.slow.value);
    const transition = `transform ${duration}s ${tokens.ease.in_out.value}`;
    clearTimeout(timeoutId);

    menu.hidden = false;
    const heightDiff = menu.getBoundingClientRect().height;
    if (isExpanded) {
      // Closing menu: slide the elements up before hiding the menu
      for (const el of elementsToShift) {
        el.style.transition = transition;
        el.style.transform = `translateY(${-heightDiff}px)`;
      }

      timeoutId = setTimeout(() => {
        menu.hidden = true;
        for (const el of elementsToShift) {
          el.style.transition = '';
          el.style.transform = '';
        }
      }, duration * 1000) as any as number;
    } else {
      // Opening menu: start the elements higher than their "resting position" and then slide them down
      for (const el of elementsToShift)
        el.style.transform = `translateY(${-heightDiff}px)`;

      // Flush changes to the DOM
      // eslint-disable-next-line @cloudfour/typescript-eslint/no-unused-expressions, mdx/no-unused-expressions
      navWrapper.offsetWidth;
      for (const el of elementsToShift) {
        el.style.transition = transition;
        el.style.transform = '';
      }
      timeoutId = setTimeout(() => {
        for (const el of elementsToShift) {
          el.style.transition = '';
        }
      }, duration * 1000) as any as number;
    }
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
