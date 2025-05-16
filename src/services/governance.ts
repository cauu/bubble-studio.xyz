import { IGovernanceAction } from '@/types/governance';

// 模拟数据1
const governanceAction1: IGovernanceAction = {
  id: 'gov-action-001',
  txHash: '0x7a9f3cd5e8f23b4a3d5f6b8c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e',
  index: 1,
  type: 'parameter-change',
  details: {
    major: 1,
    minor: 0
  },
  expiryDate: '2023-12-31T23:59:59Z',
  expiryEpochNo: 425,
  createdDate: '2023-10-15T14:30:00Z',
  createdEpochNo: 410,
  url: 'https://cardano.org/governance/proposals/param-change-001',
  metadataHash: '0xabc123def456789abcdef0123456789abcdef0123456789abcdef0123456789',
  protocolParams: {
    minFeeA: { old: 44, new: 45 },
    minFeeB: { old: 155381, new: 160000 },
    maxBlockSize: { old: 65536, new: 73728 }
  },
  title: '提高交易费用和区块大小参数',
  abstract: '本提案旨在调整网络参数以适应网络增长需求',
  motivation: '随着网络使用率的增加，当前参数已不能满足需求',
  rationale: '通过提高交易费用和区块大小，可以更好地平衡网络资源使用',
  dRepYesVotes: 75000000,
  dRepNoVotes: 25000000,
  dRepAbstainVotes: 10000000,
  poolYesVotes: 50000000,
  poolNoVotes: 20000000,
  poolAbstainVotes: 5000000,
  ccYesVotes: 3,
  ccNoVotes: 0,
  ccAbstainVotes: 0,
  prevGovActionIndex: null,
  prevGovActionTxHash: null,
  meta: {
    title: '提高交易费用和区块大小参数',
    abstract: '本提案旨在调整网络参数以适应网络增长需求',
    motivation: '随着网络使用率的增加，当前参数已不能满足需求',
    rationale: '通过提高交易费用和区块大小，可以更好地平衡网络资源使用',
    references: []
  },
  opinions: {
    pros: ['提高区块大小将增加网络吞吐量', '费用调整将有助于防止垃圾交易'],
    againsts: ['费用提高可能会影响小额交易用户', '区块大小增加会增加节点硬件要求'],
    myOpinions: '支持此提案，网络需要扩容以应对日益增长的用户需求'
  }
};

// 模拟数据2
const governanceAction2: IGovernanceAction = {
  id: 'gov-action-002',
  txHash: '0x8b9e4df6f9e24b5c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c',
  index: 2,
  type: 'treasury-withdrawal',
  details: {
    major: 1,
    minor: 0
  },
  expiryDate: '2024-02-15T23:59:59Z',
  expiryEpochNo: 435,
  createdDate: '2023-11-20T10:15:00Z',
  createdEpochNo: 418,
  url: 'https://cardano.org/governance/proposals/treasury-002',
  metadataHash: '0xdef456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
  protocolParams: {
    treasuryWithdrawal: {
      amount: 500000000000,
      recipient:
        'addr1qxy8p07cr9chfwq5m3gxz4u3z0m5sl0590kvk0qgxu4uhkwt9v9ulmrz3xf3l0fya7fyvs9yzwp3l0h0v2jxjjx36yqnxhdkc'
    }
  },
  title: '资助生态系统发展项目',
  abstract: '从国库中提取资金用于支持开发者生态系统建设',
  motivation: '为了促进更多开发者加入Cardano生态系统',
  rationale: '通过资助开发者项目，可以加速生态系统的发展和应用落地',
  dRepYesVotes: 85000000,
  dRepNoVotes: 15000000,
  dRepAbstainVotes: 5000000,
  poolYesVotes: 60000000,
  poolNoVotes: 10000000,
  poolAbstainVotes: 5000000,
  ccYesVotes: 2,
  ccNoVotes: 1,
  ccAbstainVotes: 0,
  prevGovActionIndex: null,
  prevGovActionTxHash: null,
  meta: {
    title: '资助生态系统发展项目',
    abstract: '从国库中提取资金用于支持开发者生态系统建设',
    motivation: '为了促进更多开发者加入Cardano生态系统',
    rationale: '通过资助开发者项目，可以加速生态系统的发展和应用落地',
    references: []
  },
  opinions: {
    pros: ['将促进开发者生态系统的发展', '资金将用于有价值的项目'],
    againsts: ['提案缺乏具体的资金使用计划', '监督机制不够完善'],
    myOpinions: '支持此提案，但建议增加更详细的资金使用报告机制'
  }
};

// 模拟数据3
const governanceAction3: IGovernanceAction = {
  id: 'gov-action-003',
  txHash: '0x9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d',
  index: 3,
  type: 'hard-fork-initiation',
  details: {
    major: 8,
    minor: 0
  },
  expiryDate: '2024-03-31T23:59:59Z',
  expiryEpochNo: 445,
  createdDate: '2024-01-10T09:00:00Z',
  createdEpochNo: 430,
  url: 'https://cardano.org/governance/proposals/hardfork-001',
  metadataHash: '0x123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
  protocolParams: {
    protocolVersion: {
      current: { major: 7, minor: 0 },
      proposed: { major: 8, minor: 0 }
    },
    features: ['智能合约优化', '扩展UTXO模型', '改进治理机制']
  },
  title: '启动Conway硬分叉升级',
  abstract: '提议进行网络硬分叉以实现Conway时代的功能',
  motivation: '引入新的治理机制和智能合约功能',
  rationale: 'Conway升级将使Cardano网络更加去中心化，并提供更强大的智能合约功能',
  dRepYesVotes: 95000000,
  dRepNoVotes: 5000000,
  dRepAbstainVotes: 2000000,
  poolYesVotes: 70000000,
  poolNoVotes: 5000000,
  poolAbstainVotes: 2000000,
  ccYesVotes: 3,
  ccNoVotes: 0,
  ccAbstainVotes: 0,
  prevGovActionIndex: '2',
  prevGovActionTxHash: '0x8b9e4df6f9e24b5c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c',
  meta: {
    title: '启动Conway硬分叉升级',
    abstract: '提议进行网络硬分叉以实现Conway时代的功能',
    motivation: '引入新的治理机制和智能合约功能',
    rationale: 'Conway升级将使Cardano网络更加去中心化，并提供更强大的智能合约功能',
    references: []
  },
  opinions: {
    pros: ['引入更强大的治理机制', '智能合约功能将得到显著增强', '为DeFi应用提供更好的支持'],
    againsts: ['升级时间表可能过于激进', '部分SPO可能需要更多时间准备'],
    myOpinions: '强烈支持此升级，Conway将为Cardano带来重要的功能改进'
  }
};

export async function getGovernanceActions() {
  return await Promise.resolve([governanceAction1, governanceAction2, governanceAction3]);
}

export async function getGovernanceProposals() {
  return await Promise.resolve([1, 2, 3]);
}
