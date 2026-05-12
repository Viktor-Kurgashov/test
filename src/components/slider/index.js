import './slider.css';

export default class Slider {
  #btnPrev = null;
  #btnNext = null;

  #counter = null;
  #bullets = null;

  #slidesCount = 0;
  #maxIndex = 0;

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
  }

  constructor(parent) {
    const wrapper = parent.querySelector('.slider__list');

    const scrollable = parent.querySelector('.slider__body');

    const maxScroll = Math.abs(scrollable.offsetWidth - scrollable.scrollWidth);

    this.#slidesCount = Math.round(scrollable.scrollWidth / wrapper.firstElementChild.offsetWidth);

    this.#counter = parent.querySelector('.slider__counter');

    this.#bullets = parent.querySelector('.slider__pagination');

    this.#maxIndex = Math.round(maxScroll / wrapper.firstElementChild.offsetWidth);

    this.#btnNext = parent.querySelector('.slider__btn-next');
    this.#btnPrev = parent.querySelector('.slider__btn-prev');

    this.#btnNext?.addEventListener('click', () => {
      scrollable.scrollBy(300, 0);
    })

    this.#btnPrev?.addEventListener('click', () => {
      scrollable.scrollBy(-300, 0);
    })

    scrollable?.addEventListener('scroll', ({ currentTarget }) => {
      this.currentIndex = Math.round(currentTarget.scrollLeft / maxScroll * this.#maxIndex);
    });

    if (this.#bullets) {
      this.#bullets.innerHtml = '';

      const markup = Array.from({ length: this.#slidesCount }).reduce((acc, _, index) => {
        return acc + '<span class="slider__bullet"></span>';
      }, '');

      this.#bullets.insertAdjacentHTML('beforeend', markup);
    }

    this.currentIndex = 0;
  }
}
