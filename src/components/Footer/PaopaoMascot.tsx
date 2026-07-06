import clsx from 'clsx';

type Props = {
  /** Outer size in px */
  size?: number;
  /** Color of the eye highlight circle — match the surface behind the mascot */
  highlight?: 'canvas' | 'soft';
  className?: string;
  label?: string;
};

/** CSS-only Paopao placeholder: sky bubble body + surface highlight + lavender satellite */
export const PaopaoMascot = ({ size = 48, highlight = 'soft', className, label }: Props) => (
  <div
    className={clsx('relative flex-none', className)}
    style={{ width: size, height: size }}
    role={label ? 'img' : undefined}
    aria-label={label}
    aria-hidden={label ? undefined : true}
  >
    <span className="absolute inset-0 rounded-full bg-brand-sky" />
    <span
      className={clsx('absolute rounded-full', highlight === 'canvas' ? 'bg-canvas' : 'bg-surface-soft')}
      style={{ width: size * 0.31, height: size * 0.31, top: size * 0.2, left: size * 0.19 }}
    />
    <span
      className="absolute rounded-full bg-brand-lavender"
      style={{ width: size * 0.19, height: size * 0.19, right: -size * 0.04, top: -size * 0.05 }}
    />
  </div>
);
