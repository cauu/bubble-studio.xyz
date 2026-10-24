'use client';

import { useEffect, useState } from 'react';
import { formatEpochCountdown, getEpochState } from '@/lib/epoch';

type Props = {
  /** Which value to render */
  part: 'epoch' | 'left';
  className?: string;
};

/** Live Cardano epoch number or countdown. Renders an em dash until mounted to avoid hydration drift. */
export const EpochClock = ({ part, className }: Props) => {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (now === null) return <span className={className}>—</span>;
  const state = getEpochState(now);

  return (
    <span className={className} suppressHydrationWarning>
      {part === 'epoch' ? state.epoch : formatEpochCountdown(state.secondsLeft)}
    </span>
  );
};
