import { getPoolInfo, getPoolStakeSnapshot } from '@/services/pool';
import { PoolInfoResponse, PoolStakeSnapshotResponse } from '@/types/koios.types';
import { GlobalConfig } from '@/constants';
import { WrappedMemoryCache } from '@/utils/WrappedMemoryCache';

import { getValidatorInfo } from '@/services/starknet-validator';
import { ValidatorData } from '@/types/voyager.types';
import { StakingClient } from './StakingClient';

const poolInfoCache = new WrappedMemoryCache({
    ttl: 1000 * 60 * 10,
    refreshThreshold: 1000 * 60 * 5,
    refreshFn: () => {
        return async () => {
            const [poolInfo, poolStakeSnapshot, validatorInfo] = await Promise.all([
                getPoolInfo([GlobalConfig.POOL_ID]),
                getPoolStakeSnapshot(GlobalConfig.POOL_ID),
                getValidatorInfo(GlobalConfig.STARKNET_VALIDATOR_ADDRESS)
            ]);

            console.log(validatorInfo, 'validatorInfo');

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

    if (!poolInfo || !poolStakeSnapshot || !validatorInfo) {
        return <div>Loading...</div>
    }

    return <StakingClient poolInfo={poolInfo} poolStakeSnapshot={poolStakeSnapshot} validatorInfo={validatorInfo} />
}
