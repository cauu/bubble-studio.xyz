/**
 * @description 中继节点信息
 */
export interface Relay {
  dns: string | null;
  srv: string | null;
  ipv4: string | null;
  ipv6: string | null;
  port: number | null;
}

/**
 * @description 权益池的元数据
 */
export interface MetaJSON {
  name: string;
  ticker: string;
  homepage: string;
  description: string;
}

/**
 * @description 单个权益池的详细信息
 */
export interface PoolInfo {
  pool_id_bech32: string;
  pool_id_hex: string;
  active_epoch_no: number;
  vrf_key_hash: string;
  margin: number;
  fixed_cost: string;
  pledge: string;
  deposit: string;
  reward_addr: string;
  reward_addr_delegated_drep: string | null;
  owners: string[];
  relays: Relay[];
  meta_url: string | null;
  meta_hash: string | null;
  meta_json: MetaJSON | null;
  pool_status: 'registered' | 'retiring' | 'retired';
  retiring_epoch: number | null;
  op_cert: string;
  op_cert_counter: number;
  active_stake: string;
  sigma: number;
  block_count: number;
  live_pledge: string;
  live_stake: string;
  live_delegators: number;
  live_saturation: number;
  voting_power: string;
}

/**
 * @description /pool_info API 的完整响应体定义，它是一个包含多个权益池信息的数组
 */
export type PoolInfoResponse = PoolInfo[];

// file: koios.types.ts (添加以下内容)

/**
 * @description 单个权益池在特定纪元的快照信息
 */
export interface PoolStakeSnapshot {
  /**
   * @description 快照类型 ('Mark', 'Set', 或 'Go')
   */
  snapshot: 'Mark' | 'Set' | 'Go';
  /**
   * @description 快照对应的纪元编号
   */
  epoch_no: number;
  /**
   * @description 用于验证的随机数
   */
  nonce: string;
  /**
   * @description 该纪元快照中池子的总质押量 (单位: Lovelace)
   */
  pool_stake: string;
  /**
   * @description 该纪元快照中网络总活跃质押量 (单位: Lovelace)
   */
  active_stake: string;
}

/**
 * @description /pool_stake_snapshot API 的完整响应体定义
 */
export type PoolStakeSnapshotResponse = PoolStakeSnapshot[];

// file: koios.types.ts (添加以下内容)

/**
 * @description 单个委托人的信息
 */
export interface PoolDelegator {
  /**
   * @description 委托人的权益地址 (stake address)
   */
  stake_address: string;
  /**
   * @description 委托的总金额 (单位: Lovelace)
   */
  amount: string;
  /**
   * @description 该委托首次变为活跃的纪元编号
   */
  active_epoch_no: number;
  /**
   * @description 该委托人最近一次委托操作的交易哈希
   */
  latest_delegation_tx_hash: string;
}

/**
 * @description /pool_delegators API 的完整响应体定义
 */
export type PoolDelegatorsResponse = PoolDelegator[];
