import { useState } from 'react';
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

interface GovernanceProps {
  actions: IGovActionContent[];
  proposals: any[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<GovernanceProps> = async () => {
  try {
    // const actions = await getGovernanceActions();
    // const proposals = await getGovernanceProposals();
    const actions = governanceData.Chinese_Simplified.filter((item) => item.type === 'action') as any;
    const proposals = governanceData.Chinese_Simplified.filter((item) => item.type === 'proposal');

    return {
      props: {
        actions,
        proposals
      }
    };
  } catch (error) {
    console.error('获取治理数据失败:', error);
    return {
      props: {
        actions: [],
        proposals: [],
        error: '获取数据失败，请稍后重试'
      }
    };
  }
};

const TABS_PC = [
  {
    id: 'actions',
    label: '治理行动',
    icon: <Vote className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
  },
  {
    id: 'topics',
    label: '提案讨论',
    icon: <FileText className="w-4 h-4 md:w-5 md:h-5 mr-1 md:mr-2" />
  }
];

export default function Governance({ actions, proposals, error }: GovernanceProps) {
  // const [currentProposalId, setCurrentProposalId] = useState(data[0]?.id);
  const [currentTab, setCurrentTab] = useState<'actions' | 'topics'>('actions');

  // const currentProposal = data.find((item) => item.id === currentProposalId);

  // const handleTabChange = (id: string) => {
  //   setCurrentProposalId(id);
  // };

  if (error) return <div>错误: {error}</div>;

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
              <div>暂无治理数据</div>
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
              <EmptyList />
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
