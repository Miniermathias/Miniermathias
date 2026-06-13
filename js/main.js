import { initParticles }    from './particles.js';
import { initNavbar }       from './navbar.js';
import { initAnimations }   from './animations.js';
import { initCounters }     from './counters.js';
import { initServiceCards } from './services.js';
import { initContactForm }  from './contact.js';
import { initCursor }       from './cursor.js';

document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavbar();
  initParticles('hero-canvas');
  initAnimations();
  initCounters();
  initServiceCards();
  initContactForm();
});
