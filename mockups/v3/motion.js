/* Scroll-linked spatial imagery: no scroll interception, dependencies or requests. */
(() => {
  'use strict';
  const root = document.body;
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.querySelector('#motion-toggle');
  const elements = [...document.querySelectorAll('[data-motion]')];
  const active = new Set();
  let paused = false;
  let frame = 0;
  try { paused = sessionStorage.getItem('lavish-v3-motion') === 'paused'; } catch {}
  const disabled = () => preference.matches || paused;
  const clear = () => elements.forEach(element => {
    element.style.removeProperty('--motion-transform');
    element.style.removeProperty('--motion-y');
  });
  function render() {
    frame = 0;
    if (disabled() || document.hidden) return;
    const height = innerHeight;
    const mobile = innerWidth <= 640;
    // Read geometry together, then write transforms; avoid read/write layout thrashing.
    const positions = [...active].map(element => ({element, rect: element.getBoundingClientRect()}));
    positions.forEach(({element, rect}) => {
      const progress = Math.max(-1, Math.min(1, (height / 2 - (rect.top + rect.height / 2)) / ((height + rect.height) / 2)));
      const amount = mobile ? .45 : 1;
      if (element.dataset.motion === 'panorama') {
        element.style.setProperty('--motion-y', `${progress * 16 * amount}px`);
      } else {
        const object = element.dataset.motion === 'object';
        const detail = element.dataset.motion === 'detail';
        const y = progress * (detail ? -40 : 24) * amount;
        const rx = progress * (object ? 8 : 3) * amount;
        const ry = progress * (object ? -10 : detail ? 4 : -3) * amount;
        element.style.setProperty('--motion-transform', `perspective(1200px) translate3d(0,${y}px,0) rotateX(${rx}deg) rotateY(${ry}deg)`);
      }
    });
  }
  function requestRender() {
    if (!frame && !disabled() && !document.hidden) frame = requestAnimationFrame(render);
  }
  function sync() {
    root.toggleAttribute('data-motion-paused', disabled());
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    clear();
    if (button) {
      button.hidden = false;
      button.disabled = preference.matches;
      button.setAttribute('aria-pressed', String(disabled()));
      button.textContent = preference.matches ? 'Reduced motion' : paused ? 'Enable motion' : 'Pause motion';
    }
    requestRender();
  }
  if (button) button.addEventListener('click', () => {
    paused = !paused;
    try { sessionStorage.setItem('lavish-v3-motion', paused ? 'paused' : 'enabled'); } catch {}
    sync();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.isIntersecting ? active.add(entry.target) : active.delete(entry.target));
      requestRender();
    }, {rootMargin:'100px'});
    elements.forEach(element => observer.observe(element));
  } else elements.forEach(element => active.add(element));
  addEventListener('scroll', requestRender, {passive:true});
  addEventListener('resize', requestRender, {passive:true});
  document.addEventListener('visibilitychange', requestRender);
  preference.addEventListener('change', sync);
  sync();
})();
