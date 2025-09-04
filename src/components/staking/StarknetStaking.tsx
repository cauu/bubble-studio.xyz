import { useMemo } from 'react';
import { useTranslations } from 'next-intl';


import { ValidatorData } from '@/types/voyager.types';
import { GlobalConfig } from '@/constants';
import { numberWithCommas } from '@/utils';

import { StepGuid } from './StepGuid';
import MetricCard from './MetricCard';
import RelayStatusIndicator from './RelayStatusIndicator';

export const StarknetStaking = (props: { validatorInfo: ValidatorData | null }) => {
  const { validatorInfo } = props;

  const t = useTranslations();

  const statistics = useMemo(() => {
    const { uptime, total_stake, total_delegators, apy, status } = validatorInfo || {};

    return {
      totalStake: Number(total_stake || 0),
      liveness: uptime,
      totalDelegators: total_delegators,
      apy: Number(apy || 0).toFixed(2),
      isActive: status === 'active'
    };
  }, [validatorInfo]);

  const { totalStake, liveness, totalDelegators, apy, isActive } = statistics;

  const guideSteps = [
    {
      title: t('stakingGuide.starknet.steps.step1.title'),
      description: t('stakingGuide.starknet.steps.step1.description')
    },
    {
      title: t('stakingGuide.starknet.steps.step2.title'),
      description: t('stakingGuide.starknet.steps.step2.description')
    },
    {
      title: t('stakingGuide.starknet.steps.step3.title'),
      description: t('stakingGuide.starknet.steps.step3.description')
    },
    {
      title: t('stakingGuide.starknet.steps.step4.title'),
      description: t('stakingGuide.starknet.steps.step4.description')
    }
  ];

  const handleStake = () => {
    window.open(`https://voyager.online/staking?validator=${GlobalConfig.STARKNET_VALIDATOR_ADDRESS}`, '_blank');
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto">
      <section className="relative z-10 py-8 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-2">
            <div className="starknet-gradient text-transparent !bg-clip-text">Bubble Validator️ ⚡</div>
          </h1>
          <p className="text-base md:text-base text-gray-500 leading-relaxed max-w-4xl mx-auto">
            {t('hero.starknet.description')}
          </p>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-4">
        <MetricCard
          icon="💰"
          title={t('metric.totalPledge')}
          value={<div className="starknet-gradient text-transparent !bg-clip-text">{numberWithCommas(totalStake)}</div>}
          description="STRK"
        />
        <MetricCard
          icon="📈"
          title={t('metric.estimatedAnnualizedReturn')}
          value={<div className="starknet-gradient text-transparent !bg-clip-text">{`${apy}%`}</div>}
        />
        <MetricCard
          icon="🔄"
          title={t('metric.delegator')}
          value={<div className="starknet-gradient text-transparent !bg-clip-text">{`${totalDelegators}`}</div>}
        />
        <MetricCard
          icon="🟢"
          title={t('metric.relaysStatus')}
          value={
            <div className="py-2">
              {isActive ? <RelayStatusIndicator onlineCount={1} totalCount={1} /> : <RelayStatusIndicator onlineCount={0} totalCount={1} />}
            </div>
          }
          description={`${liveness}% ${t('metric.relaysOnline')}`}
        />
      </section>

      <div className="text-center">
        <button
          className="starknet-stake-button px-8 py-4 text-white rounded-2xl shadow-xl font-bold text-lg transition-all"
          onClick={handleStake}
        >
          ⚡ {`${t('button.stakeNow')} ${t('hero.starknet.title')}`}
        </button>
      </div>

      <section className="pt-16">
        <StepGuid title={t('stakingGuide.starknet.title')} steps={guideSteps} theme="starknet" />
      </section>
    </div>
  );
};
