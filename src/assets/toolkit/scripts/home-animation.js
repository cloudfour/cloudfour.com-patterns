/**
 * GSAP is powerful and performant, but its organization is a little old-school.
 * This imports a bunch of functions to the global scope.
 *
 * See: https://github.com/greensock/GreenSock-JS/issues/71
 */

import TweenLite from 'gsap/src/uncompressed/TweenLite';
import TimelineMax from 'gsap/src/uncompressed/TimelineMax';
import EasePack from 'gsap/src/uncompressed/easing/EasePack';
import CSSPlugin from 'gsap/src/uncompressed/plugins/CSSPlugin';
import AttrPlugin from 'gsap/src/uncompressed/plugins/AttrPlugin';
import isChromium from './lib/tests/chromium';
import isOperaMini from './lib/tests/opera-mini';

/**
 * Shuffle arrays or nodeLists
 *
 * See: http://thenewcode.com/1095/Shuffling-and-Sorting-JavaScript-Arrays
 */

function shuffle (list) {
  list = Array.prototype.slice.call(list);

  for (let i = list.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }

  return list;
}

/**
 * Opera Mini supports all the necessary features but won't update the animation
 * per frame, so we won't bother animating in that case.
 *
 * We also won't bother in Chrome ≥ 60 due to this issue:
 * https://bugs.chromium.org/p/chromium/issues/detail?id=750252
 * https://github.com/cloudfour/cloudfour.com-patterns/issues/423
 */

if (!isChromium(60) && !isOperaMini()) {
  /**
   * Settings
   */

  const settings = {
    morph: {
      delay: '+=1',
      duration: 0.6,
      ease: Elastic.easeOut.config(0.5, 0.4)
    },
    carousel: {
      duration: 0.8,
      ease: Power3.easeInOut,
      skipEvery: 1
    }
  };

  /**
   * State
   */

  const state = {
    carousel: {
      current: 0,
      called: 0
    }
  }

  /**
   * Timelines
   */

  const timelines = {
    morph: new TimelineMax({
      repeat: -1
    })
  };

  /**
   * Elements
   */

  const dom = (function (nodeList) {
    const result = {};

    for (let i = 0; i < nodeList.length; i++) {
      let node = nodeList[i];
      let id = node.getAttribute('id');

      if (id) {
        result[id] = node;
      }
    }

    return result;
  })(document.querySelectorAll('*[id]'));

  dom.remove = document.querySelectorAll('.js-remove');
  dom.hide = document.querySelectorAll('.js-hide');
  dom.show = document.querySelectorAll('.js-show');
  dom.scaleIn = document.querySelectorAll('.js-scaleIn');
  dom.carouselItems = shuffle(document.querySelectorAll('.js-carouselItem'));

  /**
   * Hide/show fallback or non-fallback elements
   */

  for (let i = 0; i < dom.remove.length; i++) {
    dom.remove[i].parentNode.removeChild(dom.remove[i]);
  }

  TweenLite.set(dom.hide, {
    visibility: 'hidden'
  });

  TweenLite.set(dom.show, {
    visibility: 'visible'
  });

  /**
   * Initialize elements that will scale in
   */

  TweenLite.set(dom.scaleIn, {
    visibility: 'visible',
    scale: 0,
    transformOrigin: '50% 50%'
  });

  /**
   * Initialize carousel
   */

  TweenLite.set(dom.carouselItems[state.carousel.current], {
    visibility: 'visible'
  });

  const carouselStep = function () {
    state.carousel.called++;

    if (state.carousel.called <= settings.carousel.skipEvery) {
      return;
    }

    var current = dom.carouselItems[state.carousel.current];
    var offset = parseFloat(dom.screenContent.getAttribute('width'));
    var nextIndex = state.carousel.current + 1;
    var next;

    if (nextIndex >= dom.carouselItems.length) {
      nextIndex = 0;
    }

    next = dom.carouselItems[nextIndex];

    TweenLite.to(current, settings.carousel.duration, {
      attr: {
        x: -offset
      },
      ease: settings.carousel.ease,
      onComplete: () => TweenLite.set(current, {
        attr: {
          x: 0
        },
        visibility: 'hidden'
      })
    });

    TweenLite.fromTo(next, settings.carousel.duration, {
      attr: {
        x: offset
      },
      visibility: 'visible'
    }, {
      attr: {
        x: 0
      },
      ease: settings.carousel.ease
    });

    state.carousel.current = nextIndex;
    state.carousel.called = 0;
  }

  /**
   * Device morphing
   */

  timelines.morph.addLabel('toTablet', settings.morph.delay);

  timelines.morph.to(dom.bezel, settings.morph.duration, {
    attr: {
      x: 94,
      y: 66,
      width: 132,
      height: 188
    },
    ease: settings.morph.ease
  }, 'toTablet');

  timelines.morph.to([dom.screenMaskMain, dom.screenContent], settings.morph.duration, {
    attr: {
      x: 100,
      y: 80,
      width: 120,
      height: 160
    },
    ease: settings.morph.ease
  }, 'toTablet');

  timelines.morph.addCallback(carouselStep);

  timelines.morph.addLabel('toTabletLandscape', settings.morph.delay);

  timelines.morph.to(dom.screenContent, settings.morph.duration, {
    attr: {
      x: 80,
      y: 100,
      width: 160,
      height: 120
    },
    ease: Back.easeInOut.config(1.7)
  }, 'toTabletLandscape');

  timelines.morph.to([dom.bezel, dom.screenMaskMain], settings.morph.duration, {
    attr: {
      transform: 'rotate(-90 160 160)'
    },
    ease: Back.easeInOut.config(1.7)
  }, 'toTabletLandscape');

  timelines.morph.set(dom.bezel, {
    attr: {
      transform: 'rotate(0)',
      x: 66,
      y: 94,
      width: 188,
      height: 132
    }
  });

  timelines.morph.set(dom.screenMaskMain, {
    attr: {
      transform: 'rotate(0)',
      x: 80,
      y: 100,
      width: 160,
      height: 120
    }
  });

  timelines.morph.addCallback(carouselStep);

  timelines.morph.addLabel('toLaptop', settings.morph.delay);

  timelines.morph.to(dom.bezel, settings.morph.duration, {
    attr: {
      x: 64,
      y: 78,
      width: 192,
      height: 132,
      rx: 3
    },
    ease: settings.morph.ease
  }, 'toLaptop');

  timelines.morph.to([dom.screenMaskMain, dom.screenContent], settings.morph.duration, {
    attr: {
      x: 70,
      y: 84,
      width: 180,
      height: 120
    },
    ease: settings.morph.ease
  }, 'toLaptop');

  timelines.morph.to(dom.keyboard, settings.morph.duration, {
    scale: 1,
    ease: settings.morph.ease
  }, 'toLaptop');

  timelines.morph.addCallback(carouselStep);

  timelines.morph.addLabel('toTV', settings.morph.delay);

  timelines.morph.to(dom.keyboard, settings.morph.duration / 2, {
    scale: 0,
    transformOrigin: '50% 0'
  }, 'toTV');

  timelines.morph.to(dom.bezel, settings.morph.duration, {
    attr: {
      x: -4,
      y: 63,
      width: 328,
      height: 194,
      rx: 1
    },
    ease: settings.morph.ease
  }, 'toTV');

  timelines.morph.to([dom.screenMaskMain, dom.screenContent], settings.morph.duration, {
    attr: {
      x: 0,
      y: 67,
      width: 320,
      height: 180
    },
    ease: settings.morph.ease
  }, 'toTV');

  timelines.morph.to(dom.remote, settings.morph.duration, {
    rotation: '-15deg',
    scale: 1,
    ease: settings.morph.ease
  }, 'toTV');

  timelines.morph.addCallback(carouselStep);

  timelines.morph.addLabel('toAudio', settings.morph.delay);

  timelines.morph.to(dom.remote, settings.morph.duration / 4, {
    scale: 0,
    transformOrigin: '0 0'
  }, 'toAudio');

  timelines.morph.to(dom.bezel, settings.morph.duration / 4, {
    attr: {
      x: 160,
      y: 160,
      width: 0,
      height: 0
    }
  }, 'toAudio');

  timelines.morph.to(dom.screenContent, settings.morph.duration, {
    attr: {
      x: 117,
      y: 135,
      width: 86,
      height: 70
    },
    ease: settings.morph.ease
  }, 'toAudio');

  timelines.morph.to(dom.screenMaskMain, settings.morph.duration, {
    attr: {
      x: 117,
      y: 127,
      width: 86,
      height: 86,
      rx: 43
    },
    ease: settings.morph.ease
  }, 'toAudio');

  timelines.morph.to(dom.screenMaskPointer, settings.morph.duration, {
    attr: {
      points: '110 196 160 146 160 196'
    },
    ease: settings.morph.ease
  }, 'toAudio');

  timelines.morph.to(dom.headphones, settings.morph.duration, {
    scale: 1,
    ease: settings.morph.ease
  }, 'toAudio');

  timelines.morph.addCallback(carouselStep);

  timelines.morph.addLabel('toWatch', settings.morph.delay);

  timelines.morph.to(dom.screenMaskPointer, settings.morph.duration / 2, {
    attr: {
      points: '160 160 160 160 160 160'
    }
  }, 'toWatch');

  timelines.morph.to(dom.headphones, settings.morph.duration / 2, {
    scale: 0
  }, 'toWatch');

  timelines.morph.to(dom.bezel, settings.morph.duration, {
    attr: {
      x: 134,
      y: 130,
      width: 52,
      height: 60,
      rx: 8
    },
    ease: settings.morph.ease
  }, 'toWatch');

  timelines.morph.to(dom.screenMaskMain, settings.morph.duration / 4, {
    attr: {
      rx: 2
    }
  }, 'toWatch');

  timelines.morph.to([dom.screenMaskMain, dom.screenContent], settings.morph.duration, {
    attr: {
      x: 140,
      y: 136,
      width: 40,
      height: 48
    },
    ease: settings.morph.ease
  }, 'toWatch');

  timelines.morph.to(dom.watchband, settings.morph.duration, {
    scale: 1,
    ease: settings.morph.ease
  }, 'toWatch');

  timelines.morph.addCallback(carouselStep);

  timelines.morph.addLabel('toPhone', settings.morph.delay);

  timelines.morph.to(dom.watchband, settings.morph.duration / 2, {
    scale: 0
  }, 'toPhone');

  timelines.morph.to(dom.bezel, settings.morph.duration, {
    attr: {
      x: 127,
      y: 92,
      width: 66,
      height: 136,
      rx: 6
    },
    ease: settings.morph.ease
  }, 'toPhone');

  timelines.morph.to(dom.screenMaskMain, settings.morph.duration / 4, {
    attr: {
      rx: 0
    }
  }, 'toPhone');

  timelines.morph.to([dom.screenMaskMain, dom.screenContent], settings.morph.duration, {
    attr: {
      x: 130,
      y: 107,
      width: 60,
      height: 106
    },
    ease: settings.morph.ease
  }, 'toPhone');

  timelines.morph.addCallback(carouselStep);
}
