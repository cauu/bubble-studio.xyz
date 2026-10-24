// S0006 · D layout explorations — shared runtime: epoch clock, stake milestones, copy buttons, ambient particles
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Cardano epochs: 5 days each, epoch 208 (Shelley) started 2020-07-29 21:44:51 UTC
  const EPOCH_LEN = 432000, SHELLEY = Date.UTC(2020, 6, 29, 21, 44, 51) / 1000;
  const pad = (n) => String(n).padStart(2, '0');
  const clock = () => {
    const since = Date.now() / 1000 - SHELLEY;
    const into = since % EPOCH_LEN, rest = Math.floor(EPOCH_LEN - into);
    document.querySelectorAll('[data-ep]').forEach((el) => (el.textContent = 208 + Math.floor(since / EPOCH_LEN)));
    document.querySelectorAll('[data-ep-left]').forEach((el) => (el.textContent = `${Math.floor(rest / 86400)}d ${pad(Math.floor(rest / 3600) % 24)}:${pad(Math.floor(rest / 60) % 60)}:${pad(rest % 60)}`));
    document.querySelectorAll('[data-ep-prog]').forEach((el) => el.style.setProperty('--f', (into / EPOCH_LEN).toFixed(4)));
  };
  clock();
  setInterval(clock, 1000);

  // Stake milestones 1M / 5M / 10M / 20M: exposes --f (progress inside the current stage) and the stage index
  const STAGES = [1e6, 5e6, 10e6, 20e6];
  document.querySelectorAll('[data-goal]').forEach((g) => {
    const stake = parseFloat(g.dataset.goal);
    const next = STAGES.findIndex((s) => stake < s);
    const stage = next === -1 ? STAGES.length - 1 : next;
    const from = stage ? STAGES[stage - 1] : 0;
    const frac = Math.min(1, Math.max(0, (stake - from) / (STAGES[stage] - from)));
    g.style.setProperty('--f', frac.toFixed(5));
    g.style.setProperty('--stage', stage);
    g.querySelectorAll('[data-goal-name]').forEach((el) => (el.textContent = `STAGE 0${stage + 1} · ${STAGES[stage] / 1e6}M ADA`));
    g.querySelectorAll('[data-goal-left]').forEach((el) => (el.textContent = `${Math.round(STAGES[stage] - stake).toLocaleString('en-US')} ADA`));
    g.querySelectorAll('[data-goal-pct]').forEach((el) => (el.textContent = `${(frac * 100).toFixed(2)}%`));
  });

  document.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', () => {
    navigator.clipboard?.writeText(b.dataset.copy).then(() => { const t = b.textContent; b.textContent = 'COPIED'; setTimeout(() => (b.textContent = t), 1400); }).catch(() => {});
  }));

  // Ambient neon particles: pixel squares drift up and twinkle, rare data streaks, pointer pushes them away
  const cv = document.querySelector('.particles');
  if (!cv || reduce) return;
  const ctx = cv.getContext('2d');
  const COLORS = ['#fc5ff6', '#2ffff3', '#fff590', '#31ee6b'];
  let w, h, parts = [], streaks = [], px = -1e4, py = -1e4, last = performance.now(), running = true;
  const rand = (a, b) => a + Math.random() * (b - a);
  const make = (y) => ({ x: rand(0, w), y: y ?? rand(0, h), s: Math.random() < 0.8 ? 2 : 3, vy: rand(6, 18), ph: rand(0, 6.28), sp: rand(0.6, 1.8), c: COLORS[(Math.random() * 4) | 0], dx: 0, dy: 0 });
  const resize = () => {
    const dpr = Math.min(2, devicePixelRatio || 1);
    w = innerWidth; h = innerHeight;
    cv.width = w * dpr; cv.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    parts = Array.from({ length: w < 600 ? 18 : 42 }, () => make());
  };
  resize();
  addEventListener('resize', resize);
  addEventListener('pointermove', (e) => { px = e.clientX; py = e.clientY; }, { passive: true });
  document.addEventListener('visibilitychange', () => { running = !document.hidden; if (running) { last = performance.now(); requestAnimationFrame(frame); } });
  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.y -= p.vy * dt;
      p.ph += p.sp * dt;
      const ddx = p.x - px, ddy = p.y - py, d2 = ddx * ddx + ddy * ddy;
      if (d2 < 14400) { const f = (1 - Math.sqrt(d2) / 120) * 3 * dt; p.dx += ddx * f; p.dy += ddy * f; }
      p.dx *= 0.92; p.dy *= 0.92;
      if (p.y < -10) Object.assign(p, make(h + 10));
      ctx.globalAlpha = Math.min(0.9, 0.18 + 0.22 * (1 + Math.sin(p.ph)) + (d2 < 14400 ? 0.5 : 0));
      ctx.fillStyle = p.c;
      ctx.fillRect(Math.round(p.x + p.dx), Math.round(p.y + p.dy), p.s, p.s);
    }
    if (Math.random() < dt * 0.35) streaks.push({ x: -80, y: rand(80, h - 40), v: rand(600, 1100), l: rand(30, 90), c: COLORS[(Math.random() * 2) | 0] });
    streaks = streaks.filter((st) => st.x < w + 100);
    for (const st of streaks) {
      st.x += st.v * dt;
      const g = ctx.createLinearGradient(st.x - st.l, 0, st.x, 0);
      g.addColorStop(0, 'transparent'); g.addColorStop(1, st.c);
      ctx.globalAlpha = 0.55; ctx.fillStyle = g;
      ctx.fillRect(st.x - st.l, st.y, st.l, 1);
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
