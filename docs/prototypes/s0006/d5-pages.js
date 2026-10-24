// S0006 · D5 site pages — reveal on enter + depth parallax (pairs with dx-fx.js for particles / epoch / copy)
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rises = document.querySelectorAll('.rise');
  if (reduce || !('IntersectionObserver' in window)) rises.forEach((el) => el.classList.add('in'));
  else {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    rises.forEach((el) => io.observe(el));
  }
  if (reduce) return;
  const wide = matchMedia('(min-width: 901px)');
  const els = [...document.querySelectorAll('[data-py]')];
  let ticking = false;
  const update = () => {
    ticking = false;
    if (!wide.matches) return;
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) return;
      // Measure without the current offset to avoid feedback
      const off = r.top - (el._ty || 0) + r.height / 2 - innerHeight / 2;
      el._ty = off * +el.dataset.py;
      el.style.transform = `translate3d(0,${el._ty.toFixed(1)}px,0)`;
    });
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
})();
