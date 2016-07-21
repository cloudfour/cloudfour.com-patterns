'use strict';

export class Slideshow {
  constructor (element, {
    slideHolder = element.querySelector('.js-Slideshow-slides'),
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
      slideHolder,
      nextTrigger,
      prevTrigger,
      currentCount,
      totalCount,
      className
    });

    this.attachEvents();
  }

  updateCurrent () {
    if (this.counter > 0) {
      var currentSlide = (this.counter % this.numSlides);
    } else {
      var currentSlide = (this.counter % this.numSlides) ? ((this.counter % this.numSlides) + this.numSlides) : 0;
    }

    // Update the navigation with the current slide number
    this.currentCount.innerHTML = currentSlide + 1;
  }

  getCurrentPosition (el) {
    const transformMatrix = getComputedStyle(el).transform;
    const slideHolderWidth = el.offsetWidth;
    var matrixValues = transformMatrix.split('(')[1],
    matrixValues = matrixValues.split(')')[0],
    matrixValues = matrixValues.split(',');
    const translateX = matrixValues[4];
    const currentPosition = this.convertToPercent(translateX, slideHolderWidth);
    return currentPosition;
  }

  convertToPercent(el, base) {
    const percent = (el / base) * 100;
    return percent;
  }

  slide(direction) {

    // Reset the position
    // if ((this.counter != 0) && (this.counter % this.numSlides) == 0) {
    //   console.log('Start over');
    //   var currentPosition = 100;
    // } else {
    //   var currentPosition = this.getCurrentPosition(this.slideHolder);
    // }
    //
    if ((this.counter == -1) && (direction == 1)) {
      var increment = (this.counter % this.numSlides + this.numSlides) * -100;
    } else {
      var increment = direction * 100;
    }

    var currentPosition = this.getCurrentPosition(this.slideHolder);

    const newPosition = Number(currentPosition) + Number(increment);
    this.slideHolder.style.transform = 'translateX(' + newPosition + '%)';

    console.log(this.counter);
    console.log(this.numSlides);
    console.log('Old position:' + currentPosition);
    console.log('Direction: ' + direction);
    console.log('Increment:' + increment);
    console.log('New position:' + newPosition);
  }

  attachEvents () {
    this.nextTrigger.addEventListener('click', event => {
      event.preventDefault();
      this.counter++;
      this.updateCurrent();
      this.slide(-1);
    });

    this.prevTrigger.addEventListener('click', event => {
      event.preventDefault();
      this.counter--;
      this.updateCurrent();
      this.slide(1);
    });
  }
}
