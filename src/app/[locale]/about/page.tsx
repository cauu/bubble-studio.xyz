import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { JsonLd } from '@/components/JsonLd';
import { PageHeader } from '@/components/neon/PageHeader';
import { Gate } from '@/components/neon/Gate';
import { CopyButton } from '@/components/neon/CopyButton';
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

  return (
    <div className="about-page">
      <JsonLd id="about-structured-data" data={structuredData} />
      <PageHeader path="about" title={<span className="hl">{t('title')}</span>} sub={t('intro')} color="yel" />
      <section aria-labelledby="identity-title">
        <Gate num="01" en={t('studio.eyebrow')} title={t('studio.title')} titleId="identity-title" color="mag" />
        <div className="lane arow">
          <div className="shape g-p" data-py="-.04" aria-hidden="true" />
          <div>
            <p className="lead">{t('studio.body')}</p>
            <div className="term">
              <header>studio --identity</header>
              <dl className="body">
                <div className="row">
                  <dt className="k">{t('studio.alias')}</dt>
                  <dd>Bubble Studio</dd>
                </div>
                <div className="row">
                  <dt className="k">domain</dt>
                  <dd>bubble-studio.xyz</dd>
                </div>
                <div className="row">
                  <dt className="k">{t('studio.contact')}</dt>
                  <dd>
                    <a className="text-link" href={`mailto:${GlobalConfig.CONTACT_EMAIL}`}>
                      {t('studio.email')} ↗
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
      <section id="martin" aria-labelledby="martin-title">
        <Gate num="02" en={t('author.eyebrow')} title="Martin / 0xMartin" titleId="martin-title" color="cy" />
        <div className="lane arow">
          <div className="shape g-a" data-py=".04" aria-hidden="true" />
          <div>
            <p className="lead">{t('author.body')}</p>
            <div className="links">
              <a className="cbtn alt" href={GlobalConfig.social.github} target="_blank" rel="noopener noreferrer">
                {t('author.github')} ↗
              </a>
              <a className="cbtn alt" href={GlobalConfig.social.twitter} target="_blank" rel="noopener noreferrer">
                {t('author.x')} ↗
              </a>
            </div>
          </div>
        </div>
      </section>
      <section id="pao-pool" aria-labelledby="about-pool-title">
        <Gate num="03" en={t('pool.eyebrow')} title="Pao Pool" titleId="about-pool-title" color="yel" />
        <div className="lane arow">
          <div className="shape g-o" data-py="-.05" aria-hidden="true" />
          <div>
            <p className="lead">{t('pool.body')}</p>
            <div className="term">
              <header>pool --id</header>
              <dl className="body">
                <div className="row">
                  <dt className="k">ticker</dt>
                  <dd className="v">PAO</dd>
                </div>
                <div className="pool-id">
                  <dt>{t('pool.id')}</dt>
                  <dd>
                    <code>{GlobalConfig.POOL_ID}</code>
                    <CopyButton value={GlobalConfig.POOL_ID} ariaLabel={t('pool.id')} />
                  </dd>
                </div>
              </dl>
            </div>
            <div className="links">
              <a className="cbtn" href={`${getLocalizedPath(locale, 'staking')}#pao-pool`}>
                {t('pool.details')} →
              </a>
              <a
                className="cbtn alt"
                href={GlobalConfig.CARDANOSCAN_POOL_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('pool.cardanoscan')} ↗
              </a>
              <a className="cbtn alt" href={GlobalConfig.DELEGATE_URL} target="_blank" rel="noopener noreferrer">
                {t('pool.cexplorer')} ↗
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="sec-end" />
    </div>
  );
}
