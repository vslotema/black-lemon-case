class Carousel {
  constructor() {
    this.carouselContainer = document.querySelector(".carousel-container");
    this.track = document.querySelector(".track");
    this.items = document.querySelectorAll(".carousel-item");
    this.moving = false;
    this.start = 0;
    this.end = 0;
    this.prevX = 0;
    this.slideX = 0;
    this.threshold = 10;
  }

  swipeStart(positionX) {
    this.start = positionX;
    this.started = true;
  }

  swipeEnd(positionX) {
    this.moving = false;
    this.started = false;
    this.end = positionX;

    if (this.start > this.end) return this.goLeft();
    if (this.start < this.end) return this.goRight();
    else {
      this.slideX = this.prevX;
      this.slideCards();
    }
  }

  /* SLides part of the carousel for smoother user experience */
  slideHalf(e, positionX) {
    const currentX = positionX;
    const diff = currentX - this.start;
    const disable =
      this.carouselContainer.offsetWidth >= this.track.offsetWidth;
    if (
      !disable &&
      this.started &&
      (diff > this.threshold || diff < -this.threshold)
    ) {
      this.moving = true;
    }

    if (this.moving) {
      const max = this.track.offsetWidth - this.items[0].offsetWidth;
      const slideW =
        this.start < currentX
          ? this.items[0].offsetWidth
          : -this.items[0].offsetWidth;

      const move = this.prevX + slideW / 2;

      if (move > -max && move < 0) {
        this.slideX = move;
        this.slideCards();
      }
    }
  }

  slideCards() {
    this.track.style.transform = `translateX(${this.slideX}px)`;
  }

  goLeft() {
    const max = this.track.offsetWidth;
    const multiplier = Math.floor(
      this.carouselContainer.offsetWidth / this.items[0].offsetWidth
    );
    const step = this.items[0].offsetWidth * multiplier;
    let move = this.prevX - step;
    const nextMove = move - step;

    if (move > -max) {
      if (nextMove < -max || nextMove === -max) {
        move = -max + this.carouselContainer.offsetWidth;
      }

      this.slideX = move;
      this.prevX = this.slideX;
      this.slideCards();
    }
  }

  goRight() {
    const multiplier = Math.floor(
      this.carouselContainer.offsetWidth / this.items[0].offsetWidth
    );
    let move = this.prevX + this.items[0].offsetWidth * multiplier;
    const nextMove = move * multiplier * this.items[0].offsetWidth;

    if (
      move > this.items[0].offsetWidth ||
      nextMove > this.items[0].offsetWidth
    ) {
      move = 0;
    }

    if (move < this.items[0].offsetWidth) {
      this.slideX = move;
      this.prevX = this.slideX;
      this.slideCards();
    }
  }
}

const carousel = new Carousel();

carousel.carouselContainer.addEventListener(
  "touchstart",
  (e) => {
    document.querySelector("body").style.overflow = "hidden";
    carousel.swipeStart(e.touches[0].pageX);
  },
  { passive: true }
);

carousel.carouselContainer.addEventListener(
  "touchend",
  (e) => {
    document.querySelector("body").style.overflow = "auto";
    carousel.swipeEnd(e.changedTouches[0].pageX);
  },
  { passive: true }
);

carousel.carouselContainer.addEventListener(
  "touchmove",
  (e) => {
    carousel.slideHalf(e, e.touches[0].pageX);
  },
  { passive: true }
);

carousel.carouselContainer.addEventListener(
  "mousedown",
  (e) => {
    document.querySelector("body").style.overflow = "hidden";
    carousel.swipeStart(e.pageX);
  },
  { passive: true }
);

carousel.carouselContainer.addEventListener(
  "mouseup",
  (e) => {
    document.querySelector("body").style.overflow = "auto";
    carousel.swipeEnd(e.pageX);
  },
  { passive: true }
);

carousel.carouselContainer.addEventListener(
  "mousemove",
  (e) => {
    carousel.slideHalf(e, e.pageX);
  },
  { passive: true }
);

