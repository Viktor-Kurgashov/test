import './appear.css';

export default function initAppear() {
  document.body
    .querySelectorAll('.appear')
    .forEach((elem) => {
      const obs = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          elem.classList.replace('appear', 'appear-run');
          obs.disconnect();
        }
      }, {
        threshold: [0.25, 0.75],
      });

      obs.observe(elem);
    });
};
