'use strict';

import {u} from 'umbrellajs';

/**
 * Class representing the Slideshow component
 */
export class Slideshow {
  /**
   * @parameter {DOM} element - The containing element for Slideshow
   * @parameter {Object} options - Define the inner elements
   */
  constructor (element, {
    slideHolderSelector = '.js-Slideshow-slides',
    slidesSelector = '.js-Slideshow-slide',
    nextTriggerSelector = '.js-Slideshow-next',
    prevTriggerSelector = '.js-Slideshow-prev',
    currentCountElementSelector = '.js-Slideshow-current',
    classIsVisible = 'is-visible',
    classWasVisible = 'was-visible',
    classIsSlidingForward = 'is-sliding-forward',
    classIsSlidingBack = 'is-sliding-back',
    classIsForward = 'is-forward',
    classIsBack = 'is-back'
  } = {}) {

    // Store elements as Umbrella objects
    const slideHolder = u(slideHolderSelector, element);
    const slides = u(slidesSelector, element);
    const nextTrigger = u(nextTriggerSelector, element);
    const prevTrigger = u(prevTriggerSelector, element);
    const currentCountElement = u(currentCountElementSelector, element);

    Object.assign(this, {
      slideHolder,
      slides,
      nextTrigger,
      prevTrigger,
      currentCountElement,
      classIsVisible,
      classWasVisible,
      classIsSlidingForward,
      classIsSlidingBack,
      classIsForward,
      classIsBack
    });

    this.counter = 0;    

    // Add event listener for interaction with slide controls
    this.nextTrigger.handle('click', this.nextSlide.bind(this));
    this.prevTrigger.handle('click', this.prevSlide.bind(this));

    // Add event listener for end of animation
    this.slideHolder.handle('animationend', this.onAnimationEnd.bind(this));
  }

  /**
   * Getter for the total number of slides
   */
  get numSlides() {
    return this.slides.length;
  }

  /**
   * Getter for the index of the current slide
   */
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

  /**
   * Slide the slider
   *
   * @parameter {string} direction - Accepts 'forward' or 'back'
   */
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

  /**
   * Remove the animation class
   */
  onAnimationEnd() {
    this.slideHolder.removeClass(this.classIsSlidingForward, this.classIsSlidingBack);
  }

  /**
   * Slide forward
   */
  nextSlide() {
    this.counter++;
    this.slide('forward');
  }

  /**
   * Slide back
   */
  prevSlide() {
    this.counter--;
    this.slide('back');
  }
}
