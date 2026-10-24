import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { PageHeader } from '@/components/neon/PageHeader';
import { Gate } from '@/components/neon/Gate';
import { CoilBanner, WorkCard } from '@/components/neon/Works';
import { WORKS } from '@/lib/works';
import {
  getAbsoluteUrl,
  getAlternateOpenGraphLocales,
  getLanguageAlternates,
  getLocalizedUrl,
  getOpenGraphLocale
} from '@/lib/seo';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const url = getLocalizedUrl(locale, 'projects');

  return {
    title: t('seo.projects.title'),
    description: t('seo.projects.description'),
    openGraph: {
      title: t('seo.projects.title'),
      description: t('seo.projects.description'),
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
      title: t('seo.projects.title'),
      description: t('seo.projects.description'),
      images: [getAbsoluteUrl('/og-default.png')]
    },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates('projects')
    }
  };
}

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const p = useTranslations('pages');
  const voda = WORKS.find((work) => work.key === 'voda')!;
  return (
    <div className="works-page">
      <PageHeader path="works" title={<span className="hl">{p('worksTitle')}</span>} sub={p('worksSub')} color="cy" />
      <section aria-label={t('ariaAll')} className="lane page-content">
        <CoilBanner />
        <WorkCard work={voda} featured />
      </section>
      {(['infrastructure', 'applications'] as const).map((group, index) => (
        <section key={group}>
          <Gate
            num={`0${index + 1}`}
            en={group.toUpperCase()}
            title={t(`categories.${group}.title`)}
            color={index ? 'grn' : 'mag'}
          />
          <div className="lane wgrid">
            {WORKS.filter((work) => work.group === group && work.key !== 'voda').map((work) => (
              <WorkCard key={work.key} work={work} />
            ))}
          </div>
        </section>
      ))}
      <div className="sec-end" />
    </div>
  );
}
