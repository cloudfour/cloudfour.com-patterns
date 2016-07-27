'use strict';
import {u} from 'umbrellajs';
export class Slideshow {
  constructor (element, {
    slideHolderSelector = '.js-Slideshow-slides',
    slidesSelector = '.js-Slideshow-slide',
    nextTriggerSelector = '.js-Slideshow-next',
    prevTriggerSelector = '.js-Slideshow-prev',
    currentCountElementSelector = '.js-Slideshow-current',
    totalCountElementSelector = '.js-Slideshow-total',
    classIsVisible = 'is-visible',
    classWasVisible = 'was-visible',
    classIsSlidingForward = 'is-sliding-forward',
    classIsSlidingBack = 'is-sliding-back',
    classIsForward = 'is-forward',
    classIsBack = 'is-back'
  } = {}) {

    const slideHolder = u(slideHolderSelector, element);
    const slides = u(slidesSelector, element);
    const nextTrigger = u(nextTriggerSelector, element);
    const prevTrigger = u(prevTriggerSelector, element);
    const currentCountElement = u(currentCountElementSelector, element);
    const totalCountElement = u(totalCountElementSelector, element);

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
    this.totalCountElement.text(this.numSlides);
    this.nextTrigger.handle('click', this.nextSlide.bind(this));
    this.prevTrigger.handle('click', this.prevSlide.bind(this));
    this.slideHolder.on('animationend', this.onAnimationEnd.bind(this));
  }

  get numSlides() {
    return this.slides.length;
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
    // Update the navigation with the current slide number
    this.currentCountElement.text(this.slideToShow + 1);

    // Remove previous directional class
    this.slideHolder.removeClass(this.classIsForward, this.classIsBack);

    // Remove previous 'was-visible' class
    this.slides.removeClass(this.classWasVisible);

    // Find slide that has class `is-visible`, and replace it with `was-visible`
    this.slides.each((slide, i) => {
      var slide = u(slide);
      if (slide.hasClass(this.classIsVisible)) {
        slide.removeClass(this.classIsVisible).addClass(this.classWasVisible);
      }
    });

    // Add `is-visible` class to current item
    u(this.slides.nodes[this.slideToShow]).addClass(this.classIsVisible);

    // Add new directional classes to slide container
    if (direction === 'forward') {
      this.slideHolder.addClass(this.classIsSlidingForward, this.classIsForward);
    } else {
      this.slideHolder.addClass(this.classIsSlidingBack, this.classIsBack);
    }
  }

  onAnimationEnd() {
    this.slideHolder.removeClass(this.classIsSlidingForward, this.classIsSlidingBack);
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
