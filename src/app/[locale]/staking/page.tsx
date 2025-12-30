import { getPoolInfo, getPoolStakeSnapshot } from '@/services/pool';
import { PoolInfoResponse, PoolStakeSnapshotResponse } from '@/types/koios.types';
import { GlobalConfig } from '@/constants';
import { WrappedMemoryCache } from '@/utils/WrappedMemoryCache';

import { getValidatorInfo } from '@/services/starknet-validator';
import { ValidatorData } from '@/types/voyager.types';
import { StakingClient } from './StakingClient';

const safeSendRequest = async (fn: () => Promise<any>) => {
  try {
    return await fn();
  } catch (error) {
    console.error(error);
    return null;
  }
};

const poolInfoCache = new WrappedMemoryCache({
  ttl: 1000 * 60 * 60 * 12,
  refreshThreshold: 1000 * 60 * 5,
  refreshFn: () => {
    return async () => {
      const [poolInfo, poolStakeSnapshot, validatorInfo] = await Promise.all([
        safeSendRequest(() => getPoolInfo([GlobalConfig.POOL_ID])),
        safeSendRequest(() => getPoolStakeSnapshot(GlobalConfig.POOL_ID)),
        safeSendRequest(() => getValidatorInfo(GlobalConfig.STARKNET_VALIDATOR_ADDRESS))
      ]);

      return {
        poolInfo,
        poolStakeSnapshot,
        validatorInfo
      };
    };
  }
});

export default async function Staking() {
  const { poolInfo, poolStakeSnapshot, validatorInfo } = (await poolInfoCache.getCachedValue<{
    poolInfo: PoolInfoResponse;
    poolStakeSnapshot: PoolStakeSnapshotResponse;
    validatorInfo: ValidatorData;
  }>('poolInfo')) || {
    poolInfo: null,
    poolStakeSnapshot: null,
    validatorInfo: null
  };

  return <StakingClient poolInfo={poolInfo} poolStakeSnapshot={poolStakeSnapshot} validatorInfo={validatorInfo} />;
}
