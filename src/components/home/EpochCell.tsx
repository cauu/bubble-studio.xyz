'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { formatEpochCountdown, getEpochState } from '@/lib/epoch';

/** Status-bar cell: current epoch, live countdown and an elapsed-epoch progress rule */
export const EpochCell = () => {
  const t = useTranslations('landing.stat');
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const state = now === null ? null : getEpochState(now);

  return (
    <div className="cell">
      <span className="k">
        {t('epoch')} <b className="tnum">{state ? state.epoch : '—'}</b> · {t('left')}
      </span>
      <span className="v grn tnum">{state ? formatEpochCountdown(state.secondsLeft) : '--:--:--'}</span>
      <i
        className="prog"
        aria-hidden="true"
        style={{ transform: `scaleX(${state ? state.progress.toFixed(4) : 0})` }}
      />
    </div>
  );
};
