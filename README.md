[![Build Status](https://travis-ci.org/fbrctr/fabricator.svg)](https://travis-ci.org/fbrctr/fabricator) [![devDependency Status](https://david-dm.org/fbrctr/fabricator/dev-status.svg)](https://david-dm.org/fbrctr/fabricator#info=devDependencies) [![Join the chat at https://gitter.im/fbrctr/fabricator](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/fbrctr/fabricator?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

<p align="center">
  <img src="http://fbrctr.github.io/assets/toolkit/images/logo.svg" width="500">
</p>

# Fabricator

> _fabricate_ - to make by assembling parts or sections.

Fabricator is a tool for building website UI toolkits - _think ["Tiny Bootstraps, for Every Client"](http://daverupert.com/2013/04/responsive-deliverables/#tiny-bootstraps-for-every-client)_

## Quick Start

```shell
$ curl -L https://github.com/resource/fabricator/archive/master.tar.gz | tar zx --strip 1
$ npm start
```

## Documentation

#### [Read the docs →](http://fbrctr.github.io/docs)

## Demo

#### [Default Fabricator Instance →](http://fbrctr.github.io/demo)

## Credits

Created by [Luke Askew](http://twitter.com/lukeaskew).

Logo by [Abby Putinski](https://abbyputinski.com/)

## License

[The MIT License (MIT)](http://opensource.org/licenses/mit-license.php)

## Cloud Four Additions and Changes

We've made some changes and enhancements of our own. The presentation of the fabricator UI has been modified quite a bit. Also...:

### Handlebars Helpers

We've added additional available Handlebars (template) helpers. See `build/helpers` for source.

### Additional Front-Matter Metadata

You can of course add any front matter you like to materials. We've added specific support in templates for some special attributes:

`links`: This is an object. Keys will be used for display, values should be the URL. These will be rendered along with the material as resource/reference external links.

Example:

```yaml
---
links:
    The Best Web Site Ever: http://www.example.com
    Another site: https://www.foo.com
---
```

`labels`: This is an array. Values of the array will be used as label class identifiers. Labels express the status of the material in question. Unrecognized labels will be displayed as well, but without color highlighting (in current implementation, gray).

Defined labels:

* `inprogress` (yellow)
* `deprecated` (red)
* `approved` (green)

Example:

```yaml
---
labels:
    - inprogress
    - totoro
---
```

### Workflow Changes

* We've opted for `post-css` instead of the default Sass that ships with Fabricator.
* We've removed `csso` (optimization).
* We've added a new Gulp task: `styles:test`
  - This analyzes CSS files using [postcss-bem-linter](https://github.com/postcss/postcss-bem-linter)
  - Any issues found are output as console warnings with [postcss-reporter](https://github.com/postcss/postcss-reporter)
