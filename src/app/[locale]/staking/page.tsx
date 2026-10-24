import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { GlobalConfig } from '@/constants';
import { Link } from '@/i18n/navigation';
import { getPoolStats } from '@/lib/pool-stats';
import {
  getAbsoluteUrl,
  getAlternateOpenGraphLocales,
  getHtmlLang,
  getLanguageAlternates,
  getLocalizedPostSlug,
  getLocalizedUrl,
  getOpenGraphLocale
} from '@/lib/seo';
import { PageHeader } from '@/components/neon/PageHeader';
import { Gate } from '@/components/neon/Gate';
import { CopyButton } from '@/components/neon/CopyButton';
import { JsonLd } from '@/components/JsonLd';

type Props = {
  params: {
    locale: string;
  };
};

export const revalidate = 3600;

const officialSources = [
  {
    key: 'delegate',
    href: 'https://docs.cardano.org/about-cardano/new-to-cardano/how-to-delegate'
  },
  {
    key: 'staking',
    href: 'https://developers.cardano.org/docs/get-started/infrastructure/cardano-cli/basic-operations/withdraw-rewards/'
  },
  {
    key: 'operation',
    href: 'https://cardano.org/stake-pool-operation/'
  },
  {
    key: 'pools',
    href: 'https://docs.cardano.org/about-cardano/learn/stake-pools'
  }
] as const;

const mechanismItems = ['ownership', 'participation', 'operator'] as const;
const rewardSteps = ['snapshot', 'production', 'distribution'] as const;
const delegationSteps = ['open', 'verify', 'wallet', 'confirm', 'check'] as const;
const poolChecks = ['fees', 'saturation', 'performance', 'operator'] as const;

const faqKeys = ['custody', 'guarantee', 'timing', 'redelegate', 'support'] as const;

const relatedPosts = [
  { key: 'subscription', slug: '20260405-subscriptions-are-failing-en' },
  { key: 'sovereignty', slug: '20260131-digital-sovereignty-en' },
  { key: 'infrastructure', slug: '20251201-ai-sword-web3-shield-en' }
] as const;

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'stakingHub' });
  const url = getLocalizedUrl(locale, 'staking');

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    openGraph: {
      title: t('metadata.title'),
      description: t('metadata.description'),
      url,
      siteName: 'Pao Studio',
      type: 'website',
      locale: getOpenGraphLocale(locale),
      alternateLocale: getAlternateOpenGraphLocales(locale),
      images: [
        {
          url: getAbsoluteUrl('/og-default.png'),
          width: 1200,
          height: 630,
          alt: t('metadata.imageAlt')
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metadata.title'),
      description: t('metadata.description'),
      images: [getAbsoluteUrl('/og-default.png')]
    },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates('staking')
    }
  };
}

export default async function StakingPage({ params: { locale } }: Props) {
  const [t, stats] = await Promise.all([getTranslations({ locale, namespace: 'stakingHub' }), getPoolStats()]);
  const canonicalUrl = getLocalizedUrl(locale, 'staking');
  const pageLanguage = getHtmlLang(locale);
  const faqEntities = faqKeys.map((key) => ({
    '@type': 'Question',
    name: t(`faq.items.${key}.question`),
    acceptedAnswer: {
      '@type': 'Answer',
      text: t(`faq.items.${key}.answer`)
    }
  }));
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: t('metadata.title'),
        description: t('metadata.description'),
        inLanguage: pageLanguage,
        isPartOf: { '@id': `${getLocalizedUrl('en')}#website` },
        publisher: { '@id': `${getLocalizedUrl('en')}#organization` },
        about: {
          '@type': 'Thing',
          name: 'Cardano staking'
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('breadcrumb.home'),
            item: getLocalizedUrl(locale)
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t('breadcrumb.staking'),
            item: canonicalUrl
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        url: `${canonicalUrl}#faq`,
        inLanguage: pageLanguage,
        mainEntity: faqEntities
      }
    ]
  };

  return (
    <div className="staking-page">
      <JsonLd id="staking-structured-data" data={structuredData} />
      <PageHeader
        path="staking"
        title={<span className="hl">{t('hero.title')}</span>}
        sub={t('hero.answer')}
        color="cy"
      >
        <div className="ctas">
          <a className="cbtn" href="#delegate">
            {t('hero.learnCta')}
          </a>
          <a className="cbtn alt" href={GlobalConfig.DELEGATE_URL} target="_blank" rel="noopener noreferrer">
            {t('hero.delegateCta')} ↗
          </a>
        </div>
        <p className="safety">{t('hero.safety')}</p>
      </PageHeader>
      <section id="how-it-works" aria-labelledby="mechanism-title">
        <Gate num="01" en={t('mechanism.eyebrow')} title={t('mechanism.title')} titleId="mechanism-title" color="mag" />
        <div className="lane">
          <p className="section-intro">{t('mechanism.intro')}</p>
          <div className="g3">
            {mechanismItems.map((key, i) => (
              <article className="sc" key={key}>
                <span className={`ic ${['g-p', 'g-a', 'g-o'][i]}`} aria-hidden="true" />
                <h3>{t(`mechanism.items.${key}.title`)}</h3>
                <p>{t(`mechanism.items.${key}.body`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="rewards" aria-labelledby="rewards-title">
        <Gate num="02" en={t('rewards.eyebrow')} title={t('rewards.title')} titleId="rewards-title" color="cy" />
        <div className="lane">
          <p className="section-intro">{t('rewards.intro')}</p>
          <ol className="tline">
            {rewardSteps.map((key, i) => (
              <li key={key} style={{ ['--c' as string]: `var(--${['mag', 'cy', 'yel'][i]})` }}>
                <span className="ep">0{i + 1}</span>
                <h3>{t(`rewards.steps.${key}.title`)}</h3>
                <p>{t(`rewards.steps.${key}.body`)}</p>
              </li>
            ))}
          </ol>
          <p className="warn">{t('rewards.disclaimer')}</p>
        </div>
      </section>
      <section id="pao-pool" aria-labelledby="pool-title">
        <Gate num="03" en={t('pool.eyebrow')} title={t('pool.title')} titleId="pool-title" color="yel" />
        <div className="lane poolg">
          <div className="term">
            <header>pool --info</header>
            <dl className="body">
              <div className="row">
                <dt className="k">ticker</dt>
                <dd className="v">PAO</dd>
              </div>
              <div className="pool-id">
                <dt>{t('pool.poolIdLabel')}</dt>
                <dd>
                  <code>{GlobalConfig.POOL_ID}</code>
                  <CopyButton value={GlobalConfig.POOL_ID} ariaLabel={t('pool.poolIdLabel')} />
                </dd>
              </div>
              <div className="row">
                <dt className="k">stake</dt>
                <dd className="v">{stats.isLive ? stats.stake : '—'}</dd>
              </div>
              <div className="row">
                <dt className="k">delegators</dt>
                <dd className="v">{stats.isLive ? stats.delegators : '—'}</dd>
              </div>
              <div className="row">
                <dt className="k">APY (est.)</dt>
                <dd>{stats.apy}</dd>
              </div>
              {stats.marginPct !== null && (
                <div className="row">
                  <dt className="k">margin</dt>
                  <dd>{stats.marginPct}%</dd>
                </div>
              )}
              {stats.fixedCostAda !== null && (
                <div className="row">
                  <dt className="k">fixed cost</dt>
                  <dd>₳ {stats.fixedCostAda}</dd>
                </div>
              )}
            </dl>
            <div className="cta">
              <a className="cbtn sm" href={GlobalConfig.DELEGATE_URL} target="_blank" rel="noopener noreferrer">
                {t('pool.delegateCta')} ↗
              </a>
              <a
                className="cbtn sm alt"
                href={GlobalConfig.CARDANOSCAN_POOL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('pool.verifyCta')} ↗
              </a>
            </div>
          </div>
          <div className="notes">
            <p>{t('pool.intro')}</p>
            <p>{stats.isLive ? t('pool.liveNote') : t('pool.fallbackNote')}</p>
            <p>{t('pool.estimateNote')}</p>
          </div>
        </div>
      </section>
      <section id="delegate" aria-labelledby="delegate-title">
        <Gate num="04" en={t('delegate.eyebrow')} title={t('delegate.title')} titleId="delegate-title" color="grn" />
        <div className="lane">
          <p className="section-intro">{t('delegate.intro')}</p>
          <ol className="dsteps">
            {delegationSteps.map((key) => (
              <li key={key}>
                <h3>{t(`delegate.steps.${key}.title`)}</h3>
                <p>{t(`delegate.steps.${key}.body`)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section id="choose-a-pool" aria-labelledby="choose-title">
        <Gate num="05" en={t('choose.eyebrow')} title={t('choose.title')} titleId="choose-title" color="cy" />
        <div className="lane">
          <p className="section-intro">{t('choose.intro')}</p>
          <div className="g4">
            {poolChecks.map((key) => (
              <article className="ck" key={key}>
                <h3>{t(`choose.items.${key}.title`)}</h3>
                <p>{t(`choose.items.${key}.body`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="membership" aria-labelledby="membership-title" className="lane membership-section">
        <div className="member">
          <span className="tag">{t('membership.label')}</span>
          <h2 id="membership-title">{t('membership.title')}</h2>
          <p>{t('membership.body')}</p>
        </div>
      </section>
      <section id="faq" aria-labelledby="faq-title">
        <Gate num="06" en={t('faq.eyebrow')} title={t('faq.title')} titleId="faq-title" color="mag" />
        <div className="lane faq">
          {faqKeys.map((key, i) => (
            <details key={key} open={i === 0}>
              <summary>
                {t(`faq.items.${key}.question`)}
                <i aria-hidden="true" />
              </summary>
              <p>{t(`faq.items.${key}.answer`)}</p>
            </details>
          ))}
        </div>
      </section>
      <section id="sources" aria-labelledby="sources-title">
        <Gate num="07" en={t('sources.eyebrow')} title={t('sources.title')} titleId="sources-title" color="yel" />
        <div className="lane">
          <p className="section-intro">{t('sources.intro')}</p>
          <div className="srcs">
            <div>
              <h3>{t('sources.officialTitle')}</h3>
              <ul>
                {officialSources.map(({ key, href }) => (
                  <li key={key}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {t(`sources.official.${key}`)} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>{t('sources.relatedTitle')}</h3>
              <ul className="rel">
                {relatedPosts.map(({ key, slug }) => (
                  <li key={key}>
                    <Link href={`/blogs/${getLocalizedPostSlug(slug, locale)}`}>
                      <b>{t(`sources.related.${key}.title`)}</b>
                      <span>{t(`sources.related.${key}.description`)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="warn">{t('sources.disclaimer')}</p>
        </div>
      </section>
      <div className="sec-end" />
    </div>
  );
}
