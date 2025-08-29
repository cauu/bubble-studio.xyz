import { useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

import { getPoolInfo, getPoolStakeSnapshot } from '@/services/pool';
import { PoolDelegatorsResponse, PoolInfoResponse, PoolStakeSnapshotResponse } from '@/types/koios.types';
import { GlobalConfig } from '@/constants';
import { WrappedMemoryCache } from '@/utils/WrappedMemoryCache';

import { CardanoStaking } from '@/components/staking/CardanoStaking';
import { StarknetStaking } from '@/components/staking/StarknetStaking';
import { getValidatorInfo } from '@/services/starknet-validator';
import { ValidatorData } from '@/types/voyager.types';

const poolInfoCache = new WrappedMemoryCache({
  ttl: 1000 * 60 * 10,
  refreshThreshold: 1000 * 60 * 5,
  refreshFn: () => {
    return async () => {
      const [poolInfo, poolStakeSnapshot] = await Promise.all([
        getPoolInfo([GlobalConfig.POOL_ID]),
        getPoolStakeSnapshot(GlobalConfig.POOL_ID)
      ]);

      return {
        poolInfo,
        poolStakeSnapshot
      };
    };
  }
});

export const getServerSideProps: GetServerSideProps<any> = async ({ locale }) => {
  const translations = await serverSideTranslations(locale || 'en', ['common']);

  const poolInfoCacheValue = await poolInfoCache.getCachedValue<{
    poolInfo: PoolInfoResponse;
    poolStakeSnapshot: PoolStakeSnapshotResponse;
  }>('poolInfo');

  if (!poolInfoCacheValue) {
    throw new Error('Failed to fetch pool info');
  }

  const { poolInfo, poolStakeSnapshot } = poolInfoCacheValue;

  return {
    props: {
      ...translations,
      poolInfo,
      poolStakeSnapshot
    }
  };
};

export default function Staking(props: {
  poolInfo: PoolInfoResponse;
  poolStakeSnapshot: PoolStakeSnapshotResponse;
  poolDelegators: PoolDelegatorsResponse;
}) {
  const { t } = useTranslation('common');

  const { poolInfo, poolDelegators, poolStakeSnapshot } = props;

  const [activePool, setActivePool] = useState<'cardano' | 'starknet'>('cardano');

  const [validatorInfo, setValidatorInfo] = useState<ValidatorData['validatorDetails'] | null>(null);

  useEffect(() => {
    const fetchValidatorInfo = async () => {
      const validatorInfo = await getValidatorInfo(GlobalConfig.STARKNET_VALIDATOR_ADDRESS);
      setValidatorInfo(validatorInfo.validatorDetails);
    };

    fetchValidatorInfo();
  }, []);

  return (
    <div>
      <section className="flex justify-center mt-12 mb-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg">
          <div className="flex space-x-3">
            <button
              className={clsx(
                'tab-button cardano-tab px-8 py-4 rounded-2xl font-bold text-lg flex items-center space-x-3',
                {
                  active: activePool === 'cardano'
                }
              )}
              onClick={() => setActivePool('cardano')}
              data-pool="cardano"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">₳</span>
              </div>
              <div className="text-left">
                <div className="text-md font-bold">Cardano Pool</div>
              </div>
            </button>
            <button
              className={clsx(
                'tab-button starknet-tab px-8 py-4 rounded-2xl font-bold text-lg flex items-center space-x-3',
                {
                  active: activePool === 'starknet'
                }
              )}
              onClick={() => setActivePool('starknet')}
              data-pool="starknet"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xl">⚡</span>
              </div>
              <div className="text-left">
                <div className="text-md font-bold">StarkNet Validator</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <main>
        {activePool === 'cardano' && (
          <CardanoStaking poolInfo={poolInfo} poolStakeSnapshot={poolStakeSnapshot} poolDelegators={poolDelegators} />
        )}
        {activePool === 'starknet' && <StarknetStaking validatorInfo={validatorInfo} />}
      </main>

      <section className="relative z-10 mt-4 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">💝 {t('whyUs.title')}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    💻
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{t('whyUs.reasons.supportDevelopment.title')}</h4>
                    <p className="text-sm text-gray-600">{t('whyUs.reasons.supportDevelopment.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    🔧
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{t('whyUs.reasons.professionalism.title')}</h4>
                    <p className="text-sm text-gray-600">{t('whyUs.reasons.professionalism.description')}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    🌱
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{t('whyUs.reasons.ecosystemContribution.title')}</h4>
                    <p className="text-sm text-gray-600">{t('whyUs.reasons.ecosystemContribution.description')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    🎯
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">{t('whyUs.reasons.decentralization.title')}</h4>
                    <p className="text-sm text-gray-600">{t('whyUs.reasons.decentralization.description')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 candy-gradient rounded-full shadow-lg"></div>
                <span className="text-lg font-black text-gray-800">Bubble Studio</span>
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-1 text-md">💝 {t('acknowledgement.message')}</p>
              </div>
              <div className="flex items-center space-x-3">
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                  <i data-lucide="twitter" className="w-5 h-5"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-purple-500 transition-colors">
                  <i data-lucide="telegram" className="w-5 h-5"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-green-500 transition-colors">
                  <i data-lucide="mail" className="w-5 h-5"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
