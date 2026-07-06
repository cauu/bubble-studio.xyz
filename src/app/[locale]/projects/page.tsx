import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { GlobalConfig } from '@/constants';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectCard, ProjectCardProps } from '@/components/projects/ProjectCard';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bubble-studio.xyz';
  const url = `${baseUrl}/${locale === 'en' ? '' : locale + '/'}projects`;

  return {
    title: t('seo.projects.title'),
    description: t('seo.projects.description'),
    openGraph: {
      title: t('seo.projects.title'),
      description: t('seo.projects.description'),
      url,
      siteName: t('seo.siteName'),
      type: 'website',
      locale: locale
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/projects`,
        zh: `${baseUrl}/zh/projects`,
        tw: `${baseUrl}/tw/projects`
      }
    }
  };
}

export default function ProjectsPage({ params: { locale } }: Props) {
  const t = useTranslations('projects');

  const cards: ProjectCardProps[] = [
    {
      tile: 'VODA',
      tileColor: 'sky',
      name: t('items.voda.name'),
      body: t('items.voda.body'),
      status: t('items.voda.status'),
      statusColor: 'lemon',
      live: true,
      linkLabel: t('items.voda.link'),
      linkHref: GlobalConfig.social.telegram,
      external: true
    },
    {
      tile: 'PAO',
      tileColor: 'mint',
      name: t('items.pool.name'),
      body: t('items.pool.body'),
      status: t('items.pool.status'),
      statusColor: 'grass',
      linkLabel: t('items.pool.link'),
      linkHref: GlobalConfig.CARDANOSCAN_POOL_URL,
      external: true
    },
    {
      tile: 'GOV',
      tileColor: 'lavender',
      name: t('items.gov.name'),
      body: t('items.gov.body'),
      status: t('items.gov.status'),
      statusColor: 'card',
      linkLabel: t('items.gov.link'),
      linkHref: locale === 'en' ? '/blogs' : `/${locale}/blogs`
    },
    {
      tile: 'BOT',
      tileColor: 'grass',
      name: t('items.bot.name'),
      body: t('items.bot.body'),
      status: t('items.bot.status'),
      statusColor: 'grass',
      linkLabel: t('items.bot.link'),
      linkHref: GlobalConfig.social.telegram,
      external: true
    }
  ];

  return (
    <div className="relative">
      <div className="page-aura animate-aura-drift" aria-hidden="true" />

      <header className="pt-16 max-[860px]:pt-11">
        <Reveal className="wrap">
          <h1 className="text-[clamp(36px,4.5vw,52px)] leading-[1.15] mb-3">{t('title')}</h1>
          <p className="text-[16.5px] text-muted">{t('sub')}</p>
        </Reveal>
      </header>

      <section className="pt-8 max-[860px]:pt-7" aria-label={t('ariaAll')}>
        <div className="wrap">
          <div className="grid grid-cols-2 gap-6 max-[600px]:grid-cols-1">
            {cards.map((card, i) => (
              <Reveal key={card.tile} delay={(i % 2) * 70}>
                <ProjectCard {...card} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pt-[72px] pb-24 max-[860px]:pt-14 max-[860px]:pb-[72px]" aria-label={t('ariaNote')}>
        <div className="wrap">
          <Reveal className="bg-white rounded-lg px-9 py-8 max-[600px]:px-6 flex items-center gap-5 flex-wrap shadow-card">
            <span
              className="w-[22px] h-[22px] rounded-full flex-none grid place-items-center text-xs font-bold bg-brand-incana text-on-dark"
              aria-hidden="true"
            >
              ✓
            </span>
            <p className="flex-1 text-[15px] text-body min-w-[220px]">
              <b className="text-ink font-semibold">{t('note.lead')}</b>
              {t('note.body')}
            </p>
            <Button href={GlobalConfig.DELEGATE_URL} variant="primary" size="md">
              {t('note.cta')}
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
