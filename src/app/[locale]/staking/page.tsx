import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import {
  Activity,
  BadgeCheck,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Gauge,
  Network,
  Search,
  Server,
  ShieldCheck,
  WalletCards
} from 'lucide-react';

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
import { PoolLedgerCard } from '@/components/home/PoolLedgerCard';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
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

const mechanismItems = [
  { key: 'ownership', icon: ShieldCheck, color: 'bg-brand-mint' },
  { key: 'participation', icon: Network, color: 'bg-brand-sky' },
  { key: 'operator', icon: Server, color: 'bg-brand-lavender' }
] as const;

const rewardSteps = [
  { key: 'snapshot', icon: Clock3 },
  { key: 'production', icon: Activity },
  { key: 'distribution', icon: BadgeCheck }
] as const;

const delegationSteps = [
  { key: 'open', icon: ExternalLink },
  { key: 'verify', icon: Search },
  { key: 'wallet', icon: WalletCards },
  { key: 'confirm', icon: CheckCircle2 },
  { key: 'check', icon: BadgeCheck }
] as const;

const poolChecks = [
  { key: 'fees', icon: WalletCards },
  { key: 'saturation', icon: Gauge },
  { key: 'performance', icon: Activity },
  { key: 'operator', icon: Server }
] as const;

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
    <div className="relative overflow-x-hidden pb-24 max-[860px]:pb-[72px]">
      <JsonLd id="staking-structured-data" data={structuredData} />
      <section className="relative isolate overflow-hidden pb-20 pt-20 max-[860px]:pb-16 max-[860px]:pt-14">
        <div className="hero-aura animate-aura-drift" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="wrap relative z-[1] grid grid-cols-[1.15fr_.85fr] items-center gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-10">
          <div>
            <span className="mb-5 block text-xs font-bold uppercase tracking-[.12em] text-brand-incana">
              {t('hero.eyebrow')}
            </span>
            <h1 className="max-w-[13em] text-balance text-[clamp(42px,5vw,64px)] leading-[1.1] tracking-[-1.5px] max-[600px]:text-[38px]">
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-[41rem] text-pretty text-[17px] leading-[1.8] text-body-strong">
              {t('hero.answer')}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 max-[600px]:flex-col">
              <Button href="#delegate" size="lg" className="max-[600px]:w-full">
                {t('hero.learnCta')}
              </Button>
              <Button
                href={GlobalConfig.DELEGATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="lg"
                className="max-[600px]:w-full"
              >
                {t('hero.delegateCta')}
                <ExternalLink size={16} aria-hidden="true" />
              </Button>
            </div>
            <p className="mt-4 text-sm font-semibold text-muted">{t('hero.safety')}</p>
          </div>
          <PoolLedgerCard stats={stats} />
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-20 max-[860px]:py-16" aria-labelledby="mechanism-title">
        <div className="wrap">
          <span className="text-xs font-bold uppercase tracking-[.12em] text-brand-incana">
            {t('mechanism.eyebrow')}
          </span>
          <h2 id="mechanism-title" className="mt-4 max-w-[18em] text-[clamp(30px,4vw,44px)] leading-[1.15]">
            {t('mechanism.title')}
          </h2>
          <p className="mt-5 max-w-[48rem] text-[16px] leading-[1.8] text-body">{t('mechanism.intro')}</p>
          <div className="mt-10 grid grid-cols-3 gap-8 max-[820px]:grid-cols-1 max-[820px]:gap-0">
            {mechanismItems.map(({ key, icon: Icon, color }) => (
              <article
                key={key}
                className="border-t border-hairline pt-6 max-[820px]:grid max-[820px]:grid-cols-[44px_1fr] max-[820px]:gap-x-4 max-[820px]:py-6"
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-md text-ink ${color} max-[820px]:row-span-2`}
                  aria-hidden="true"
                >
                  <Icon size={19} />
                </span>
                <h3 className="mt-5 text-lg leading-[1.4] max-[820px]:mt-0">{t(`mechanism.items.${key}.title`)}</h3>
                <p className="mt-2 text-[14.5px] leading-[1.75] text-body">{t(`mechanism.items.${key}.body`)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="rewards" className="py-20 max-[860px]:py-16" aria-labelledby="rewards-title">
        <div className="wrap">
          <div className="overflow-hidden rounded-xl bg-brand-incana px-10 py-10 text-on-dark max-[760px]:px-6 max-[760px]:py-8">
            <span className="text-xs font-bold uppercase tracking-[.12em] text-brand-lemon">
              {t('rewards.eyebrow')}
            </span>
            <h2 id="rewards-title" className="mt-4 max-w-[18em] text-[clamp(30px,4vw,44px)] leading-[1.15] text-white">
              {t('rewards.title')}
            </h2>
            <p className="mt-5 max-w-[50rem] text-[16px] leading-[1.8] text-white/80">{t('rewards.intro')}</p>
            <ol className="mt-9 grid grid-cols-3 divide-x divide-white/20 border-y border-white/20 max-[760px]:grid-cols-1 max-[760px]:divide-x-0 max-[760px]:divide-y">
              {rewardSteps.map(({ key, icon: Icon }, index) => (
                <li key={key} className="px-6 py-7 first:pl-0 last:pr-0 max-[760px]:px-0 max-[760px]:py-6">
                  <div className="flex items-center justify-between">
                    <Icon size={20} className="text-brand-lemon" aria-hidden="true" />
                    <span className="text-xs font-bold text-white/50 tnum">0{index + 1}</span>
                  </div>
                  <h3 className="mt-4 text-lg leading-[1.4] text-white">{t(`rewards.steps.${key}.title`)}</h3>
                  <p className="mt-2 text-[14px] leading-[1.75] text-white/75">{t(`rewards.steps.${key}.body`)}</p>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-l-2 border-brand-lemon pl-4 text-[14px] leading-[1.7] text-white/85">
              {t('rewards.disclaimer')}
            </p>
          </div>
        </div>
      </section>

      <section id="pao-pool" className="bg-white py-20 max-[860px]:py-16" aria-labelledby="pool-title">
        <div className="wrap grid grid-cols-[.88fr_1.12fr] items-start gap-16 max-[900px]:grid-cols-1 max-[900px]:gap-9">
          <div>
            <span className="text-xs font-bold uppercase tracking-[.12em] text-brand-incana">{t('pool.eyebrow')}</span>
            <h2 id="pool-title" className="mt-4 text-[clamp(30px,4vw,44px)] leading-[1.15]">
              {t('pool.title')}
            </h2>
            <p className="mt-5 text-[16px] leading-[1.8] text-body">{t('pool.intro')}</p>
          </div>
          <div className="rounded-xl bg-surface-soft p-8 max-[600px]:p-5">
            <div className="border-b border-hairline pb-6">
              <span className="text-xs font-bold uppercase tracking-[.1em] text-muted">{t('pool.poolIdLabel')}</span>
              <code className="mt-3 block break-all text-[13px] leading-[1.7] text-ink">{GlobalConfig.POOL_ID}</code>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 max-[600px]:flex-col">
              <Button href={GlobalConfig.DELEGATE_URL} target="_blank" rel="noopener noreferrer" size="lg">
                {t('pool.delegateCta')}
                <ExternalLink size={16} aria-hidden="true" />
              </Button>
              <Button
                href={GlobalConfig.CARDANOSCAN_POOL_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="lg"
              >
                {t('pool.verifyCta')}
              </Button>
            </div>
            <p className="mt-6 text-[13px] leading-[1.7] text-muted">
              {stats.isLive ? t('pool.liveNote') : t('pool.fallbackNote')}
            </p>
            <p className="mt-2 text-[13px] leading-[1.7] text-muted">{t('pool.estimateNote')}</p>
          </div>
        </div>
      </section>

      <section id="delegate" className="scroll-mt-24 py-20 max-[860px]:py-16" aria-labelledby="delegate-title">
        <div className="wrap">
          <span className="text-xs font-bold uppercase tracking-[.12em] text-brand-incana">
            {t('delegate.eyebrow')}
          </span>
          <h2 id="delegate-title" className="mt-4 max-w-[20em] text-[clamp(30px,4vw,44px)] leading-[1.15]">
            {t('delegate.title')}
          </h2>
          <p className="mt-5 max-w-[50rem] text-[16px] leading-[1.8] text-body">{t('delegate.intro')}</p>
          <ol className="mt-10 max-w-[900px] border-y border-hairline">
            {delegationSteps.map(({ key, icon: Icon }, index) => (
              <li
                key={key}
                className="grid grid-cols-[72px_1fr] gap-5 border-b border-hairline-soft py-6 last:border-b-0 max-[600px]:grid-cols-[52px_1fr] max-[600px]:gap-3"
              >
                <div className="flex items-start justify-between gap-2 pt-0.5 max-[600px]:justify-start">
                  <Icon size={19} className="text-brand-incana" aria-hidden="true" />
                  <span className="text-xs font-bold text-muted tnum max-[600px]:hidden">0{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-[17px] leading-[1.4]">
                    <span className="mr-2 hidden text-xs text-muted tnum max-[600px]:inline">0{index + 1}</span>
                    {t(`delegate.steps.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-[1.75] text-body">{t(`delegate.steps.${key}.body`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="choose-a-pool" className="bg-white py-20 max-[860px]:py-16" aria-labelledby="choose-title">
        <div className="wrap">
          <span className="text-xs font-bold uppercase tracking-[.12em] text-brand-incana">{t('choose.eyebrow')}</span>
          <h2 id="choose-title" className="mt-4 text-[clamp(30px,4vw,44px)] leading-[1.15]">
            {t('choose.title')}
          </h2>
          <p className="mt-5 max-w-[48rem] text-[16px] leading-[1.8] text-body">{t('choose.intro')}</p>
          <div className="mt-9 grid grid-cols-2 gap-x-10 max-[700px]:grid-cols-1">
            {poolChecks.map(({ key, icon: Icon }) => (
              <article key={key} className="grid grid-cols-[36px_1fr] gap-4 border-t border-hairline py-6">
                <span
                  className="grid h-9 w-9 flex-none place-items-center rounded-md bg-brand-sky text-primary"
                  aria-hidden="true"
                >
                  <Icon size={17} />
                </span>
                <div>
                  <h3 className="text-[17px] leading-[1.4]">{t(`choose.items.${key}.title`)}</h3>
                  <p className="mt-2 text-[14.5px] leading-[1.75] text-body">{t(`choose.items.${key}.body`)}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="membership" className="py-20 max-[860px]:py-16" aria-labelledby="membership-title">
        <div className="wrap">
          <div className="grid grid-cols-[auto_1fr] items-start gap-7 rounded-xl bg-brand-lemon px-10 py-9 max-[650px]:grid-cols-1 max-[650px]:gap-5 max-[650px]:px-6 max-[650px]:py-7">
            <Chip color="blank" className="justify-self-start">
              {t('membership.label')}
            </Chip>
            <div>
              <h2 id="membership-title" className="text-[clamp(28px,3.5vw,40px)] leading-[1.15]">
                {t('membership.title')}
              </h2>
              <p className="mt-4 max-w-[52rem] text-[15.5px] leading-[1.8] text-body-strong">{t('membership.body')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-white py-20 max-[860px]:py-16" aria-labelledby="faq-title">
        <div className="wrap">
          <span className="text-xs font-bold uppercase tracking-[.12em] text-brand-incana">{t('faq.eyebrow')}</span>
          <h2 id="faq-title" className="mt-4 max-w-[16em] text-[clamp(30px,4vw,44px)] leading-[1.15]">
            {t('faq.title')}
          </h2>
          <div className="mt-10 max-w-[900px] divide-y divide-hairline border-y border-hairline">
            {faqKeys.map((key, index) => (
              <details key={key} open={index === 0} className="group py-5">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-[17px] font-semibold leading-[1.45] text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                  <span>{t(`faq.items.${key}.question`)}</span>
                  <span
                    className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-surface-soft text-base font-medium leading-none text-body transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[48rem] pr-11 text-[14.5px] leading-[1.75] text-body">
                  {t(`faq.items.${key}.answer`)}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="sources" className="py-20 max-[860px]:py-16" aria-labelledby="sources-title">
        <div className="wrap">
          <span className="text-xs font-bold uppercase tracking-[.12em] text-brand-incana">{t('sources.eyebrow')}</span>
          <h2 id="sources-title" className="mt-4 text-[clamp(30px,4vw,44px)] leading-[1.15]">
            {t('sources.title')}
          </h2>
          <p className="mt-5 max-w-[50rem] text-[15.5px] leading-[1.8] text-body">{t('sources.intro')}</p>

          <div className="mt-10 grid grid-cols-2 gap-8 max-[800px]:grid-cols-1">
            <div>
              <h3 className="text-xl">{t('sources.officialTitle')}</h3>
              <ul className="mt-4 border-t border-hairline">
                {officialSources.map(({ key, href }) => (
                  <li key={key}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-4 border-b border-hairline py-4 text-[14px] font-semibold text-ink transition-colors hover:text-brand-incana"
                    >
                      <span>{t(`sources.official.${key}`)}</span>
                      <ExternalLink size={15} className="mt-0.5 flex-none text-muted" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl">{t('sources.relatedTitle')}</h3>
              <ul className="mt-4 border-t border-hairline">
                {relatedPosts.map(({ key, slug }) => (
                  <li key={key}>
                    <Link
                      href={`/blogs/${getLocalizedPostSlug(slug, locale)}`}
                      className="group block border-b border-hairline py-4"
                    >
                      <span className="block text-[14px] font-semibold text-ink transition-colors group-hover:text-brand-incana">
                        {t(`sources.related.${key}.title`)}
                      </span>
                      <span className="mt-1 block text-[13px] leading-[1.6] text-muted">
                        {t(`sources.related.${key}.description`)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 max-w-[52rem] border-l-2 border-brand-incana pl-4 text-[13.5px] leading-[1.75] text-body">
            {t('sources.disclaimer')}
          </p>
        </div>
      </section>
    </div>
  );
}
