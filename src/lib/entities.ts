import { GlobalConfig } from '@/constants';
import { getLocalizedUrl, getSiteOrigin } from '@/lib/seo';

type SiteEntityGraphOptions = {
  locale: string;
  organizationName: string;
  organizationDescription: string;
};

export const getEntityIds = () => {
  const siteOrigin = getSiteOrigin();

  return {
    organization: `${siteOrigin}/#organization`,
    website: `${siteOrigin}/#website`,
    martin: `${siteOrigin}/about#martin`,
    paoPool: `${siteOrigin}/staking#pao-pool`
  } as const;
};

export const getSiteEntityGraph = ({ locale, organizationName, organizationDescription }: SiteEntityGraphOptions) => {
  const siteOrigin = getSiteOrigin();
  const ids = getEntityIds();

  return [
    {
      '@type': 'Organization',
      '@id': ids.organization,
      name: organizationName,
      alternateName: 'Bubble Studio',
      url: siteOrigin,
      logo: {
        '@type': 'ImageObject',
        url: GlobalConfig.assetsUrl.bubbleLogo
      },
      description: organizationDescription,
      email: GlobalConfig.CONTACT_EMAIL
    },
    {
      '@type': 'Person',
      '@id': ids.martin,
      name: 'Martin',
      alternateName: '0xMartin',
      url: `${getLocalizedUrl(locale, 'about')}#martin`,
      sameAs: [GlobalConfig.social.github, GlobalConfig.social.twitter],
      worksFor: {
        '@id': ids.organization
      }
    },
    {
      '@type': 'WebSite',
      '@id': ids.website,
      url: siteOrigin,
      name: organizationName,
      alternateName: 'Bubble Studio',
      description: organizationDescription,
      inLanguage: ['en', 'zh-Hans', 'zh-Hant'],
      publisher: {
        '@id': ids.organization
      }
    },
    {
      '@type': 'Service',
      '@id': ids.paoPool,
      name: 'Pao Pool',
      serviceType: 'Cardano stake pool',
      url: `${getLocalizedUrl(locale, 'staking')}#pao-pool`,
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'Cardano stake pool ID',
        value: GlobalConfig.POOL_ID
      },
      sameAs: [GlobalConfig.CARDANOSCAN_POOL_URL, GlobalConfig.DELEGATE_URL],
      provider: {
        '@id': ids.organization
      }
    }
  ];
};
