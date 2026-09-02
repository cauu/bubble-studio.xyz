import { Metadata } from 'next';
import { ArrowUpRight, Github, Mail } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { GlobalConfig } from '@/constants';
import { getEntityIds } from '@/lib/entities';
import {
  getAbsoluteUrl,
  getAlternateOpenGraphLocales,
  getHtmlLang,
  getLanguageAlternates,
  getLocalizedPath,
  getLocalizedUrl,
  getOpenGraphLocale
} from '@/lib/seo';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const url = getLocalizedUrl(locale, 'about');

  return {
    title: t('seo.about.title'),
    description: t('seo.about.description'),
    openGraph: {
      title: t('seo.about.title'),
      description: t('seo.about.description'),
      url,
      siteName: t('seo.siteName'),
      type: 'website',
      locale: getOpenGraphLocale(locale),
      images: [
        {
          url: getAbsoluteUrl('/og-default.png'),
          width: 1200,
          height: 630,
          alt: t('seo.siteName')
        }
      ],
      alternateLocale: getAlternateOpenGraphLocales(locale)
    },
    twitter: {
      card: 'summary_large_image',
      title: t('seo.about.title'),
      description: t('seo.about.description'),
      images: [getAbsoluteUrl('/og-default.png')]
    },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates('about')
    }
  };
}

export default async function AboutPage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'about' });
  const url = getLocalizedUrl(locale, 'about');
  const ids = getEntityIds();
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${url}#webpage`,
        url,
        name: t('title'),
        description: t('intro'),
        inLanguage: getHtmlLang(locale),
        isPartOf: {
          '@id': ids.website
        },
        mainEntity: {
          '@id': ids.organization
        },
        about: [{ '@id': ids.organization }, { '@id': ids.martin }, { '@id': ids.paoPool }]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: t('home'),
            item: getLocalizedUrl(locale)
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: t('title'),
            item: url
          }
        ]
      }
    ]
  };

  const externalLinkClass =
    'inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand-incana underline decoration-hairline underline-offset-4 transition-colors hover:text-primary';

  return (
    <div className="relative overflow-x-hidden pb-24 max-[860px]:pb-[72px]">
      <JsonLd id="about-structured-data" data={structuredData} />
      <div className="page-aura animate-aura-drift" aria-hidden="true" />

      <header className="pt-16 max-[860px]:pt-11">
        <Reveal className="wrap">
          <span className="mb-5 block text-xs font-bold uppercase tracking-[0.12em] text-brand-incana">
            {t('eyebrow')}
          </span>
          <h1 className="text-[clamp(36px,4.5vw,52px)] leading-[1.15]">{t('title')}</h1>
          <p className="mt-5 max-w-[48rem] text-[16.5px] leading-[1.8] text-body">{t('intro')}</p>
        </Reveal>
      </header>

      <section className="pt-12 max-[860px]:pt-10" aria-labelledby="identity-title">
        <div className="wrap">
          <Reveal className="overflow-hidden rounded-lg border border-hairline bg-white shadow-[0_8px_24px_rgba(23,32,38,.06)]">
            <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(240px,.8fr)] max-[760px]:grid-cols-1">
              <div className="p-8 max-[600px]:p-6">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-brand-incana">
                  {t('studio.eyebrow')}
                </span>
                <h2 id="identity-title" className="mt-3 text-[26px] leading-tight">
                  {t('studio.title')}
                </h2>
                <p className="mt-4 max-w-[40rem] text-[15px] leading-[1.8] text-body">{t('studio.body')}</p>
              </div>
              <dl className="border-l border-hairline bg-canvas-soft p-8 max-[760px]:border-l-0 max-[760px]:border-t max-[600px]:p-6">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">{t('studio.alias')}</dt>
                  <dd className="mt-2 text-[16px] font-semibold text-ink">Bubble Studio</dd>
                </div>
                <div className="mt-6 border-t border-hairline pt-6">
                  <dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">{t('studio.contact')}</dt>
                  <dd className="mt-2">
                    <a className={externalLinkClass} href={`mailto:${GlobalConfig.CONTACT_EMAIL}`}>
                      <Mail size={15} aria-hidden="true" />
                      {t('studio.email')}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pt-8" aria-label={t('factsLabel')}>
        <div className="wrap grid grid-cols-2 gap-8 max-[760px]:grid-cols-1">
          <article id="martin" className="scroll-mt-24">
            <Reveal className="h-full rounded-lg border border-hairline bg-white p-8 shadow-[0_8px_24px_rgba(23,32,38,.06)] max-[600px]:p-6">
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-brand-incana">
                {t('author.eyebrow')}
              </span>
              <h2 className="mt-3 text-[26px] leading-tight">Martin / 0xMartin</h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-body">{t('author.body')}</p>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <a
                  className={externalLinkClass}
                  href={GlobalConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={15} aria-hidden="true" />
                  {t('author.github')}
                </a>
                <a
                  className={externalLinkClass}
                  href={GlobalConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('author.x')}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </article>

          <article id="pao-pool" className="scroll-mt-24">
            <Reveal
              className="h-full rounded-lg border border-hairline bg-white p-8 shadow-[0_8px_24px_rgba(23,32,38,.06)] max-[600px]:p-6"
              delay={70}
            >
              <span className="text-xs font-bold uppercase tracking-[0.12em] text-brand-incana">
                {t('pool.eyebrow')}
              </span>
              <h2 className="mt-3 text-[26px] leading-tight">Pao Pool</h2>
              <p className="mt-4 text-[15px] leading-[1.8] text-body">{t('pool.body')}</p>
              <div className="mt-5 rounded-md bg-canvas-soft p-4">
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-muted">{t('pool.id')}</span>
                <code className="mt-2 block break-all text-[12.5px] leading-[1.7] text-ink">
                  {GlobalConfig.POOL_ID}
                </code>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <a
                  className={externalLinkClass}
                  href={GlobalConfig.CARDANOSCAN_POOL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('pool.cardanoscan')}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a
                  className={externalLinkClass}
                  href={GlobalConfig.DELEGATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('pool.cexplorer')}
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <a className={externalLinkClass} href={`${getLocalizedPath(locale, 'staking')}#pao-pool`}>
                  {t('pool.details')}
                </a>
              </div>
            </Reveal>
          </article>
        </div>
      </section>
    </div>
  );
}
