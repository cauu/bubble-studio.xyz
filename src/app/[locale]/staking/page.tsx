import { getPoolInfo, getPoolStakeSnapshot } from '@/services/pool';
import { PoolInfoResponse, PoolStakeSnapshotResponse } from '@/types/koios.types';
import { GlobalConfig } from '@/constants';

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

let poolInfo: PoolInfoResponse | null = null;
let poolStakeSnapshot: PoolStakeSnapshotResponse | null = null;
let validatorInfo: ValidatorData | null = null;

async function fetchPoolInfo() {
  if (poolInfo && poolStakeSnapshot && validatorInfo) {
    return {
      poolInfo,
      poolStakeSnapshot,
      validatorInfo
    };
  }

  const result = await Promise.all([
    safeSendRequest(() => getPoolInfo([GlobalConfig.POOL_ID])),
    safeSendRequest(() => getPoolStakeSnapshot(GlobalConfig.POOL_ID)),
    safeSendRequest(() => getValidatorInfo(GlobalConfig.STARKNET_VALIDATOR_ADDRESS))
  ]);

  poolInfo = result[0] || null;
  poolStakeSnapshot = result[1] || null;
  validatorInfo = result[2] || null;

  return {
    poolInfo,
    poolStakeSnapshot,
    validatorInfo
  };
}

export default async function Staking() {
  const { poolInfo, poolStakeSnapshot, validatorInfo } = (await fetchPoolInfo()) || {
    poolInfo: null,
    poolStakeSnapshot: null,
    validatorInfo: null
  };

  return <StakingClient poolInfo={poolInfo} poolStakeSnapshot={poolStakeSnapshot} validatorInfo={validatorInfo} />;
}
