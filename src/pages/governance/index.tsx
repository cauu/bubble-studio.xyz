import { useMemo, useState } from 'react';
import { FileText, Vote } from 'lucide-react';
import clsx from 'clsx';
import { GetServerSideProps } from 'next';

// import { IGovernanceAction } from '@/types/governance';
import { GovActionCard } from '@/pages/governance/components/GovActionCard';
// import { Dreps } from '@/pages/governance/components/Dreps';
import governanceData from '@/data/gov-contents-2025-05-15.json';
import { IGovActionContent } from '@/types/governance';
import EmptyList from '@/components/EmptyList';

import { About } from './components/About';
import { ProposalCard } from './components/ProposalCard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

interface GovernanceProps {
  actions: IGovActionContent[];
  proposals: any[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<GovernanceProps> = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'en', ['common']);

  try {
    const actions = governanceData[locale as string].filter((item) => item.type === 'action') as any;
    const proposals = governanceData[locale as string].filter((item) => item.type === 'proposal');

    return {
      props: {
        actions,
        proposals,
        ...translations
      }
    };
  } catch (error: any) {
    return {
      props: {
        actions: [],
        proposals: [],
        error: error.message || translations._nextI18Next?.initialI18nStore('error.get_data_failed')
      }
    };
  }
};

export default function Governance({ actions, proposals, error }: GovernanceProps) {
  const [currentTab, setCurrentTab] = useState<'actions' | 'topics'>('actions');
  const { t } = useTranslation();

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

  if (error) return <div>{error}</div>;

  return (
    <div className="flex space-x-6 justify-center">
      <div className="flex flex-col space-y-6 flex-1">
        <div className="card bg-white p-2 md:p-4">
          <div className="flex border-b border-gray-200">
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
          <div className="flex flex-col space-y-6">
            {actions.length > 0 ? (
              actions.map((item) => {
                return (
                  <div key={item.id} className="governance-content">
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
          <div className="flex flex-col space-y-6">
            {proposals.length > 0 ? (
              proposals.map((item) => {
                return <ProposalCard key={item} />;
              })
            ) : (
              // <div>暂无提案数据</div>
              <EmptyList text={t('common.no_data')} />
            )}
          </div>
        )}
      </div>

      <div className="space-y-6 w-72 sticky top-6 self-start hidden md:flex md:flex-col">
        {/* <Dreps /> */}

        <About />
      </div>
    </div>
  );
}
