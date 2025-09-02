import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import { PoolDelegatorsResponse, PoolInfoResponse, PoolStakeSnapshotResponse } from '@/types/koios.types';
import { GlobalConfig } from '@/constants';
import { numberWithCommas } from '@/utils';

import MetricCard from './MetricCard';
import RelayStatusIndicator from './RelayStatusIndicator';
import { StepGuid } from './StepGuid';

export const CardanoStaking = (props: {
  poolInfo: PoolInfoResponse;
  poolStakeSnapshot: PoolStakeSnapshotResponse;
  poolDelegators: PoolDelegatorsResponse;
}) => {
  const t = useTranslations('common');
  const { poolInfo } = props;

  const statistics = useMemo(() => {
    const delegators = poolInfo[0].live_delegators;
    const saturation = poolInfo[0].live_saturation;
    const relays = poolInfo[0].relays;
    const maxRelays = 1;
    const activeRelays = relays.length;
    const activeStake = Number(poolInfo[0].active_stake || 0) / 10 ** 6;

    return {
      delegators,
      saturation,
      maxRelays,
      activeStake,
      activeRelays
    };
  }, [poolInfo]);

  const { delegators, maxRelays, activeRelays, activeStake, saturation } = statistics;

  const guideSteps = [
    {
      title: t('stakingGuide.cardano.steps.step1.title'),
      description: t('stakingGuide.cardano.steps.step1.description')
    },
    {
      title: t('stakingGuide.cardano.steps.step2.title'),
      description: t('stakingGuide.cardano.steps.step2.description')
    },
    {
      title: t('stakingGuide.cardano.steps.step3.title'),
      description: t('stakingGuide.cardano.steps.step3.description')
    }
  ];

  const handleStake = () => {
    window.open(`https://tool.jamonbread.io/delegate/${GlobalConfig.POOL_ID}`, '_blank');
  };

  return (
    <div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <section className="relative z-10 py-8 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-2">
              <div className="candy-gradient text-transparent !bg-clip-text">Pao Pool 🏊</div>
            </h1>
            <p className="text-base md:text-base text-gray-500 leading-relaxed max-w-4xl mx-auto">
              {t('hero.description')}
            </p>
          </div>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-4">
          <MetricCard
            icon="💰"
            title={t('metric.totalPledge')}
            value={numberWithCommas(activeStake)}
            description="ADA"
            progressValue={saturation}
          />
          <MetricCard icon="📈" title={t('metric.estimatedAnnualizedReturn')} value="2.2%" description="APR" />
          <MetricCard icon="👥" title={t('metric.delegator')} value={delegators} />
          <MetricCard
            icon="🔄"
            title={t('metric.relaysStatus')}
            value={
              <div className="py-2">
                <RelayStatusIndicator onlineCount={activeRelays} totalCount={maxRelays} />
              </div>
            }
            description={`${activeRelays}/${maxRelays} ${t('metric.relaysOnline')}`}
          />
        </section>

        <section className="text-center">
          <button
            className="cardano-stake-button px-8 py-4 text-white rounded-2xl shadow-xl font-bold text-lg"
            onClick={handleStake}
          >
            🎯 {`${t('button.stakeNow')} ${t('hero.title')}`}
          </button>
        </section>

        <section className="pt-16">
          <StepGuid title={t('stakingGuide.cardano.title')} steps={guideSteps} />
        </section>
      </div>
    </div>
  );
};
