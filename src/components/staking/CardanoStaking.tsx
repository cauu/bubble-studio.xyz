import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import { PoolInfoResponse, PoolStakeSnapshotResponse } from '@/types/koios.types';
import { GlobalConfig } from '@/constants';
import { numberWithCommas } from '@/utils';

import MetricCard from './MetricCard';
import RelayStatusIndicator from './RelayStatusIndicator';
import { StepGuid } from './StepGuid';
import { ExternalLink, Link2, Link2OffIcon } from 'lucide-react';

export const CardanoStaking = (props: { poolInfo: PoolInfoResponse; poolStakeSnapshot: PoolStakeSnapshotResponse }) => {
  const t = useTranslations();
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

  const handleToDetail = () => {
    window.open('https://cardanoscan.io/pool/pool1jh5p5627hzqxdzjutfenz83qs7p2qtha4kvst3hs0829sdc0ksm', '_blank');
  }

  return (
    <div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <section className="relative z-10 py-8 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center">
              <h1 className="text-4xl md:text-5xl font-black mb-2">
                <div className="candy-gradient text-transparent !bg-clip-text">
                  Pao Pool
                </div>
              </h1>
              <ExternalLink strokeWidth={2} className="w-5 h-5 ml-2 cursor-pointer text-gray-500 hover:text-blue-400" onClick={handleToDetail} />
            </div>

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
