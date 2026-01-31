'use client';

import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { useState } from 'react';

import { PoolInfoResponse, PoolStakeSnapshotResponse } from '@/types/koios.types';
import { CardanoStaking } from '@/components/staking/CardanoStaking';
import { StarknetStaking } from '@/components/staking/StarknetStaking';
import { ValidatorData } from '@/types/voyager.types';
import { GlobalConfig } from '@/constants';
import { X, Telegram } from '@/components/Icons';

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
      <section className="flex justify-center mt-8 md:mt-12 mb-4 px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1.5 md:p-2 shadow-lg w-full max-w-md md:max-w-none md:w-auto">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-3">
            <button
              className={clsx(
                'tab-button cardano-tab px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg flex items-center justify-center md:justify-start space-x-2 md:space-x-3',
                {
                  active: activePool === 'cardano'
                }
              )}
              onClick={() => setActivePool('cardano')}
              data-pool="cardano"
            >
              <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center flex-shrink-0">
                {activePool === 'cardano' ? (
                  <img src={GlobalConfig.assetsUrl.cardanoWhiteLogo} alt="cardano" className="w-6 h-6 md:w-8 md:h-8" />
                ) : (
                  <img src={GlobalConfig.assetsUrl.cardanoBlueLogo} alt="cardano" className="w-6 h-6 md:w-8 md:h-8" />
                )}
              </div>
              <div className="text-left">
                <div className="text-sm md:text-md font-bold">Cardano Pool</div>
              </div>
            </button>
            <button
              className={clsx(
                'tab-button starknet-tab px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg flex items-center justify-center md:justify-start space-x-2 md:space-x-3',
                {
                  active: activePool === 'starknet'
                }
              )}
              onClick={() => setActivePool('starknet')}
              data-pool="starknet"
            >
              <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <img src={GlobalConfig.assetsUrl.starknetLogo} alt="starknet" className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="text-left">
                <div className="text-sm md:text-md font-bold">StarkNet Validator</div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <main>
        {activePool === 'cardano' && <CardanoStaking poolInfo={poolInfo} poolStakeSnapshot={poolStakeSnapshot} />}
        {activePool === 'starknet' && <StarknetStaking validatorInfo={validatorInfo} />}
      </main>

      <footer className="relative z-10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl px-4 md:px-6 py-4 md:py-2 shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 md:w-16 md:h-16">
                  <img src={GlobalConfig.assetsUrl.bubbleLogo} alt="Bubble Studio Logo" />
                </div>
                <span className="text-base md:text-lg font-black text-gray-800">Bubble Studio</span>
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-1 text-sm md:text-md">💝 {t('acknowledgement.message')}</p>
              </div>
              <div className="hidden max-md:flex items-center space-x-3">
                <a
                  href={GlobalConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </a>
                <a
                  href={GlobalConfig.social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-sky-500 transition-colors"
                >
                  <Telegram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
