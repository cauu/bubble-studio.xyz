import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GlobalConfig } from '@/constants';
import { EpochClock } from '@/components/neon/EpochClock';

export const Footer = () => {
  const t = useTranslations();

  // Same pages as the main nav + social; low-exposure pages (/staking, /about, /governance) stay out (S0002.1, S0004)
  return (
    <footer className="sitefoot">
      <div className="top">
        <div className="brand">
          <img src="/images/pao-logo-dark.svg" alt="Pao Studio" width={185} height={26} loading="lazy" />
          <p>{t('footer.blurb')}</p>
        </div>
        <div>
          <h4>{t('footer.explore').toUpperCase()}</h4>
          <ul>
            <li>
              <Link href="/projects">{t('nav.projects')}</Link>
            </li>
            <li>
              <Link href="/blogs">{t('nav.blog')}</Link>
            </li>
            <li>
              <Link href="/skills">{t('nav.skills')}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4>{t('footer.social').toUpperCase()}</h4>
          <ul>
            <li>
              <a href={GlobalConfig.social.twitter} target="_blank" rel="noopener noreferrer">
                X ↗
              </a>
            </li>
            <li>
              <a href={GlobalConfig.social.github} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bot">
        <span className="tnum">© 2024–2026 PAO STUDIO // BUILT ON CARDANO ₳</span>
        <span className="tnum">
          EPOCH <EpochClock part="epoch" /> · <EpochClock part="left" />
        </span>
      </div>
    </footer>
  );
};
