import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { SkillsGrid } from './SkillsGrid';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bubble-studio.xyz';
  const url = `${baseUrl}/${locale === 'en' ? '' : locale + '/'}skills`;

  return {
    title: t('seo.skills.title'),
    description: t('seo.skills.description'),
    openGraph: {
      title: t('seo.skills.title'),
      description: t('seo.skills.description'),
      url,
      siteName: t('seo.siteName'),
      type: 'website',
      locale
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/skills`,
        zh: `${baseUrl}/zh/skills`,
        tw: `${baseUrl}/tw/skills`
      }
    }
  };
}

export default function SkillsPage() {
  const t = useTranslations('skills');

  return (
    <div className="relative overflow-x-hidden pb-24 max-[860px]:pb-[72px]">
      <div className="page-aura animate-aura-drift" aria-hidden="true" />

      <header className="pt-16 max-[860px]:pt-11">
        <Reveal className="wrap">
          <span className="mb-5 block text-xs font-bold uppercase tracking-[0.12em] text-brand-incana">
            {t('eyebrow')}
          </span>
          <h1 className="whitespace-nowrap text-[clamp(36px,4.5vw,52px)] leading-[1.15] max-[860px]:whitespace-normal">
            {t('title')}
          </h1>
          <p className="mt-5 max-w-[46rem] text-[16.5px] leading-[1.8] text-body">{t('sub')}</p>
        </Reveal>
      </header>

      <section className="pt-12 max-[860px]:pt-10">
        <div className="wrap">
          <SkillsGrid />
        </div>
      </section>
    </div>
  );
}
