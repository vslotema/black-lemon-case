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
    this.track.style.transition = `none`;
  }

  swipeEnd(positionX) {
    this.moving = false;
    this.started = false;
    this.end = positionX;
    this.prevX = this.slideX;

    if (this.start > this.end) return this.goLeft();
    if (this.start < this.end) return this.goRight();
  }

  slider(e, positionX) {
    const currentX = positionX;
    const diff = currentX - this.start;
    const disable =
      this.carouselContainer.offsetWidth >= this.track.offsetWidth;
    if (!disable) {
      this.moving = true;
    }

    if (this.moving) {
      const multiplier =
        this.carouselContainer.offsetWidth / this.items[0].offsetWidth;

      const max =
        this.track.offsetWidth - this.items[0].offsetWidth * multiplier;

      const move = this.prevX + diff;

      if (move >= -max && move < 0) {
        this.slideX = move;
        return this.slideCards();
      }
    }
  }

  slideCards() {
    this.track.style.transform = `translateX(${this.slideX}px)`;
  }

  goLeft() {
    const mult = Math.ceil(this.slideX / -this.items[0].offsetWidth);
    this.slideX = -this.items[0].offsetWidth * mult;
    this.prevX = this.slideX;
    this.track.style.transition = `all 0.3s ease-in`;
    this.slideCards();
  }

  goRight() {
    const mult = Math.floor(this.slideX / -this.items[0].offsetWidth);
    console.log("mult ", mult);
    this.slideX = -this.items[0].offsetWidth * mult;
    this.prevX = this.slideX;
    this.track.style.transition = `all 0.3s ease-in`;
    this.slideCards();
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
    console.log("e end ", e);
    document.querySelector("body").style.overflow = "auto";
    carousel.swipeEnd(e.changedTouches[0].pageX);
  },
  { passive: true }
);

carousel.carouselContainer.addEventListener(
  "touchmove",
  (e) => {
    carousel.slider(e, e.touches[0].pageX);
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
    carousel.slider(e, e.pageX);
  },
  { passive: true }
);
