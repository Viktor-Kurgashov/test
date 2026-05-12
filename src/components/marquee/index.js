import './marquee.css';

export default class Marquee {
  constructor(parent) {
    const stack = parent.querySelector('.marquee__list');

    const copies = Math.max(2, Math.ceil(parent.offsetWidth / stack.offsetWidth * 3));

    stack.style.setProperty('--marquee-item-index', 1);

    stack.style.setProperty('--marquee-item-count', copies);

    Array.from({ length: copies }).map((_, index) => {
      const copy = stack.cloneNode(true);

      copy.style.setProperty('--marquee-item-index', index + 2);

      copy.style.setProperty('--marquee-item-count', copies);

      parent.insertAdjacentElement('beforeend', copy);
    })
  }
}
