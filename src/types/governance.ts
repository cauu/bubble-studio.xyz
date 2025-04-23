export interface IReference {
  type: string;
  label: string;
  uri: string;
}

export interface IGovActionMeta {
  title: string;
  abstract: string;
  rationale: string;
  motivation: string;
  references: IReference[];
}

export interface IGovActionDetails {
  major: number;
  minor: number;
}

export interface IGovernanceAction {
  id: string;
  txHash: string;
  index: number;
  type: string;
  details: IGovActionDetails;
  expiryDate: string;
  expiryEpochNo: number;
  createdDate: string;
  createdEpochNo: number;
  url: string;
  metadataHash: string;
  protocolParams: any;
  title: string | null;
  abstract: string | null;
  motivation: string | null;
  rationale: string | null;
  dRepYesVotes: number;
  dRepNoVotes: number;
  dRepAbstainVotes: number;
  poolYesVotes: number;
  poolNoVotes: number;
  poolAbstainVotes: number;
  ccYesVotes: number;
  ccNoVotes: number;
  ccAbstainVotes: number;
  prevGovActionIndex: string | null;
  prevGovActionTxHash: string | null;
  meta: IGovActionMeta;

  // 观点
  opinions: {
    pros: string[];
    againsts: string[];
    myOpinions: string;
  };
}
