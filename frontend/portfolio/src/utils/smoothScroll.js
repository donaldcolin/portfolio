import { gsap, ScrollTrigger } from './gsapSetup';

// Lightweight smooth scrolling without premium plugins.
// Uses a fixed wrapper (#smooth-wrapper) and translates #smooth-content.

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return true;
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export function initSmoothScroll(options = {}) {
  if (typeof window === 'undefined') return () => {};
  if (prefersReducedMotion()) return () => {};

  const ease = typeof options.ease === 'number' ? options.ease : 0.12; // 0-1
  const wrapper = document.querySelector('#smooth-wrapper');
  const content = document.querySelector('#smooth-content');

  if (!wrapper || !content) return () => {};

  // Prepare DOM
  wrapper.style.position = 'fixed';
  wrapper.style.inset = '0';
  wrapper.style.overflow = 'hidden';
  wrapper.style.width = '100%';
  wrapper.style.height = '100%';
  wrapper.style.willChange = 'transform';

  content.style.willChange = 'transform';
  content.style.minHeight = '100%';
  content.style.transform = 'translate3d(0, 0, 0)';

  let current = window.scrollY || window.pageYOffset;
  let target = current;
  let rafId = null;

  const setBodyHeight = () => {
    document.body.style.height = `${content.getBoundingClientRect().height}px`;
  };

  setBodyHeight();

  // Let window remain the scroller for ScrollTrigger. We only translate content visually.

  const onScroll = () => {
    target = window.pageYOffset || document.documentElement.scrollTop;
    if (!rafId) raf();
  };

  const raf = () => {
    const diff = target - current;
    const delta = Math.abs(diff) < 0.1 ? 0 : diff * ease;
    current += delta;

    // Translate content; invert current so content moves opposite to scroll
    content.style.transform = `translate3d(0, ${-current}px, 0)`;

    // Sync ScrollTrigger each frame (it still listens to window scroll)
    if (ScrollTrigger && ScrollTrigger.update) ScrollTrigger.update();

    if (delta !== 0) {
      rafId = requestAnimationFrame(raf);
    } else {
      rafId = null;
    }
  };

  const onResize = () => {
    setBodyHeight();
    if (ScrollTrigger && ScrollTrigger.refresh) ScrollTrigger.refresh();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('orientationchange', onResize);

  // Kick things off
  window.scrollTo(0, 0);
  onScroll();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('orientationchange', onResize);
    if (rafId) cancelAnimationFrame(rafId);
    // Reset styles
    wrapper.style.position = '';
    wrapper.style.inset = '';
    wrapper.style.overflow = '';
    wrapper.style.width = '';
    wrapper.style.height = '';
    wrapper.style.willChange = '';
    content.style.willChange = '';
    content.style.transform = '';
    document.body.style.height = '';
    try { if (ScrollTrigger && ScrollTrigger.refresh) ScrollTrigger.refresh(); } catch (_) {}
  };
}


