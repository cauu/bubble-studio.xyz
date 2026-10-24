import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/neon/PageHeader';
import { SkillsGrid } from './SkillsGrid';
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
  const url = getLocalizedUrl(locale, 'skills');

  return {
    title: t('seo.skills.title'),
    description: t('seo.skills.description'),
    openGraph: {
      title: t('seo.skills.title'),
      description: t('seo.skills.description'),
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
      title: t('seo.skills.title'),
      description: t('seo.skills.description'),
      images: [getAbsoluteUrl('/og-default.png')]
    },
    alternates: {
      canonical: url,
      languages: getLanguageAlternates('skills')
    }
  };
}

export default function SkillsPage() {
  const t = useTranslations('pages');
  return (
    <div className="skills-page">
      <PageHeader path="skills" title={<span className="hl">{t('skillsTitle')}</span>} sub={t('skillsSub')} color="grn">
        <a className="text-link" href="https://github.com/cauu/skills" target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
      </PageHeader>
      <section className="lane page-content">
        <SkillsGrid />
      </section>
      <div className="sec-end" />
    </div>
  );
}
