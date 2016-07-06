'use strict';

export class Slideshow {
  constructor (element, {
    slides = element.querySelectorAll('.js-Slideshow-slide'),
    nextTrigger = element.querySelector('.js-Slideshow-next'),
    prevTrigger = element.querySelector('.js-Slideshow-prev'),
    currentCount = element.querySelector('.js-Slideshow-current'),
    totalCount = element.querySelector('.js-Slideshow-total'),
    className = 'is-visible'
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
      className
    });

    this.attachEvents();
  }

  showCurrent () {
    // Get the index of the current item
    const slideToShow = Math.abs(this.counter % this.numSlides);

    // Remove current class from all items
    this.slides.forEach(slide => {
      slide.classList.remove(this.className);
    });

    // Add current class to current item
    this.slides[slideToShow].classList.add(this.className);

    // Update the navigation with the current slide number
    this.currentCount.innerHTML = slideToShow + 1;
  }


  attachEvents () {

    this.nextTrigger.addEventListener('click', event => {
      event.preventDefault();
      this.counter++;
      this.showCurrent();
    });

    this.prevTrigger.addEventListener('click', event => {
      event.preventDefault();
      this.counter--;
      this.showCurrent();
    });
  }
}
