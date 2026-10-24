import { useTranslations } from 'next-intl';
import { COIL, type Work } from '@/lib/works';
import { Reveal } from '@/components/ui/Reveal';

export const CoilBanner = () => {
  const t = useTranslations('landing.works');
  return (
    <a className="coil" href={COIL.href} target="_blank" rel="noopener noreferrer">
      <span className="scene">
        <img src={COIL.sleep} alt="Coil" width={1440} height={500} loading="lazy" />
        <img className="awake" src={COIL.awake} alt="" width={1440} height={500} loading="lazy" />
      </span>
      <div className="cap">
        <h2>Coil</h2>
        <div>
          <p className="lead">{t('coilLead')}</p>
          <p className="specs">
            {COIL.version} · {COIL.platform}
          </p>
        </div>
        <span className="cbtn sm">{t('coilCta')}</span>
      </div>
    </a>
  );
};

export const WorkCard = ({ work, featured = false }: { work: Work; featured?: boolean }) => {
  const t = useTranslations('projects');
  return (
    <Reveal style={{ ['--c' as string]: `var(--${work.color})` }} className={featured ? 'voda' : 'wcard corners'}>
      <div className="work-card-inner" style={{ ['--c' as string]: `var(--${work.color})` }}>
        <a className="th" href={work.href} target="_blank" rel="noopener noreferrer" aria-label={`${work.name} ↗`}>
          <img src={work.screenshot} alt={work.name} width={800} height={500} loading="lazy" />
        </a>
        <div className="wb">
          <span className="tag">{work.tag}</span>
          {featured ? <h2>{work.name}</h2> : <h3>{work.name}</h3>}
          <p>{t(`items.${work.key}.description`)}</p>
          <div className="links">
            <a href={work.href} target="_blank" rel="noopener noreferrer">
              {t('visit')} ↗
            </a>
            {work.githubHref && (
              <a href={work.githubHref} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
};
