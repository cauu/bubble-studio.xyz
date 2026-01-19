import { getPoolInfo, getPoolStakeSnapshot } from '@/services/pool';
import { PoolInfoResponse, PoolStakeSnapshotResponse } from '@/types/koios.types';
import { GlobalConfig } from '@/constants';

import { getValidatorInfo } from '@/services/starknet-validator';
import { ValidatorData } from '@/types/voyager.types';
import { StakingClient } from './StakingClient';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

type Props = {
  params: { locale: string };
};

const safeSendRequest = async (fn: () => Promise<any>) => {
  try {
    return await fn();
  } catch (error) {
    console.error(error);
    return null;
  }
};

let poolInfo: PoolInfoResponse | null = null;
let poolStakeSnapshot: PoolStakeSnapshotResponse | null = null;
let validatorInfo: ValidatorData | null = null;

async function fetchPoolInfo() {
  if (poolInfo && poolStakeSnapshot && validatorInfo) {
    return {
      poolInfo,
      poolStakeSnapshot,
      validatorInfo
    };
  }

  const result = await Promise.all([
    safeSendRequest(() => getPoolInfo([GlobalConfig.POOL_ID])),
    safeSendRequest(() => getPoolStakeSnapshot(GlobalConfig.POOL_ID)),
    safeSendRequest(() => getValidatorInfo(GlobalConfig.STARKNET_VALIDATOR_ADDRESS))
  ]);

  poolInfo = result[0] || null;
  poolStakeSnapshot = result[1] || null;
  validatorInfo = result[2] || null;

  return {
    poolInfo,
    poolStakeSnapshot,
    validatorInfo
  };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bubble-studio.xyz';
  const url = `${baseUrl}/${locale === 'en' ? '' : locale + '/'}staking`;

  return {
    title: t('seo.staking.title'),
    description: t('seo.staking.description'),
    openGraph: {
      title: t('seo.staking.title'),
      description: t('seo.staking.description'),
      url,
      siteName: t('seo.siteName'),
      type: 'website',
      locale: locale,
      images: [
        {
          url: `${baseUrl}/og-default.png`,
          width: 1200,
          height: 630,
          alt: t('seo.siteName')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seo.staking.title'),
      description: t('seo.staking.description'),
      images: [`${baseUrl}/og-default.png`]
    },
    alternates: {
      canonical: url,
      languages: {
        'en': `${baseUrl}/staking`,
        'zh': `${baseUrl}/zh/staking`,
        'tw': `${baseUrl}/tw/staking`
      }
    }
  };
}

export default async function Staking({ params: { locale } }: Props) {
  const { poolInfo, poolStakeSnapshot, validatorInfo } = (await fetchPoolInfo()) || {
    poolInfo: null,
    poolStakeSnapshot: null,
    validatorInfo: null
  };

  return <StakingClient poolInfo={poolInfo} poolStakeSnapshot={poolStakeSnapshot} validatorInfo={validatorInfo} />;
}
