import { unstable_cache } from 'next/cache';
import { GlobalConfig } from '@/constants';
import { getPoolDelegators, getPoolInfo } from '@/services/pool';

export type PoolStats = {
  ticker: string;
  stake: string;
  apy: string;
  delegators: string;
  isLive: boolean;
  /** Live stake in ADA (null when Koios is unavailable) */
  stakeAda: number | null;
  delegatorCount: number | null;
  /** Pool margin as a percentage, e.g. 3 */
  marginPct: number | null;
  fixedCostAda: number | null;
  pledgeAda: number | null;
  /** Stake addresses registered as pool owners (operator pledge) */
  owners: string[];
};

export type PoolDelegator = {
  stakeAddress: string;
  amountAda: number;
  sinceEpoch: number;
  isOperator: boolean;
};

const toAda = (lovelace: string): number => Number(lovelace) / 1e6;

const formatStake = (lovelace: string): string => {
  const ada = toAda(lovelace);
  if (ada >= 1e6) return `${(ada / 1e6).toFixed(1)}M ADA`;
  if (ada >= 1e3) return `${(ada / 1e3).toFixed(1)}K ADA`;
  return `${Math.round(ada)} ADA`;
};

// Share public chain snapshots across locales and pages instead of repeating requests per render.
const poolInfo = unstable_cache(() => getPoolInfo([GlobalConfig.POOL_ID]), ['pao-pool-info', GlobalConfig.POOL_ID], {
  revalidate: 300
});
const poolDelegators = unstable_cache(
  () => getPoolDelegators(GlobalConfig.POOL_ID),
  ['pao-pool-delegators', GlobalConfig.POOL_ID],
  { revalidate: 300 }
);

export const getPoolStats = async (): Promise<PoolStats> => {
  const info = await poolInfo().catch(() => null);
  const pool = info?.[0];

  if (!pool) {
    return {
      ticker: 'PAO',
      stake: GlobalConfig.POOL_FALLBACK.stake,
      apy: GlobalConfig.POOL_APY,
      delegators: GlobalConfig.POOL_FALLBACK.delegators,
      isLive: false,
      stakeAda: null,
      delegatorCount: null,
      marginPct: null,
      fixedCostAda: null,
      pledgeAda: null,
      owners: []
    };
  }

  return {
    ticker: pool.meta_json?.ticker ?? 'PAO',
    stake: formatStake(pool.live_stake),
    apy: GlobalConfig.POOL_APY,
    delegators: String(pool.live_delegators),
    isLive: true,
    stakeAda: toAda(pool.live_stake),
    delegatorCount: pool.live_delegators,
    marginPct: Math.round(pool.margin * 10000) / 100,
    fixedCostAda: toAda(pool.fixed_cost),
    pledgeAda: toAda(pool.pledge),
    owners: pool.owners ?? []
  };
};

/** Current delegators, largest first; operator-owned stake addresses are flagged */
export const getPoolMembers = async (owners: string[]): Promise<PoolDelegator[]> => {
  const delegators = await poolDelegators().catch(() => null);
  if (!delegators) return [];

  return delegators
    .map((d) => ({
      stakeAddress: d.stake_address,
      amountAda: toAda(d.amount),
      sinceEpoch: d.active_epoch_no,
      isOperator: owners.includes(d.stake_address)
    }))
    .sort((a, b) => b.amountAda - a.amountAda);
};

/** stake1u8kl…xe93nu */
export const shortStakeAddress = (address: string): string => `${address.slice(0, 10)}…${address.slice(-6)}`;
