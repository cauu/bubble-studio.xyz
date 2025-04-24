import { GetServerSideProps } from 'next';
import { getGovernanceActions } from '@/services';
import { IGovernanceAction } from '@/types/governance';
import { GovActionCard } from '@/pages/governance/components/GovActionCard';
import { ProposalCard } from '@/pages/governance/components/ProposalCard';
import { Dreps } from '@/pages/governance/components/Dreps';
import { useState } from 'react';
import { About } from './components/About';

interface GovernanceProps {
  data: IGovernanceAction[];
  error?: string;
}

export const getServerSideProps: GetServerSideProps<GovernanceProps> = async () => {
  try {
    const actions = await getGovernanceActions();
    return {
      props: {
        data: actions
      }
    };
  } catch (error) {
    console.error('获取治理数据失败:', error);
    return {
      props: {
        data: [],
        error: '获取数据失败，请稍后重试'
      }
    };
  }
};

export default function Governance({ data, error }: GovernanceProps) {
  const [currentProposalId, setCurrentProposalId] = useState(data[0]?.id);

  const currentProposal = data.find((item) => item.id === currentProposalId);

  const handleTabChange = (id: string) => {
    setCurrentProposalId(id);
  };

  if (error) return <div>错误: {error}</div>;

  return (
    <div className="flex space-x-6 justify-center">
      <div className="flex flex-col space-y-6">
        <div className="flex-1">
          {data.length > 0 ? (
            <div className="governance-content">
              {/* 投票标签页 */}
              <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
                {data.map((proposal) => (
                  <button
                    key={proposal.id}
                    className={`tab ${proposal.id === currentProposal?.id ? 'tab-active' : 'tab-inactive'} border-3 border-[#0a2463] rounded-t-lg px-4 py-2 font-bold`}
                    onClick={() => handleTabChange(proposal.id)}
                  >
                    提案 #{proposal.title}
                  </button>
                ))}
              </div>

              {currentProposal && <GovActionCard key={currentProposal.id} proposal={currentProposal} />}
            </div>
          ) : (
            <div>暂无治理数据</div>
          )}
        </div>

        <div className="flex-1">
          <ProposalCard />
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        <Dreps />

        <About />
      </div>
    </div>
  );
}
