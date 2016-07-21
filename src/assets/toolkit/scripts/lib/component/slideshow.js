'use strict';

export class Slideshow {
  constructor (element, {
    slideHolder = element.querySelector('.js-Slideshow-slides'),
    slides = element.querySelectorAll('.js-Slideshow-slide'),
    nextTrigger = element.querySelector('.js-Slideshow-next'),
    prevTrigger = element.querySelector('.js-Slideshow-prev'),
    currentCount = element.querySelector('.js-Slideshow-current'),
    totalCount = element.querySelector('.js-Slideshow-total'),
    classNameVisible = 'is-visible',
    classNameForward = 'slide-forward',
    classNameBack = 'slide-back'
  } = {}) {

    this.slides = Array.from(slides);
    this.numSlides = this.slides.length;
    this.counter = 0;
    totalCount.innerHTML = this.numSlides;

    Object.assign(this, {
      element,
      nextTrigger,
      prevTrigger,
      currentCount,
      totalCount,
      classNameVisible,
      classNameForward,
      classNameBack
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

    // Remove class names from all items
    this.slides.forEach(slide => {
      slide.classList.remove(this.classNameVisible, this.classNameForward, this.classNameBack);
    });

    // Add current class to current item
    this.slides[slideToShow].classList.add(this.classNameVisible);

    // Add forward or back class depending on direction
    if (direction == 'forward') {
      this.slides[slideToShow].classList.add(this.classNameForward);
    } else if (direction == 'back') {
      this.slides[slideToShow].classList.add(this.classNameBack);
    }
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
