'use client';

import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { useState } from 'react';

import { PoolInfoResponse, PoolStakeSnapshotResponse } from '@/types/koios.types';
import { CardanoStaking } from '@/components/staking/CardanoStaking';
import { StarknetStaking } from '@/components/staking/StarknetStaking';
import { ValidatorData } from '@/types/voyager.types';
import { GlobalConfig } from '@/constants';

export const StakingClient = (props: {
  poolInfo: PoolInfoResponse | null;
  poolStakeSnapshot: PoolStakeSnapshotResponse | null;
  validatorInfo: ValidatorData | null;
}) => {
  const { poolInfo, poolStakeSnapshot, validatorInfo } = props;
  const [activePool, setActivePool] = useState<'cardano' | 'starknet'>('cardano');

  const t = useTranslations();

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
              <div className="w-8 h-8 flex items-center justify-center">
                {/* <span className="text-xl">₳</span> */}
                {activePool === 'cardano' ? (
                  <img
                    src={GlobalConfig.assetsUrl.cardanoWhiteLogo}
                    alt="cardano"
                    className="w-8 h-8"
                  />
                ) : (
                  <img
                    src={GlobalConfig.assetsUrl.cardanoBlueLogo}
                    alt="cardano"
                    className="w-8 h-8"
                  />
                )}
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
                {/* <span className="text-xl">⚡</span> */}
                <img
                  src={GlobalConfig.assetsUrl.starknetLogo}
                  alt="starknet"
                  className="w-8 h-8"
                />
              </div>
              <div className="text-left">
                <div className="text-md font-bold">StarkNet Validator</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <main>
        {activePool === 'cardano' && <CardanoStaking poolInfo={poolInfo} poolStakeSnapshot={poolStakeSnapshot} />}
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
};
