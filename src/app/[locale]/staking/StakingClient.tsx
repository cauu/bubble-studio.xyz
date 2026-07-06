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

  const tabs = [
    { key: 'cardano' as const, label: 'Cardano Pool', logo: GlobalConfig.assetsUrl.cardanoBlueLogo },
    { key: 'starknet' as const, label: 'StarkNet Validator', logo: GlobalConfig.assetsUrl.starknetLogo }
  ];

  return (
    <div className="pb-24 max-[860px]:pb-[72px]">
      <section className="flex justify-center mt-10 md:mt-14 mb-2 px-4">
        <div className="flex flex-wrap justify-center gap-2 bg-surface-soft rounded-pill p-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              aria-pressed={activePool === tab.key}
              onClick={() => setActivePool(tab.key)}
              className={clsx(
                'flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-pill transition-all duration-200 ease-brand',
                activePool === tab.key
                  ? 'bg-white text-ink shadow-[0_1px_2px_rgba(23,32,38,.06),0_4px_12px_rgba(23,32,38,.08)]'
                  : 'text-body hover:bg-[rgba(255,255,255,.75)] hover:text-ink'
              )}
            >
              <img src={tab.logo} alt="" aria-hidden="true" className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      <div>
        {activePool === 'cardano' && <CardanoStaking poolInfo={poolInfo} poolStakeSnapshot={poolStakeSnapshot} />}
        {activePool === 'starknet' && <StarknetStaking validatorInfo={validatorInfo} />}
      </div>

      <p className="text-center text-sm text-muted mt-12 px-4">💝 {t('acknowledgement.message')}</p>
    </div>
  );
};
