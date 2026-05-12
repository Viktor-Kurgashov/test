import './slider.css';

export default class Slider {
  #btnPrev = null;
  #btnNext = null;

  #body = null;
  #counter = null;
  #bullets = null;

  #slideWidth = 0;
  #slidesCount = 0;
  #maxIndex = 0;

  #autoplayTimerId = 0;
  #currentIndex = 0;

  set currentIndex(value) {
    if (this.#counter) {
      this.#counter.textContent = `${value + 1} / ${this.#slidesCount}`;
    }

    if (this.#btnPrev) {
      this.#btnPrev.disabled = value <= 0;
    }

    if (this.#btnNext) {
      this.#btnNext.disabled = value >= this.#maxIndex;
    }

    if (this.#bullets) {
      [...this.#bullets.children].map((elem, index) => {
        elem.setAttribute('aria-current', index === value);
      });
    }

    this.#currentIndex = value;
  }

  constructor(parent) {
    const wrapper = parent.querySelector('.slider__list');

    this.#body = parent.querySelector('.slider__body');

    const maxScroll = Math.abs(this.#body.offsetWidth - this.#body.scrollWidth);

    this.#slideWidth = wrapper.firstElementChild.offsetWidth;

    this.#slidesCount = Math.round(this.#body.scrollWidth / this.#slideWidth);

    this.#maxIndex = Math.round(maxScroll / this.#slideWidth);

    this.#btnNext = parent.querySelector('.slider__btn-next');
    this.#btnPrev = parent.querySelector('.slider__btn-prev');

    this.#counter = parent.querySelector('.slider__counter');
    this.#bullets = parent.querySelector('.slider__pagination');

    this.#btnNext?.addEventListener('click', this.#slideNext.bind(this));

    this.#btnPrev?.addEventListener('click', this.#slidePrev.bind(this))

    this.#body?.addEventListener('scroll', ({ currentTarget }) => {
      this.currentIndex = Math.round(currentTarget.scrollLeft / maxScroll * this.#maxIndex);
    });

    if (this.#bullets) {
      const markup = Array
        .from({ length: this.#slidesCount })
        .reduce((acc, _, index) => {
          return acc + '<span class="slider__bullet"></span>';
        }, '');

      this.#bullets.insertAdjacentHTML('beforeend', markup);
    }

    this.currentIndex = 0;

    if (parent.hasAttribute('data-slider-autoplay')) {
      const play = (index = 0, revert = false) => {
        if (
          !revert && (index < this.#maxIndex) ||
          revert && !index
        ) {
          this.#slideNext();

          this.#autoplayTimerId = setTimeout(() => play(index + 1), 2500)
        } else {
          this.#slidePrev();

          this.#autoplayTimerId = setTimeout(() => play(index - 1, true), 2500)
        }
      };

      this.#autoplayTimerId = setTimeout(play.bind(this), 2500);
    }
  }

  #slideNext() {
    this.#body.scrollBy(this.#slideWidth, 0);
    clearTimeout(this.#autoplayTimerId);
  }

  #slidePrev() {
    this.#body.scrollBy(this.#slideWidth * -1, 0);
    clearTimeout(this.#autoplayTimerId);
  }
}
