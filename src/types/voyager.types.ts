/**
 * 定义验证节点最新的见证信息
 */
export interface LatestAttestation {
  attestation_block: number;
  epoch_number: number;
}

/**
 * 定义验证节点的详细数据
 */
export interface ValidatorData {
  staker_address: string;
  avatar: string;
  block_number: number;
  // 注意：commission, delegate_stake, self_stake, total_stake 在JSON中是字符串类型
  commission: string;
  delegate_stake: string;
  description: string | null;
  name: string | null;
  operational_address: string;
  pool_contract: string;
  reward_address: string;
  self_stake: string;
  // socials的具体结构未知，使用 unknown 或 any 是一个安全的选择
  socials: unknown | null;
  total_stake: string;
  total_stake_percent: number;
  tx_hash: string;
  unclaimed_rewards_own: number;
  unstake_time: string | null;
  website: string | null;
  uptime: number;
  latest_attestation: LatestAttestation;
  // status 可以定义为更具体的联合类型，例如：'active' | 'inactive'
  status: string;
  apy: number;
  total_delegators: number;
}

/**
 * 定义完整的API响应结构
 */
export interface ValidatorApiResponse {
  data: ValidatorData;
}
