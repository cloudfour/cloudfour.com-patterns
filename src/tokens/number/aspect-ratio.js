/**
 * Aspect ratio values
 *
 * This file was originally JSON, but we converted it to JS so the values would
 * be evaluated. This is important for platforms like Sass, which recently
 * deprecated slashes for division.
 *
 * @see {@link https://sass-lang.com/documentation/breaking-changes/slash-div}
 */
module.exports = {
  number: {
    aspect_ratio: {
      square: {
        value: 1,
      },
      full: {
        value: 4 / 3,
        comment: '4:3 ("fullscreen")',
      },
      wide: {
        value: 16 / 9,
        comment: '16:9 ("widescreen")',
      },
      cinema: {
        value: 2,
      },
    },
  },
};
