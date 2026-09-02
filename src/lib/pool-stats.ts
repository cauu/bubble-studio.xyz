import { GlobalConfig } from '@/constants';
import { getPoolInfo } from '@/services/pool';

export type PoolStats = {
  ticker: string;
  stake: string;
  apy: string;
  delegators: string;
  isLive: boolean;
};

const formatStake = (lovelace: string): string => {
  const ada = Number(lovelace) / 1e6;
  if (ada >= 1e6) return `${(ada / 1e6).toFixed(1)}M ADA`;
  if (ada >= 1e3) return `${(ada / 1e3).toFixed(1)}K ADA`;
  return `${Math.round(ada)} ADA`;
};

export const getPoolStats = async (): Promise<PoolStats> => {
  const info = await getPoolInfo([GlobalConfig.POOL_ID]).catch(() => null);
  const pool = info?.[0];

  if (!pool) {
    return {
      ticker: 'PAO',
      stake: GlobalConfig.POOL_FALLBACK.stake,
      apy: GlobalConfig.POOL_APY,
      delegators: GlobalConfig.POOL_FALLBACK.delegators,
      isLive: false
    };
  }

  return {
    ticker: pool.meta_json?.ticker ?? 'PAO',
    stake: formatStake(pool.live_stake),
    apy: GlobalConfig.POOL_APY,
    delegators: String(pool.live_delegators),
    isLive: true
  };
};
