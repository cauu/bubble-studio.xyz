interface CardanoWalletApi {
  getRewardAddresses(): Promise<string[]>;
  signData(addr: string, payload: string): Promise<{ signature: string; key: string }>;
  getNetworkId(): Promise<number>;
}

interface CardanoWalletEntry {
  name: string;
  icon: string;
  apiVersion: string;
  enable(): Promise<CardanoWalletApi>;
  isEnabled(): Promise<boolean>;
}

interface Window {
  cardano?: Record<string, CardanoWalletEntry>;
}
