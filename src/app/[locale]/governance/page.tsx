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

  const t = useTranslations('common');
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
    <div className="flex space-x-6 justify-center">
      <div className="flex flex-col space-y-0 md:space-y-6 flex-1">
        <div className="md:card bg-white px-2 md:p-4">
          <div className="flex border-gray-200 items-stretch">
            {TABS_PC.map((tab) => {
              return (
                <button
                  key={tab.id}
                  id={tab.id}
                  className={clsx('flex-1 py-3 font-bold flex items-center justify-center', {
                    'border-b-2 border-[#3f8efc]': currentTab === tab.id
                  })}
                  onClick={() => setCurrentTab(tab.id as 'actions' | 'topics')}
                >
                  {tab.icon}
                  <span className="text-sm md:text-base">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {currentTab === 'actions' && (
          <div className="flex flex-col space-y-4 md:space-y-6">
            {actions.length > 0 ? (
              actions.map((item) => {
                return (
                  <div key={item.id} className="governance-content border-t shadow-md md:border-y-0 md:shadow-none">
                    <GovActionCard key={item.id} proposal={item} />
                  </div>
                );
              })
            ) : (
              <div>{t('governance.no_data')}</div>
            )}
          </div>
        )}
        {currentTab === 'topics' && (
          <div className="flex flex-col space-y-4 md:space-y-6">
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

      <div className="space-y-6 w-72 sticky top-6 self-start hidden lg:flex lg:flex-col">
        <About />
      </div>
    </div>
  );
}
