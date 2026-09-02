'use client';

import { useMemo, useState } from 'react';
import { FileText, Vote } from 'lucide-react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

import { GovActionCard } from '@/components/governance/GovActionCard';
import governanceData from '@/data/gov-contents-2025-05-15.json';
import { IGovActionContent } from '@/types/governance';
import EmptyList from '@/components/EmptyList';
import { About } from '@/components/governance/About';

type GovernanceClientProps = {
  locale: string;
};

export const GovernanceClient = ({ locale }: GovernanceClientProps) => {
  const [currentTab, setCurrentTab] = useState<'actions' | 'topics'>('actions');
  const t = useTranslations();

  const entries = useMemo(
    () => (governanceData as unknown as Record<string, IGovActionContent[]>)[locale] || [],
    [locale]
  );
  const actions = useMemo(() => entries.filter((item) => item.type === 'action'), [entries]);
  const topics = useMemo(() => entries.filter((item) => item.type === 'proposal'), [entries]);

  const tabs = useMemo(
    () => [
      {
        id: 'actions' as const,
        label: t('governance.actions'),
        icon: <Vote className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
      },
      {
        id: 'topics' as const,
        label: t('governance.hot_topics'),
        icon: <FileText className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
      }
    ],
    [t]
  );

  return (
    <div className="wrap pt-10 pb-24 max-[860px]:pt-7 max-[860px]:pb-[72px] flex gap-6 justify-center">
      <div className="flex flex-col gap-4 md:gap-6 flex-1 min-w-0">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              id={tab.id}
              aria-pressed={currentTab === tab.id}
              className={clsx(
                'flex items-center text-sm font-semibold px-5 py-2.5 rounded-pill transition-all duration-200 ease-brand hover:text-ink',
                currentTab === tab.id
                  ? 'bg-white text-ink shadow-[0_1px_2px_rgba(23,32,38,.06),0_4px_12px_rgba(23,32,38,.08)]'
                  : 'text-body hover:bg-[rgba(255,255,255,.75)]'
              )}
              onClick={() => setCurrentTab(tab.id)}
            >
              {tab.icon}
              <span className="text-sm md:text-base">{tab.label}</span>
            </button>
          ))}
        </div>

        {currentTab === 'actions' && (
          <div className="flex flex-col gap-4 md:gap-6">
            {actions.length > 0 ? (
              actions.map((item) => <GovActionCard key={item.id} proposal={item} />)
            ) : (
              <div className="text-muted text-sm">{t('governance.no_data')}</div>
            )}
          </div>
        )}

        {currentTab === 'topics' && (
          <div className="flex flex-col gap-4 md:gap-6">
            {topics.length > 0 ? (
              topics.map((item) => <GovActionCard key={item.id} proposal={item} />)
            ) : (
              <EmptyList text={t('common.no_data')} />
            )}
          </div>
        )}
      </div>

      <div className="space-y-6 w-72 sticky top-24 self-start hidden lg:flex lg:flex-col">
        <About />
      </div>
    </div>
  );
};
