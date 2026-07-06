import clsx from 'clsx';
import { ReactNode } from 'react';

export type ChipColor = 'card' | 'blank' | 'sky' | 'mint' | 'lavender' | 'grass' | 'lemon';

const colorClass: Record<ChipColor, string> = {
  card: 'bg-surface-card',
  blank: 'bg-surface-blank border border-hairline',
  sky: 'bg-brand-sky',
  mint: 'bg-brand-mint',
  lavender: 'bg-brand-lavender',
  grass: 'bg-brand-grass',
  lemon: 'bg-brand-lemon'
};

type Props = {
  color?: ChipColor;
  /** CSS color of the leading dot; renders no dot when omitted */
  dotColor?: string;
  /** Pulses the dot (live indicator) */
  live?: boolean;
  className?: string;
  children: ReactNode;
};

export const Chip = ({ color = 'card', dotColor, live = false, className, children }: Props) => (
  <span
    className={clsx(
      'inline-flex items-center gap-[7px] text-[13px] font-semibold leading-none text-ink px-[13px] py-[7px] rounded-pill',
      colorClass[color],
      className
    )}
  >
    {dotColor && (
      <span
        className={clsx('w-[9px] h-[9px] rounded-full flex-none', live && 'animate-pulse-dot')}
        style={{ background: dotColor }}
        aria-hidden="true"
      />
    )}
    {children}
  </span>
);
