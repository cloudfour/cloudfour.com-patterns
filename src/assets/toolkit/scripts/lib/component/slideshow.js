'use strict';

export class Slideshow {
  constructor (element, {
    slideHolder = element.querySelector('.js-Slideshow-slides'),
    slides = element.querySelectorAll('.js-Slideshow-slide'),
    nextTrigger = element.querySelector('.js-Slideshow-next'),
    prevTrigger = element.querySelector('.js-Slideshow-prev'),
    currentCount = element.querySelector('.js-Slideshow-current'),
    totalCount = element.querySelector('.js-Slideshow-total'),
    classIsVisible = 'is-visible',
    classWasVisible = 'was-visible',
    classForward = 'slide-forward',
    classBack = 'slide-back',
    classForwardAlt = 'slide-forward-alt',
    classBackAlt = 'slide-back-alt'
  } = {}) {

    this.slides = Array.from(slides);
    this.numSlides = this.slides.length;
    this.counter = 0;
    totalCount.innerHTML = this.numSlides;

    Object.assign(this, {
      element,
      slideHolder,
      nextTrigger,
      prevTrigger,
      currentCount,
      totalCount,
      classIsVisible,
      classWasVisible,
      classForward,
      classBack,
      classForwardAlt,
      classBackAlt
    });

    this.attachEvents();
  }

  showCurrent (direction) {
    // Get the index of the current item
    if (this.counter > 0) {
      var slideToShow = (this.counter % this.numSlides);
    } else {
      var slideToShow = (this.counter % this.numSlides) ? ((this.counter % this.numSlides) + this.numSlides) : 0;
    }

    // Update the navigation with the current slide number
    this.currentCount.innerHTML = slideToShow + 1;

    // Remove previously applied directional class
    this.slideHolder.classList.remove(this.classForward, this.classBack, this.classForwardAlt, this.classBackAlt);

    // Trigger a reflow which gives a fresh start to the element, so we can add
    // back the same class that runs the same animation
    this.slideHolder.offsetWidth;

    // Add new directional class to slide container
    if (direction == 'forward') {
      // Alternate class names to apply a different animation since you can't
      // run the same animation twice in a row
      // if (this.counter % 2) {
      //   this.slideHolder.classList.add(this.classForward);
      // } else {
      //   this.slideHolder.classList.add(this.classForwardAlt);
      // }
      this.slideHolder.classList.add(this.classForward);
    } else {
      // if (this.counter % 2) {
      //   this.slideHolder.classList.add(this.classBack);
      // } else {
      //   this.slideHolder.classList.add(this.classBackAlt);
      // }
      this.slideHolder.classList.add(this.classBack);
    }

    // Remove `was-visible` class
    this.slides.forEach(slide => {
      slide.classList.remove(this.classWasVisible);
    });

    // Find slide that has class `is-visible`, and replace it with `was-visible`
    this.slides.forEach(slide => {
      if (slide.classList.contains(this.classIsVisible)) {
        slide.classList.remove(this.classIsVisible);
        slide.classList.add(this.classWasVisible);
      }
    });

    // Add `is-visible` class to current item
    this.slides[slideToShow].classList.add(this.classIsVisible);
  }


  attachEvents () {

    this.nextTrigger.addEventListener('click', event => {
      event.preventDefault();
      this.counter++;
      this.showCurrent('forward');
    });

    this.prevTrigger.addEventListener('click', event => {
      event.preventDefault();
      this.counter--;
      this.showCurrent('back');
    });
  }
}
