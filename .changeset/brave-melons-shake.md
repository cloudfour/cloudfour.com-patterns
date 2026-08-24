---
'@cloudfour/patterns': patch
---

Stop WordPress's File block font size from shrinking our file download buttons.

WordPress shrinks the File block's text to `0.8em`. It used to set that on
`.wp-block-file__button`, where our button styles overrode it outright, but it
now sets it on the `.wp-block-file` container instead. Our button mixins take
`font: inherit` and size their padding and block size in `em`, so the inherited
`0.8em` scaled the entire button down by a fifth rather than just its text.
Resetting `font-size` on the container restores the buttons to the same
dimensions they had before.

This only became visible with newer WordPress, so on older installs the new
declaration is a no-op.
