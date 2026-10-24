// S0006 prototypes — shared reveal + count-up helpers
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const countUp = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const fmt = (v) => prefix + v.toFixed(decimals) + suffix;
    if (reduce) {
      el.textContent = fmt(target);
      return;
    }
    const dur = parseInt(el.dataset.duration || '1400', 10);
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const show = (el) => {
    el.classList.add('in');
    el.querySelectorAll('[data-count]').forEach(countUp);
    if (el.matches('[data-count]')) countUp(el);
  };

  const targets = document.querySelectorAll('[data-reveal], [data-count]');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(show);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        setTimeout(() => show(el), parseInt(el.dataset.delay || '0', 10));
        io.unobserve(el);
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -6% 0px' }
  );
  targets.forEach((el) => {
    // Count-ups nested in a reveal block are started by the block
    if (el.matches('[data-count]') && el.closest('[data-reveal]')) return;
    io.observe(el);
  });
})();
