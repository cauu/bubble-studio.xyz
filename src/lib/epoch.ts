// Cardano epochs last 5 days; epoch 208 (Shelley) started 2020-07-29 21:44:51 UTC
const EPOCH_SECONDS = 432000;
const SHELLEY_START = Date.UTC(2020, 6, 29, 21, 44, 51) / 1000;
const SHELLEY_EPOCH = 208;

export type EpochState = {
  epoch: number;
  /** Fraction of the current epoch that has elapsed (0–1) */
  progress: number;
  secondsLeft: number;
};

export const getEpochState = (nowMs: number = Date.now()): EpochState => {
  const since = nowMs / 1000 - SHELLEY_START;
  const into = since % EPOCH_SECONDS;

  return {
    epoch: SHELLEY_EPOCH + Math.floor(since / EPOCH_SECONDS),
    progress: into / EPOCH_SECONDS,
    secondsLeft: Math.floor(EPOCH_SECONDS - into)
  };
};

const pad = (n: number) => String(n).padStart(2, '0');

/** 2d 14:55:21 */
export const formatEpochCountdown = (secondsLeft: number): string =>
  `${Math.floor(secondsLeft / 86400)}d ${pad(Math.floor(secondsLeft / 3600) % 24)}:${pad(
    Math.floor(secondsLeft / 60) % 60
  )}:${pad(secondsLeft % 60)}`;

/** Stake milestones (ADA) shown on the home page */
export const STAKE_STAGES = [1e6, 5e6, 10e6, 20e6];

export const getStakeStage = (stakeAda: number) => {
  const next = STAKE_STAGES.findIndex((target) => stakeAda < target);
  const stage = next === -1 ? STAKE_STAGES.length - 1 : next;
  const from = stage ? STAKE_STAGES[stage - 1] : 0;
  const progress = Math.min(1, Math.max(0, (stakeAda - from) / (STAKE_STAGES[stage] - from)));

  return { stage, target: STAKE_STAGES[stage], left: Math.max(0, STAKE_STAGES[stage] - stakeAda), progress };
};
