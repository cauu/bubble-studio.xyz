import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Metadata } from 'next';
import { Reveal } from '@/components/ui/Reveal';
import { ProjectCard, ProjectCardProps } from '@/components/projects/ProjectCard';
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

  const infrastructure: ProjectCardProps[] = [
    {
      type: t('categories.infrastructure.title'),
      title: 'Ouro Pass',
      description: t('items.ouroPass.description'),
      projectHref: 'https://ouro-pass.paopao.studio/',
      githubHref: 'https://github.com/cauu/ouro-pass',
      screenshot: '/images/projects/ouro-pass.jpg',
      visitLabel: t('visit')
    },
    {
      type: t('categories.infrastructure.title'),
      title: 'utxray',
      description: t('items.utxray.description'),
      projectHref: 'https://utxray.paopao.studio/',
      githubHref: 'https://github.com/cauu/utxray',
      screenshot: '/images/projects/utxray.jpg',
      visitLabel: t('visit')
    },
    {
      type: t('categories.infrastructure.title'),
      title: 'Ouro Ops',
      description: t('items.ouroOps.description'),
      projectHref: 'https://ouro-ops.paopao.studio/',
      githubHref: 'https://github.com/cauu/ouro-ops',
      screenshot: '/images/projects/ouro-ops.jpg',
      visitLabel: t('visit')
    }
  ];

  const applications: ProjectCardProps[] = [
    {
      type: t('categories.applications.title'),
      title: 'Cardano Lottery',
      description: t('items.lottery.description'),
      projectHref: 'https://lottery.paopao.studio/',
      screenshot: '/images/projects/cardano-lottery.jpg',
      visitLabel: t('visit')
    },
    {
      type: t('categories.applications.title'),
      title: 'VODA',
      description: t('items.voda.description'),
      projectHref: 'https://voda.bubble-studio.xyz/',
      screenshot: '/images/projects/voda.jpg',
      visitLabel: t('visit')
    }
  ];

  const groups = [
    {
      key: 'infrastructure',
      title: t('categories.infrastructure.title'),
      description: t('categories.infrastructure.description'),
      cards: infrastructure
    },
    {
      key: 'applications',
      title: t('categories.applications.title'),
      description: t('categories.applications.description'),
      cards: applications
    }
  ];

  return (
    <div className="relative overflow-x-hidden pb-24 max-[860px]:pb-[72px]">
      <div className="page-aura animate-aura-drift" aria-hidden="true" />

      <header className="pt-16 max-[860px]:pt-11">
        <Reveal className="wrap">
          <h1 className="text-[clamp(36px,4.5vw,52px)] leading-[1.15]">{t('title')}</h1>
        </Reveal>
      </header>

      <section className="pt-12 max-[860px]:pt-10" aria-label={t('ariaAll')}>
        <div className="wrap">
          <div className="space-y-20 max-[860px]:space-y-16">
            {groups.map((group) => (
              <div key={group.key}>
                <Reveal className="mb-8 max-[600px]:mb-6">
                  <div className="flex items-baseline gap-4 max-[600px]:block">
                    <h2 className="text-[26px] leading-tight">{group.title}</h2>
                    <p className="mt-2 text-[14.5px] text-muted min-[601px]:mt-0">{group.description}</p>
                  </div>
                </Reveal>

                <div className="grid grid-cols-2 gap-x-8 gap-y-10 max-[600px]:grid-cols-1 max-[600px]:gap-y-8">
                  {group.cards.map((card, index) => (
                    <Reveal key={card.title} className="h-full" delay={(index % 2) * 70}>
                      <ProjectCard {...card} />
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
