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
 * Settings
 */

const settings = {
  morph: {
    delay: '+=1',
    duration: 0.5,
    ease: Elastic.easeOut.config(0.5, 0.4)
  },
  carousel: {
    delay: '+=2',
    duration: 1,
    ease: Power2.easeInOut,
    offset: 50
  }
};

/**
 * Timelines
 */

const timelines = {
  morph: new TimelineMax({
    repeat: -1
  }),
  carousel: new TimelineMax({
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

dom.scaleIn = document.querySelectorAll('.js-scaleIn');
dom.carouselItems = shuffle(document.querySelectorAll('.js-carouselItem'));

/**
 * Initialize elements that will scale in
 */

TweenLite.set(dom.scaleIn, {
  visibility: 'visible',
  scale: 0,
  transformOrigin: '50% 50%'
});

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

timelines.morph.set(dom.screenContent, {
  attr: {
    class: 'is-md'
  }
}, 'toTablet');

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

timelines.morph.addLabel('toLaptop', settings.morph.delay);

timelines.morph.to(dom.bezel, settings.morph.duration, {
  attr: {
    x: 64,
    y: 78,
    width: 192,
    height: 132,
    rx: 3,
    ry: 3
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
    rx: 1,
    ry: 1
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

timelines.morph.set(dom.screenContent, {
  attr: {
    class: 'is-lg'
  }
}, 'toTV');

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
    rx: 43,
    ry: 43
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

timelines.morph.set(dom.screenContent, {
  attr: {
    class: 'is-sm'
  }
}, 'toAudio');

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
    rx: 8,
    ry: 8
  },
  ease: settings.morph.ease
}, 'toWatch');

timelines.morph.to(dom.screenMaskMain, settings.morph.duration / 4, {
  attr: {
    rx: 2,
    ry: 2
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
    rx: 6,
    ry: 6
  },
  ease: settings.morph.ease
}, 'toPhone');

timelines.morph.to(dom.screenMaskMain, settings.morph.duration / 4, {
  attr: {
    rx: 0,
    ry: 0
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

/**
 * Carousel
 */

var currentItem = 0;

TweenLite.set(dom.carouselItems.slice(1), {
  x: 320
});

setInterval(() => {
  const current = dom.carouselItems[currentItem];

  currentItem = currentItem + 1;

  if (currentItem >= dom.carouselItems.length) {
    currentItem = 0;
  }

  const next = dom.carouselItems[currentItem];

  TweenLite.fromTo(current, 1, {
    x: 0
  }, {
    x: -320,
    ease: Power2.easeInOut
  });

  TweenLite.fromTo(next, 1, {
    x: 320
  }, {
    x: 0,
    ease: Power2.easeInOut
  });
}, 3000);
