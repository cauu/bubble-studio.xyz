'use client';

import { useMemo, useState, useEffect } from 'react';
import { FileText, Vote } from 'lucide-react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

import { GovActionCard } from '@/components/governance/GovActionCard';
import governanceData from '@/data/gov-contents-2025-05-15.json';
import { IGovActionContent } from '@/types/governance';
import EmptyList from '@/components/EmptyList';
import { About } from '@/components/governance/About';
import { ProposalCard } from '@/components/governance/ProposalCard';

// Note: generateMetadata cannot be used in client components
// Metadata should be handled in a parent layout or wrapper component

export default function Governance() {
  const [currentTab, setCurrentTab] = useState<'actions' | 'topics'>('actions');
  const [actions, setActions] = useState<IGovActionContent[]>([]);
  const [proposals, setProposals] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

  const t = useTranslations();
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    try {
      const actionData = (governanceData as any)[locale]?.filter((item: any) => item.type === 'action') || [];
      const proposalData = (governanceData as any)[locale]?.filter((item: any) => item.type === 'proposal') || [];

      setActions(actionData);
      setProposals(proposalData);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [locale]);

  const TABS_PC = useMemo(
    () => [
      {
        id: 'actions',
        label: t('governance.actions'),
        icon: <Vote className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
      },
      {
        id: 'topics',
        label: t('governance.hot_topics'),
        icon: <FileText className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
      }
    ],
    [t]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="wrap pt-10 pb-24 max-[860px]:pt-7 max-[860px]:pb-[72px] flex gap-6 justify-center">
      <div className="flex flex-col gap-4 md:gap-6 flex-1 min-w-0">
        <div className="flex flex-wrap gap-2">
          {TABS_PC.map((tab) => {
            return (
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
                onClick={() => setCurrentTab(tab.id as 'actions' | 'topics')}
              >
                {tab.icon}
                <span className="text-sm md:text-base">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {currentTab === 'actions' && (
          <div className="flex flex-col gap-4 md:gap-6">
            {actions.length > 0 ? (
              actions.map((item) => {
                return <GovActionCard key={item.id} proposal={item} />;
              })
            ) : (
              <div className="text-muted text-sm">{t('governance.no_data')}</div>
            )}
          </div>
        )}
        {currentTab === 'topics' && (
          <div className="flex flex-col gap-4 md:gap-6">
            {proposals.length > 0 ? (
              proposals.map((item) => {
                return <ProposalCard key={item} />;
              })
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
}
