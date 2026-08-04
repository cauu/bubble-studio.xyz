import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { GlobalConfig } from '@/constants';
import { Link } from '@/i18n/navigation';
import { ProjectCard, ProjectCardProps } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';

export const ServicesBand = () => {
  const t = useTranslations('home.services');
  const tProjects = useTranslations('projects');

  const projects: ProjectCardProps[] = [
    {
      type: tProjects('categories.infrastructure.title'),
      title: 'Ouro Pass',
      description: tProjects('items.ouroPass.description'),
      projectHref: 'https://ouro-pass.paopao.studio/',
      githubHref: 'https://github.com/cauu/ouro-pass',
      screenshot: '/images/projects/ouro-pass.jpg',
      visitLabel: tProjects('visit')
    },
    {
      type: tProjects('categories.infrastructure.title'),
      title: 'utxray',
      description: tProjects('items.utxray.description'),
      projectHref: 'https://utxray.paopao.studio/',
      githubHref: 'https://github.com/cauu/utxray',
      screenshot: '/images/projects/utxray.jpg',
      visitLabel: tProjects('visit')
    },
    {
      type: tProjects('categories.infrastructure.title'),
      title: 'Ouro Ops',
      description: tProjects('items.ouroOps.description'),
      projectHref: 'https://ouro-ops.paopao.studio/',
      githubHref: 'https://github.com/cauu/ouro-ops',
      screenshot: '/images/projects/ouro-ops.jpg',
      visitLabel: tProjects('visit')
    }
  ];

  return (
    <section className="bg-white py-section max-[860px]:py-[72px]" aria-labelledby="svc-h2">
      <div className="wrap">
        <Reveal className="mb-10 flex items-end justify-between gap-8 max-[760px]:items-start max-[760px]:flex-col">
          <div className="max-w-[760px]">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[.12em] text-brand-incana">
              {t('workEyebrow')}
            </span>
            <h2 id="svc-h2" className="text-[clamp(30px,4vw,46px)] leading-[1.15] text-balance">
              {t('workTitle')}
            </h2>
            <p className="mt-4 max-w-[760px] text-[16px] leading-[1.75] text-body">{t('workBody')}</p>
          </div>
          <Link
            href="/projects"
            className="inline-flex flex-none items-center gap-2 text-[15px] font-semibold text-ink transition-colors hover:text-brand-incana"
          >
            {t('allProjects')}
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[620px]:grid-cols-1">
          {projects.map((project, index) => (
            <Reveal
              key={project.title}
              className={index === 2 ? 'max-[900px]:col-span-2 max-[620px]:col-span-1' : ''}
              delay={index * 55}
            >
              <ProjectCard {...project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="relative mt-12 flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-xl bg-surface-card px-14 py-12 shadow-[0_1px_2px_rgba(23,32,38,.04),0_12px_32px_rgba(23,32,38,.07),inset_0_1px_0_rgba(255,255,255,.5)] max-[860px]:px-7 max-[860px]:py-10">
          <span
            className="absolute rounded-full bg-[rgba(249,248,246,.6)] pointer-events-none w-[200px] h-[200px] -top-[70px] right-[22%]"
            aria-hidden="true"
          />
          <span
            className="absolute rounded-full bg-[rgba(249,248,246,.6)] pointer-events-none w-[120px] h-[120px] -bottom-[46px] -left-[30px]"
            aria-hidden="true"
          />

          <div className="relative max-w-[36em]">
            <Chip color="blank" className="mb-4">
              {t('chip')}
            </Chip>
            <h3 className="mb-3 text-[clamp(26px,3.2vw,36px)] leading-[1.2]">{t('title')}</h3>
            <p className="whitespace-pre-line text-base text-body">{t('body')}</p>
          </div>

          <div className="relative flex flex-col items-start gap-3">
            <Button href={`mailto:${GlobalConfig.CONTACT_EMAIL}`} variant="primary" size="lg">
              {t('cta')}
            </Button>
            <span className="text-[13px] text-body tnum">{GlobalConfig.CONTACT_EMAIL}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
