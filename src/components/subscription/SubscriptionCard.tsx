'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  getAvailableWallets,
  connectWallet,
  getStakeAddress,
  getRewardAddressHex,
  buildPayload,
  signPayload,
  DetectedWallet
} from '@/utils/cardano';
import { verifyAndGetToken, SubscriptionError } from '@/services/subscription';

type Step = 'idle' | 'selecting' | 'connecting' | 'connected' | 'signing' | 'success' | 'error';

export function SubscriptionCard() {
  const t = useTranslations('subscription');
  const [step, setStep] = useState<Step>('idle');
  const [wallets, setWallets] = useState<DetectedWallet[]>([]);
  const [walletApi, setWalletApi] = useState<CardanoWalletApi | null>(null);
  const [stakeAddress, setStakeAddress] = useState('');
  const [rewardHex, setRewardHex] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const detectWallets = useCallback(() => {
    const detected = getAvailableWallets();
    setWallets(detected);
    if (detected.length === 0) {
      setError(t('noWallet'));
      setStep('error');
    } else {
      setStep('selecting');
    }
  }, [t]);

  const handleSelectWallet = useCallback(
    async (walletKey: string) => {
      try {
        setStep('connecting');
        setError('');
        const api = await connectWallet(walletKey);
        const addr = await getStakeAddress(api);
        const hex = await getRewardAddressHex(api);
        setWalletApi(api);
        setStakeAddress(addr);
        setRewardHex(hex);
        setStep('connected');
      } catch {
        setError(t('connectFailed'));
        setStep('error');
      }
    },
    [t]
  );

  const handleGenerateToken = useCallback(async () => {
    if (!walletApi) return;
    try {
      setStep('signing');
      setError('');
      const { payloadHex } = buildPayload(stakeAddress);
      const { signature, key } = await signPayload(walletApi, rewardHex, payloadHex);
      const result = await verifyAndGetToken({
        stake_address: stakeAddress,
        payload: payloadHex,
        signature,
        key
      });
      setToken(result.token);
      setStep('success');
    } catch (err) {
      if (err instanceof SubscriptionError) {
        const msgKey = `error_${err.code}` as const;
        setError(t(msgKey));
      } else {
        setError(t('signFailed'));
      }
      setStep('error');
    }
  }, [walletApi, stakeAddress, rewardHex, t]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [token]);

  const handleReset = useCallback(() => {
    setStep('idle');
    setWalletApi(null);
    setStakeAddress('');
    setRewardHex('');
    setToken('');
    setError('');
  }, []);

  // Truncate address for display
  const displayAddr = stakeAddress ? `${stakeAddress.slice(0, 12)}...${stakeAddress.slice(-8)}` : '';

  return (
    <section className="py-6 md:py-10">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">{t('title')}</h2>
        <p className="text-gray-500 text-center mb-6 max-w-2xl mx-auto">{t('description')}</p>

        <div className="max-w-md mx-auto">
          {/* Step 1: Connect Wallet */}
          {step === 'idle' && (
            <button
              onClick={detectWallets}
              className="w-full px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-medium rounded-full hover:shadow-lg transition-shadow"
            >
              {t('connectWallet')}
            </button>
          )}

          {/* Wallet Selection */}
          {step === 'selecting' && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600 text-center mb-3">{t('selectWallet')}</p>
              {wallets.map((w) => (
                <button
                  key={w.key}
                  onClick={() => handleSelectWallet(w.key)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-sky-50 rounded-xl border border-gray-200 hover:border-sky-300 transition-colors"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={w.icon} alt={w.name} className="w-8 h-8 rounded-lg" />
                  <span className="font-medium text-gray-700">{w.name}</span>
                </button>
              ))}
              <button onClick={handleReset} className="w-full text-sm text-gray-400 hover:text-gray-600 mt-2">
                {t('cancel')}
              </button>
            </div>
          )}

          {/* Connecting */}
          {step === 'connecting' && (
            <div className="text-center text-gray-500 py-4">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full mb-2" />
              <p>{t('connecting')}</p>
            </div>
          )}

          {/* Connected - Generate Token */}
          {step === 'connected' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                <span className="text-sm text-gray-500">{t('stakeAddress')}</span>
                <span className="text-sm font-mono text-gray-700">{displayAddr}</span>
              </div>
              <button
                onClick={handleGenerateToken}
                className="w-full px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-500 text-white font-medium rounded-full hover:shadow-lg transition-shadow"
              >
                {t('generateToken')}
              </button>
              <button onClick={handleReset} className="w-full text-sm text-gray-400 hover:text-gray-600">
                {t('disconnect')}
              </button>
            </div>
          )}

          {/* Signing */}
          {step === 'signing' && (
            <div className="text-center text-gray-500 py-4">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full mb-2" />
              <p>{t('signing')}</p>
            </div>
          )}

          {/* Success */}
          {step === 'success' && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm text-green-700 font-medium mb-2">{t('tokenReady')}</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs bg-white rounded-lg px-3 py-2 font-mono text-gray-700 break-all border border-green-100">
                    {token}
                  </code>
                  <button
                    onClick={handleCopy}
                    className="shrink-0 px-3 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors"
                  >
                    {copied ? t('copied') : t('copy')}
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">{t('tokenInstruction')}</p>
              <button onClick={handleReset} className="w-full text-sm text-gray-400 hover:text-gray-600">
                {t('done')}
              </button>
            </div>
          )}

          {/* Error */}
          {step === 'error' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
              <button
                onClick={handleReset}
                className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-full hover:bg-gray-200 transition-colors"
              >
                {t('retry')}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
