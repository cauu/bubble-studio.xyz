'use client';

import { useEffect, useRef } from 'react';

type DottedGlowBackgroundProps = {
  className?: string;
  gap?: number;
  radius?: number;
  color?: string;
  glowColor?: string;
  opacity?: number;
  speedMin?: number;
  speedMax?: number;
  speedScale?: number;
};

// Local port of Aceternity UI's canvas-based Dotted Glow Background.
export const DottedGlowBackground = ({
  className,
  gap = 20,
  radius = 1,
  color = 'rgba(19, 88, 93, 0.24)',
  glowColor = 'rgba(85, 202, 232, 0.62)',
  opacity = 0.42,
  speedMin = 0.25,
  speedMax = 0.7,
  speedScale = 0.45
}: DottedGlowBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !container || !context) return;

    type Dot = { x: number; y: number; phase: number; speed: number };
    let dots: Dot[] = [];
    let frame = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    const dpr = Math.min(Math.max(1, window.devicePixelRatio || 1), 1.5);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${Math.floor(width)}px`;
      canvas.style.height = `${Math.floor(height)}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      const columns = Math.ceil(width / gap) + 2;
      const rows = Math.ceil(height / gap) + 2;
      const min = Math.min(speedMin, speedMax);
      const span = Math.abs(speedMax - speedMin);
      dots = [];

      for (let column = -1; column < columns; column += 1) {
        for (let row = -1; row < rows; row += 1) {
          dots.push({
            x: column * gap + (row % 2 === 0 ? 0 : gap * 0.5),
            y: row * gap,
            phase: Math.random() * Math.PI * 2,
            speed: min + Math.random() * span
          });
        }
      }
    };

    const draw = (now: number) => {
      const { width, height } = container.getBoundingClientRect();
      context.clearRect(0, 0, width, height);
      context.save();
      context.fillStyle = color;
      const time = reduceMotion ? 0 : (now / 1000) * Math.max(speedScale, 0);

      dots.forEach((dot) => {
        const mod = (time * dot.speed + dot.phase) % 2;
        const intensity = mod < 1 ? mod : 2 - mod;
        const alpha = 0.25 + 0.55 * intensity;

        if (alpha > 0.6) {
          context.shadowColor = glowColor;
          context.shadowBlur = 6 * ((alpha - 0.6) / 0.4);
        } else {
          context.shadowColor = 'transparent';
          context.shadowBlur = 0;
        }

        context.globalAlpha = alpha * opacity;
        context.beginPath();
        context.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        context.fill();
      });
      context.restore();

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    const start = () => {
      if (visible && pageVisible && frame === 0) frame = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    resizeObserver.observe(container);
    resize();

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(container);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };
    document.addEventListener('visibilitychange', onVisibility);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [color, gap, glowColor, opacity, radius, speedMax, speedMin, speedScale]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="block size-full" />
    </div>
  );
};
