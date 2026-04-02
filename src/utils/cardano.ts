import { bech32 } from 'bech32';

const KNOWN_WALLETS = ['nami', 'eternl', 'flint', 'lace', 'yoroi', 'typhoncip30', 'gerowallet', 'nufi'];

export interface DetectedWallet {
  key: string;
  name: string;
  icon: string;
}

export function getAvailableWallets(): DetectedWallet[] {
  if (typeof window === 'undefined' || !window.cardano) return [];

  const wallets: DetectedWallet[] = [];

  for (const key of Object.keys(window.cardano)) {
    const entry = window.cardano[key];
    if (entry && typeof entry === 'object' && typeof entry.enable === 'function' && typeof entry.name === 'string') {
      wallets.push({ key, name: entry.name, icon: entry.icon });
    }
  }

  // Sort: known wallets first, then alphabetical
  wallets.sort((a, b) => {
    const ai = KNOWN_WALLETS.indexOf(a.key);
    const bi = KNOWN_WALLETS.indexOf(b.key);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return a.name.localeCompare(b.name);
  });

  return wallets;
}

export async function connectWallet(walletKey: string): Promise<CardanoWalletApi> {
  const entry = window.cardano?.[walletKey];
  if (!entry) throw new Error(`Wallet ${walletKey} not found`);
  return entry.enable();
}

export async function getStakeAddress(api: CardanoWalletApi): Promise<string> {
  const rewardAddresses = await api.getRewardAddresses();
  if (!rewardAddresses.length) throw new Error('No reward address found');

  const hex = rewardAddresses[0];
  const bytes = hexToBytes(hex);

  const networkId = await api.getNetworkId();
  const hrp = networkId === 1 ? 'stake' : 'stake_test';
  const words = bech32.toWords(bytes);
  return bech32.encode(hrp, words, 200);
}

export function buildPayload(stakeAddress: string): { payloadHex: string; payloadJson: string } {
  const payloadObj = {
    stake_address: stakeAddress,
    timestamp: Date.now()
  };
  const payloadJson = JSON.stringify(payloadObj);
  const payloadHex = stringToHex(payloadJson);
  return { payloadHex, payloadJson };
}

export async function signPayload(
  api: CardanoWalletApi,
  rewardAddressHex: string,
  payloadHex: string
): Promise<{ signature: string; key: string }> {
  return api.signData(rewardAddressHex, payloadHex);
}

export async function getRewardAddressHex(api: CardanoWalletApi): Promise<string> {
  const addrs = await api.getRewardAddresses();
  if (!addrs.length) throw new Error('No reward address found');
  return addrs[0];
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes;
}

function stringToHex(str: string): string {
  return Array.from(new TextEncoder().encode(str))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
