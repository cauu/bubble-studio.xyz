'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GovActionCard } from '@/components/governance/GovActionCard';
import { EpochClock } from '@/components/neon/EpochClock';
import type { GovernanceSummary } from '@/types/governance';

export const GovernanceClient = ({ entries }: { entries: GovernanceSummary[] }) => {
  const [tab, setTab] = useState<'actions' | 'topics'>('actions');
  const t = useTranslations('governance');
  const p = useTranslations('pages');
  const filtered = entries.filter((item) => item.type === (tab === 'actions' ? 'action' : 'proposal'));
  return (
    <>
      <div className="lane govgrid">
        <div>
          <div className="tabs" aria-label={t('page_title')}>
            {(['actions', 'topics'] as const).map((key) => (
              <button key={key} className="chip-btn" aria-pressed={tab === key} onClick={() => setTab(key)}>
                {t(key === 'actions' ? 'actions' : 'hot_topics')}
              </button>
            ))}
          </div>
          <div className="acts">
            {filtered.map((item, index) => (
              <GovActionCard key={item.id} proposal={item} index={index} />
            ))}
            {!filtered.length && <p>{t('no_data')}</p>}
          </div>
          <p className="snap meta">{p('snapshot')}</p>
        </div>
        <aside className="side">
          <div className="term">
            <header>gov --about</header>
            <div className="body">
              <h2>{t('about_title')}</h2>
              <p>{t('about_content')}</p>
            </div>
          </div>
          <div className="term epoch-panel">
            <header>cardano --epoch</header>
            <div className="body">
              <div className="row">
                <span className="k">epoch</span>
                <span className="v">
                  <EpochClock part="epoch" />
                </span>
              </div>
              <div className="row">
                <span className="k">remaining</span>
                <span className="v">
                  <EpochClock part="left" />
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <div className="sec-end" />
    </>
  );
};
