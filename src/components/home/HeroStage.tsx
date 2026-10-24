'use client';

import { CSSProperties, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { GlobalConfig } from '@/constants';
import { STAKE_STAGES, getStakeStage } from '@/lib/epoch';
import { EpochCell } from './EpochCell';

type Props = {
  stakeAda: number | null;
  delegatorCount: number | null;
};

const SEG_COLORS = ['var(--mag)', 'var(--cy)', 'var(--yel)', 'var(--grn)'];
const fmt = (n: number) => Math.round(n).toLocaleString('en-US');
const short = (n: number) => `${n / 1e6}M`;
const cssVars = (vars: Record<string, string | number>) => vars as CSSProperties;

/**
 * Home hero: copy, logo-geometry blocks, live status bar and stake milestones.
 * Runtime (ported from docs/prototypes/s0006/d5-hybrid.html): first-visit intro that assembles P·A·O and morphs
 * into the hero blocks, count-up, one-shot glitch, pointer parallax + scroll break-apart, milestone fill.
 */
export const HeroStage = ({ stakeAda, delegatorCount }: Props) => {
  const t = useTranslations('landing');
  const heroRef = useRef<HTMLElement>(null);
  const goal = stakeAda === null ? null : getStakeStage(stakeAda);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const html = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const heroR = hero.querySelector<HTMLElement>('.hero-r')!;
    const blocks = Array.from(heroR.querySelectorAll<HTMLElement>('.blk'));
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    let raf = 0;
    let disposed = false;

    // One-shot glitch, at most one burst per 1.5 s (WCAG 2.3.1)
    const glitch = hero.querySelector<HTMLElement>('.glitch');
    let lastFire = 0;
    const fire = () => {
      const now = performance.now();
      if (!glitch || reduce || now - lastFire < 1500) return;
      lastFire = now;
      glitch.classList.remove('fire');
      void glitch.offsetWidth;
      glitch.classList.add('fire');
    };
    const h1 = hero.querySelector('h1');
    h1?.addEventListener('pointerenter', fire);

    const countUp = (el: HTMLElement) => {
      const target = Number(el.dataset.hc);
      if (reduce || !Number.isFinite(target)) return;
      const t0 = performance.now();
      const tick = (now: number) => {
        if (disposed) return;
        const p = Math.min(1, (now - t0) / 1200);
        el.textContent = fmt(target * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const fillGoal = () =>
      hero.querySelectorAll<HTMLElement>('.seg').forEach((seg) => {
        const fill = seg.querySelector<HTMLElement>('i');
        if (fill) fill.style.transform = `scaleX(${seg.dataset.fill})`;
        const here = seg.querySelector<HTMLElement>('.here');
        if (here) here.style.left = `max(0px, calc(${(Number(seg.dataset.fill) * 100).toFixed(3)}% - 1px))`;
      });

    const live = () => {
      heroR.style.setProperty('--hr-h', `${heroR.offsetHeight}px`);
      hero.classList.remove('live');
      void hero.offsetWidth;
      hero.classList.add('live');
      hero.querySelectorAll<HTMLElement>('[data-hc]').forEach(countUp);
      later(fillGoal, 300);
      later(fire, 900);
    };

    // Pointer parallax (fine pointers) + scroll break-apart via the `translate` property
    let paused = html.classList.contains('intro-on');
    const fine = window.matchMedia('(pointer: fine)').matches;
    let px = 0;
    let py = 0;
    const cur = blocks.map(() => ({ x: 0, y: 0 }));
    const conf = blocks.map((b) => ({
      d: Number(b.dataset.depth),
      v: (b.dataset.drift || '0,0').split(',').map(Number)
    }));
    const onMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
    };
    const onLeave = () => {
      px = 0;
      py = 0;
    };
    if (fine) hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    let heroVisible = true;
    const vis = new IntersectionObserver(([e]) => {
      heroVisible = e.isIntersecting;
    });
    vis.observe(hero);
    const loop = () => {
      if (disposed) return;
      if (!paused && heroVisible && window.innerWidth >= 901) {
        const s = Math.min(window.scrollY, hero.offsetHeight);
        blocks.forEach((b, i) => {
          const tx = -px * conf[i].d + conf[i].v[0] * s;
          const ty = -py * conf[i].d + conf[i].v[1] * s;
          cur[i].x += (tx - cur[i].x) * 0.12;
          cur[i].y += (ty - cur[i].y) * 0.12;
          b.style.translate = `${cur[i].x.toFixed(1)}px ${cur[i].y.toFixed(1)}px`;
        });
      }
      raf = requestAnimationFrame(loop);
    };
    if (!reduce) raf = requestAnimationFrame(loop);
    const pauseBlocks = () => {
      paused = true;
      blocks.forEach((b, i) => {
        b.style.translate = '';
        cur[i].x = 0;
        cur[i].y = 0;
      });
    };

    // ---------- Intro: P → A → O, then shared-element morph into the hero blocks ----------
    let teardownIntro = () => {};
    const playIntro = () => {
      try {
        sessionStorage.setItem('pao-intro', '1');
      } catch {
        /* storage unavailable: intro simply plays again next visit */
      }
      pauseBlocks();
      html.classList.add('intro-on');
      const previousRestoration = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

      const intro = document.createElement('div');
      intro.className = 'intro';
      intro.setAttribute('role', 'presentation');
      intro.innerHTML = `<div class="grid-bg"></div>
        <span class="corner" style="left:24px;top:22px">${t('intro.left')}</span>
        <span class="corner" style="right:24px;top:22px">${t('intro.right')}</span>
        <span class="count">000</span><span class="bar"></span>
        <div class="studio"></div>`;
      const skip = document.createElement('button');
      skip.className = 'intro-skip';
      skip.type = 'button';
      skip.textContent = t('intro.skip');
      intro.appendChild(skip);
      document.body.appendChild(intro);

      const keys = ['p', 'a', 'o'];
      const targets = keys.map((k) => heroR.querySelector<HTMLElement>(`.blk.${k}`)!);
      const rects = targets.map((el) => el.getBoundingClientRect());
      // Word layout: equal visual height H; P's stem (::after, +42%) counts toward its height
      const H = Math.min(window.innerHeight * 0.3, window.innerWidth * (window.innerWidth < 600 ? 0.27 : 0.2));
      const scales = keys.map((k, i) => H / (k === 'p' ? rects[i].height * 1.42 : rects[i].height));
      const widths = rects.map((r, i) => r.width * scales[i]);
      // P and A nearly touch; A and O overlap so the screen blend mixes colours like the logo
      const gaps = [H * 0.03, -H * 0.2];
      const total = widths.reduce((a, b) => a + b, 0) + gaps[0] + gaps[1];
      const top = window.innerHeight / 2 - H * 0.62;
      let x = (window.innerWidth - total) / 2;
      const word = keys.map((k, i) => {
        const r = rects[i];
        const tx = x - r.left;
        const ty = (k === 'p' ? top : top + H - r.height * scales[i]) - r.top;
        x += widths[i] + (gaps[i] || 0);
        return { tx, ty, s: scales[i] };
      });
      const T = (w: (typeof word)[number], dx = 0, dy = 0, s = w.s) =>
        `translate(${w.tx + dx}px, ${w.ty + dy}px) scale(${s})`;

      const studio = intro.querySelector<HTMLElement>('.studio')!;
      studio.style.top = `${top + H + H * 0.22}px`;
      studio.style.fontSize = `${Math.max(12, H * 0.13)}px`;

      const ghosts = targets.map((el, i) => {
        const g = el.cloneNode(true) as HTMLElement;
        const r = rects[i];
        g.classList.add('ghost');
        Object.assign(g.style, {
          left: `${r.left}px`,
          top: `${r.top}px`,
          width: `${r.width}px`,
          height: `${r.height}px`,
          right: 'auto',
          bottom: 'auto',
          transform: T(word[i]),
          opacity: '0'
        });
        document.body.appendChild(g);
        return g;
      });

      const anims: Animation[] = [];
      const A = (el: Element, kf: Keyframe[], opt: KeyframeAnimationOptions) => {
        const a = el.animate(kf, { fill: 'forwards', ...opt });
        anims.push(a);
        return a;
      };
      const flicker = (el: Element, delay: number) =>
        A(
          el,
          [
            { filter: 'drop-shadow(-10px 0 0 #2ffff3) drop-shadow(10px 0 0 #fc5ff6)', offset: 0 },
            { filter: 'drop-shadow(6px 0 0 #2ffff3) drop-shadow(-6px 0 0 #fc5ff6)', offset: 0.4 },
            { filter: 'drop-shadow(0 0 0 transparent) drop-shadow(0 0 0 transparent)' }
          ],
          { duration: 220, delay, easing: 'steps(3)' }
        );

      const [gp, ga, go] = ghosts;
      const [wp, wa, wo] = word;
      A(
        gp,
        [
          { transform: T(wp, -window.innerWidth * 0.7), opacity: 1 },
          { transform: T(wp), opacity: 1 }
        ],
        {
          duration: 620,
          delay: 250,
          easing: 'cubic-bezier(.16,1,.3,1)'
        }
      );
      flicker(gp, 820);
      A(
        ga,
        [
          { transform: T(wa, 0, -window.innerHeight), opacity: 1 },
          { transform: T(wa, 0, H * 0.06), opacity: 1, offset: 0.72 },
          { transform: T(wa), opacity: 1 }
        ],
        { duration: 560, delay: 600, easing: 'cubic-bezier(.5,0,.75,0)' }
      );
      flicker(ga, 1140);
      const cx = (rects[2].width * wo.s) / 2;
      const cy = (rects[2].height * wo.s) / 2;
      A(
        go,
        [
          { transform: T(wo, cx, cy, 0), opacity: 1 },
          { transform: T(wo), opacity: 1 }
        ],
        {
          duration: 640,
          delay: 950,
          easing: 'cubic-bezier(.34,1.56,.64,1)'
        }
      );
      flicker(go, 1480);

      const count = intro.querySelector<HTMLElement>('.count')!;
      A(intro.querySelector('.bar')!, [{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], {
        duration: 1900,
        easing: 'cubic-bezier(.4,0,.2,1)'
      });
      const t0 = performance.now();
      let countRaf = 0;
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / 1900);
        count.textContent = String(Math.round(p * 100)).padStart(3, '0');
        if (p < 1) countRaf = requestAnimationFrame(tick);
      };
      countRaf = requestAnimationFrame(tick);

      const introTimers: number[] = [];
      'STUDIO'.split('').forEach((_, i) =>
        introTimers.push(
          window.setTimeout(
            () => {
              studio.innerHTML = `${'STUDIO'.slice(0, i + 1)}<span class="cur"></span>`;
            },
            1450 + i * 55
          )
        )
      );

      const realBlocks = () => targets;
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        cancelAnimationFrame(countRaf);
        introTimers.forEach(window.clearTimeout);
        ghosts.forEach((g) => g.remove());
        intro.remove();
        html.classList.remove('intro-on');
        window.history.scrollRestoration = previousRestoration;
        window.removeEventListener('keydown', onSkip);
        window.removeEventListener('wheel', onSkip);
        window.removeEventListener('touchstart', onSkip);
        intro.removeEventListener('click', onSkip);
        if (!disposed) {
          paused = false;
          live();
        }
      };

      let morphing = false;
      const morph = (fast: boolean) => {
        if (morphing) return;
        morphing = true;
        window.clearTimeout(morphTimer);
        introTimers.forEach(window.clearTimeout);
        anims.forEach((a) => a.cancel());
        const dur = fast ? 450 : 1050;
        studio.animate(
          [
            { opacity: 1, transform: 'none' },
            { opacity: 0, transform: 'translateY(-12px)' }
          ],
          {
            duration: 300,
            fill: 'forwards'
          }
        );
        intro.classList.add('out');
        ghosts.forEach((g, i) => {
          g.style.opacity = '1';
          g.animate([{ transform: T(word[i]) }, { transform: 'translate(0,0) scale(1)' }], {
            duration: dur,
            delay: fast ? 0 : i * 70,
            easing: 'cubic-bezier(.76,0,.24,1)',
            fill: 'forwards'
          });
        });
        // Nav and hero copy reveal while the pieces are still travelling; real blocks stay pinned and hidden
        introTimers.push(
          window.setTimeout(
            () => {
              realBlocks().forEach((b) => {
                b.style.animation = 'none';
                b.style.visibility = 'hidden';
              });
              html.classList.remove('intro-on');
            },
            fast ? 80 : 380
          )
        );
        introTimers.push(
          window.setTimeout(
            () => {
              realBlocks().forEach((b) => (b.style.visibility = ''));
              finish();
            },
            dur + (fast ? 20 : 160)
          )
        );
      };

      const onSkip = (e: Event) => {
        if (e instanceof KeyboardEvent && e.key === 'Tab') return;
        morph(true);
      };
      intro.addEventListener('click', onSkip);
      window.addEventListener('keydown', onSkip);
      window.addEventListener('wheel', onSkip, { once: true, passive: true });
      window.addEventListener('touchstart', onSkip, { once: true, passive: true });
      const morphTimer = window.setTimeout(() => morph(false), 2050);

      teardownIntro = () => {
        window.clearTimeout(morphTimer);
        anims.forEach((a) => a.cancel());
        realBlocks().forEach((b) => (b.style.visibility = ''));
        finish();
      };
    };

    // Start on the next frame so a discarded effect run (React StrictMode in dev) never starts the intro
    let introStarted = false;
    const startTimer = window.setTimeout(() => {
      if (html.classList.contains('intro-on') && !reduce) {
        introStarted = true;
        playIntro();
      } else {
        html.classList.remove('intro-on');
        live();
      }
    }, 0);

    return () => {
      disposed = true;
      window.clearTimeout(startTimer);
      if (introStarted) teardownIntro();
      timers.forEach(window.clearTimeout);
      cancelAnimationFrame(raf);
      vis.disconnect();
      h1?.removeEventListener('pointerenter', fire);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    };
    // Mount-only: the runtime owns DOM state after hydration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-h1">
      <div className="hero-l">
        <div className="boot" aria-hidden="true" style={cssVars({ '--k': 0 })}>
          <span style={cssVars({ '--t': '.1s' })}>
            &gt; {t('boot')} <b style={{ color: 'var(--cy)' }}>[OK]</b>
          </span>
        </div>
        <h1 id="hero-h1" style={cssVars({ '--k': 1 })}>
          <span className="row">
            <span className="glitch" data-text={t('titleA')}>
              {t('titleA')}
            </span>
          </span>
          <span className="row">
            <span className="hl">{t('titleB')}</span> {t('titleC')}
          </span>
        </h1>
        <p className="sub" style={cssVars({ '--k': 2 })}>
          <b>{t('subStrong')}</b>
          {t('sub')}
          <span className="nw">{t('subTail')}</span>
        </p>
        <div className="ctas" style={cssVars({ '--k': 3 })}>
          <a className="cbtn" href={GlobalConfig.DELEGATE_URL} target="_blank" rel="noopener noreferrer">
            {t('ctaStake')}
          </a>
          <a className="cbtn alt" href="#works">
            {t('ctaWorks')}
          </a>
        </div>
      </div>

      <div className="hero-r" aria-hidden="true">
        <div className="grid-bg" />
        <div className="blk p" data-depth="18" data-drift="-0.35,-0.12" />
        <div className="blk a" data-depth="30" data-drift="0.42,-0.05" />
        <div className="blk o" data-depth="24" data-drift="0.06,0.32" />
        <div className="blk g" data-depth="44" data-drift="0.55,-0.3" />
        <div className="blk v" data-depth="38" data-drift="-0.45,0.2" />
        <div className="scan" />
        <span className="label" style={{ left: '6%', top: '4%' }}>
          P // POOL
        </span>
        <span className="label" style={{ right: '4%', top: '64%', background: 'var(--cy)' }}>
          A // AI
        </span>
        <span className="label" style={{ left: '30%', bottom: '3%', background: 'var(--yel)' }}>
          O // OPEN
        </span>
      </div>

      <div className="statbar" role="group" aria-label={t('stat.statusLabel')}>
        <div className="cell">
          <span className="k">
            <i className="live-dot" aria-hidden="true" />
            {t('stat.stake')}
          </span>
          <span className="v tnum" data-hc={stakeAda ?? undefined}>
            {stakeAda === null ? '—' : fmt(stakeAda)}
          </span>
          <small className="v" style={{ fontSize: 13, color: 'var(--fg-dim)' }}>
            {' '}
            ADA
          </small>
        </div>
        <div className="cell">
          <span className="k">{t('stat.delegators')}</span>
          <span className="v mag tnum">{delegatorCount ?? '—'}</span>
        </div>
        <EpochCell />
        <a className="cell go" href={GlobalConfig.CARDANOSCAN_POOL_URL} target="_blank" rel="noopener noreferrer">
          {t('stat.verify')}
        </a>
        {goal && (
          <div className="goal" role="group" aria-label={t('goal.label')}>
            <div className="gk">
              {t('goal.next')}
              <b>
                STAGE 0{goal.stage + 1} · {short(goal.target)} ADA
              </b>
            </div>
            <div className="track" aria-hidden="true">
              {STAKE_STAGES.map((target, i) => (
                <div
                  key={target}
                  className={`seg${i === goal.stage ? ' cur' : ''}`}
                  data-fill={i < goal.stage ? 1 : i === goal.stage ? goal.progress.toFixed(5) : 0}
                  style={cssVars({ '--c': SEG_COLORS[i] })}
                >
                  <i />
                  <span>
                    S{i + 1} · {short(target)}
                  </span>
                  {i === goal.stage && <span className="here" data-label={t('goal.here')} />}
                </div>
              ))}
            </div>
            <div className="gv">
              {t('goal.left')}
              <b className="tnum">{fmt(goal.left)} ADA</b>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
