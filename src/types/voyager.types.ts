interface Socials {
  // 由于示例数据中 socials 为空对象，这里可以定义一个 flexible 的类型
  // 如果未来会包含社交媒体链接，可以根据需要添加 string 类型的属性
  [key: string]: string;
}

interface ValidatorDetails {
  address: string;
  tokenAddress: string;
  isVerified: boolean;
  totalStake: string;
  totalStakePercentage: number;
  ownStake: string;
  delegatedStake: string;
  totalDelegators: number;
  revenueShare: number;
  apr: number;
  rank: string;
  startTime: number;
  startingTime: string;
  poolAddress: string;
  rewardAddress: string;
  operationalAddress: string;
  liveness: number;
  livenessAttestedEpochs: number;
  livenessTotalEpochs: number;
  livenessLastEpoch: number;
  socials: Socials;
}

export interface ValidatorData {
  validatorDetails: ValidatorDetails;
}
