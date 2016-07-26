'use strict';
import {u} from 'umbrellajs';
export class Slideshow {
  constructor (element, {
    slideHolder = element.querySelector('.js-Slideshow-slides'),
    slides = element.querySelectorAll('.js-Slideshow-slide'),
    nextTrigger = element.querySelector('.js-Slideshow-next'),
    prevTrigger = element.querySelector('.js-Slideshow-prev'),
    currentCountElement = element.querySelector('.js-Slideshow-current'),
    totalCountElement = element.querySelector('.js-Slideshow-total'),
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
    u(this.totalCountElement).html(this.numSlides);
    u(this.nextTrigger).handle('click', () => this.next());
    u(this.prevTrigger).handle('click', () => this.prev());
  }

  get numSlides() {
    return this.slides.length;
  }

  slide(direction) {

    // Get the index of the current item
    if (this.counter > 0) {
      var slideToShow = (this.counter % this.numSlides);
    } else {
      var slideToShow = (this.counter % this.numSlides) ? ((this.counter % this.numSlides) + this.numSlides) : 0;
    }

    // Update the navigation with the current slide number
    u(this.currentCountElement).html(slideToShow + 1);

    // Remove previous directional class
    u(this.slideHolder).removeClass(this.classIsForward, this.classIsBack);

    // Remove previous 'was-visible' class
    this.slides.forEach(slide => {
      u(slide).removeClass(this.classWasVisible);
    });

    // Find slide that has class `is-visible`, and replace it with `was-visible`
    this.slides.forEach(slide => {
      if (u(slide).hasClass(this.classIsVisible)) {
        u(slide).removeClass(this.classIsVisible);
        u(slide).addClass(this.classWasVisible);
      }
    });

    // Add `is-visible` class to current item
    u(this.slides[slideToShow]).addClass(this.classIsVisible);

    // Add new directional classes to slide container
    if (direction == 'forward') {
      u(this.slideHolder).addClass(this.classIsSlidingForward, this.classIsForward);
    } else {
      u(this.slideHolder).addClass(this.classIsSlidingBack, this.classIsBack);
    }

    // Remove animation class so it can be re-applied as a new animation
    var onAnimationEnd = () => {
      u(this.slideHolder).removeClass(this.classIsSlidingForward, this.classIsSlidingBack);
    }

    u(this.slideHolder).on("animationend", onAnimationEnd, false);
  }

  next() {
    this.counter++;
    this.slide('forward');
  }

  prev() {
    this.counter--;
    this.slide('back');
  }
}
