import { GetServerSideProps } from 'next';
import { getGovernanceActions } from '@/services';
import { IGovernanceAction } from '@/types/governance';
import { GovActionCard } from '@/components/GovActionCard';

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
  if (error) return <div>错误: {error}</div>;

  return (
    <div className="governance-container">
      <h1>治理</h1>
      {data.length > 0 ? (
        <div className="governance-content">
          {data.map((item) => (
            <GovActionCard key={item.id} proposal={item} />
          ))}
        </div>
      ) : (
        <div>暂无治理数据</div>
      )}
    </div>
  );
}
