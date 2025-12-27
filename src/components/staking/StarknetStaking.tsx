import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import { ValidatorData } from '@/types/voyager.types';
import { GlobalConfig } from '@/constants';
import { numberWithCommas } from '@/utils';

import { StepGuid } from './StepGuid';
import MetricCard from './MetricCard';
import RelayStatusIndicator from './RelayStatusIndicator';
import { ExternalLink } from 'lucide-react';

export const StarknetStaking = (props: { validatorInfo: ValidatorData | null }) => {
  const { validatorInfo } = props;

  const t = useTranslations();

  const statistics = useMemo(() => {
    const { uptime, total_stake, total_delegators, apy, status } = validatorInfo || {};

    return {
      totalStake: Number(total_stake || 0),
      liveness: uptime,
      totalDelegators: total_delegators,
      apy: Number(apy || 6.22).toFixed(2),
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

  const handleToDetail = () => {
    window.open(`https://dashboard.endur.fi/validator/${GlobalConfig.STARKNET_VALIDATOR_ADDRESS}`, '_blank');
  };

  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-0">
      <section className="relative z-10 py-6 md:py-8 px-2 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl md:text-5xl font-black mb-2 flex items-center justify-center">
              <div className="starknet-gradient text-transparent !bg-clip-text">Bubble Validator️</div>
            </h1>
            <ExternalLink
              strokeWidth={2}
              className="w-4 h-4 md:w-5 md:h-5 ml-2 cursor-pointer text-gray-500 hover:text-purple-500"
              onClick={handleToDetail}
            />
          </div>

          <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-4xl mx-auto">
            {t('hero.starknet.description')}
          </p>
        </div>
      </section>

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 mt-2 md:mt-4">
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
          icon="👥"
          title={t('metric.delegator')}
          value={<div className="starknet-gradient text-transparent !bg-clip-text">{`${totalDelegators}`}</div>}
        />
        <MetricCard
          icon="🔄"
          title={t('metric.relaysStatus')}
          value={
            <div className="py-1 md:py-2">
              {isActive ? (
                <RelayStatusIndicator onlineCount={1} totalCount={1} />
              ) : (
                <RelayStatusIndicator onlineCount={0} totalCount={1} />
              )}
            </div>
          }
          description={`${liveness}% ${t('metric.relaysOnline')}`}
        />
      </section>

      <div className="text-center px-4">
        <button
          className="starknet-stake-button w-full md:w-auto px-6 md:px-8 py-3 md:py-4 text-white rounded-xl md:rounded-2xl shadow-xl font-bold text-base md:text-lg transition-all"
          onClick={handleStake}
        >
          ⚡ {`${t('button.stakeNow')} ${t('hero.starknet.title')}`}
        </button>
      </div>

      <section className="pt-8 md:pt-16">
        <StepGuid title={t('stakingGuide.starknet.title')} steps={guideSteps} theme="starknet" />
      </section>
    </div>
  );
};
