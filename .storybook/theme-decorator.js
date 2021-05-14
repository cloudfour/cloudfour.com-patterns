import { useEffect } from '@storybook/client-api';

/**
 * Removes current theme classes on an element and applies a new theme class
 * if provided.
 * @param {HTMLElement} element - Element to add/remove theme classes from
 * @param {string} [theme] - New theme to apply.
 */
const updateTheme = (element, theme) => {
  const themes = [];
  element.classList.forEach((className) => {
    if (className.startsWith('t-') && className !== theme) {
      themes.push(className);
    }
  });

  if (themes.length > 0) {
    element.classList.remove(...themes);
  }

  if (theme) {
    element.classList.add(theme);
  }
};

/**
 * Adds theme class to containing story elements.
 * @param {function} story
 * @param {object} context
 * @returns {*} Result of story function.
 */
export const withTheme = (story, context) => {
  const theme = context.parameters.theme || context.globals.theme;

  if (context.viewMode === 'story') {
    // In canvas view, theme the root HTML element
    useEffect(() => {
      updateTheme(document.documentElement, theme);
    });
  } else if (context.viewMode === 'docs') {
    useEffect(() => {
      // Remove any existing theme classes from the root element
      updateTheme(document.documentElement);
      // Query for the most appropriate story preview element
      const previewElement = document
        .querySelector(`#story--${context.id}`)
        .closest('.docs-story');
      updateTheme(previewElement, theme);
    });
  }

  return story();
};
