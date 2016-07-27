'use strict';
import {u} from 'umbrellajs';
export class Slideshow {
  constructor (element, {
    slideHolder = u('.js-Slideshow-slides'),
    slides = u('.js-Slideshow-slide'),
    nextTrigger = u('.js-Slideshow-next'),
    prevTrigger = u('.js-Slideshow-prev'),
    currentCountElement = u('.js-Slideshow-current'),
    totalCountElement = u('.js-Slideshow-total'),
    classIsVisible = 'is-visible',
    classWasVisible = 'was-visible',
    classIsSlidingForward = 'is-sliding-forward',
    classIsSlidingBack = 'is-sliding-back',
    classIsForward = 'is-forward',
    classIsBack = 'is-back'
  } = {}) {

    Object.assign(this, {
      slides,
      slideHolder,
      nextTrigger,
      prevTrigger,
      currentCountElement,
      totalCountElement,
      classIsVisible,
      classWasVisible,
      classIsForward,
      classIsBack,
      classIsSlidingForward,
      classIsSlidingBack
    });

    this.counter = 0;
    u(this.totalCountElement).text(this.numSlides);
    u(this.nextTrigger).handle('click', this.nextSlide.bind(this));
    u(this.prevTrigger).handle('click', this.prevSlide.bind(this));
    u(this.slideHolder).on('animationend', this.onAnimationEnd.bind(this));
  }

  get numSlides() {
    return u(this.slides).length;
  }

  get slideToShow() {
    var slideToShow;
    var slideRemainder = this.counter % this.numSlides;

    // Get the index of the current item
    if (this.counter > 0) {
      slideToShow = slideRemainder;
    } else {
      slideToShow = slideRemainder ? (slideRemainder + this.numSlides) : 0;
    }

    return slideToShow;
  }

  slide(direction) {

    const uSlideHolder = u(this.slideHolder);
    const uSlides = u(this.slides);

    // Update the navigation with the current slide number
    u(this.currentCountElement).text(this.slideToShow + 1);

    // Remove previous directional class
    uSlideHolder.removeClass(this.classIsForward, this.classIsBack);

    // Remove previous 'was-visible' class
    uSlides.removeClass(this.classWasVisible);

    // Find slide that has class `is-visible`, and replace it with `was-visible`
    uSlides.each((slide, i) => {
      var uSlide = u(slide);
      if (uSlide.hasClass(this.classIsVisible)) {
        uSlide.removeClass(this.classIsVisible).addClass(this.classWasVisible);
      }
    });

    // Add `is-visible` class to current item
    u(this.slides.nodes[this.slideToShow]).addClass(this.classIsVisible);

    // Add new directional classes to slide container
    if (direction === 'forward') {
      uSlideHolder.addClass(this.classIsSlidingForward, this.classIsForward);
    } else {
      uSlideHolder.addClass(this.classIsSlidingBack, this.classIsBack);
    }
  }

  onAnimationEnd() {
    u(this.slideHolder).removeClass(this.classIsSlidingForward, this.classIsSlidingBack);
  }

  nextSlide() {
    this.counter++;
    this.slide('forward');
  }

  prevSlide() {
    this.counter--;
    this.slide('back');
  }
}
