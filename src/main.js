import './assets/fonts/index.css';
import './assets/styles/tags.css';
import './assets/styles/typography.css';
import './assets/styles/variables.css';

import './components/ui/button.css';
import './components/ui/button-round.css';
import './components/common.css';

import './components/hero.css';
import './components/about.css';
import Marquee from './components/marquee';
import Slider from './components/slider';
import './components/steps.css'
import './components/team.css';
import initAppear from './components/appear';

document.body.querySelectorAll('.marquee').forEach((el) => new Marquee(el));

document.body.querySelectorAll('.slider').forEach((el) => {
  requestAnimationFrame(() => new Slider(el));
});

initAppear();
