import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GlobalConfig } from '@/constants';
import { PaopaoMascot } from './PaopaoMascot';

const footLinkClass =
  'block text-[14.5px] font-medium text-body py-[5px] max-[600px]:py-2 transition-colors hover:text-ink';

export const Footer = () => {
  const t = useTranslations();

  return (
    <footer className="relative bg-surface-soft pt-[88px] pb-7 max-[600px]:pt-16 max-[600px]:pb-6">
      <div className="absolute right-[9%] max-[900px]:right-[6%] -top-[26px] max-[600px]:-top-[22px] z-[2]">
        <PaopaoMascot size={64} highlight="canvas" />
      </div>

      <div className="mx-auto max-w-wrap px-6 max-[600px]:px-[18px]">
        <div className="grid grid-cols-[1.6fr_1fr_1fr] gap-10 items-start max-[860px]:grid-cols-2 max-[860px]:gap-y-9 max-[860px]:gap-x-8 max-[600px]:gap-y-8 max-[600px]:gap-x-5">
          <div className="max-[860px]:col-span-2">
            <div className="flex items-center gap-2.5 font-bold text-[17px] text-ink mb-4">
              <img
                src={GlobalConfig.assetsUrl.bubbleLogo}
                alt={`Pao Studio ${t('nav.logoAlt')}`}
                className="h-[26px] w-auto"
              />
              <span>Pao Studio</span>
            </div>
            <p className="text-sm text-body max-w-[24em] leading-relaxed">{t('footer.blurb')}</p>
            <div className="flex items-center gap-3.5 mt-6">
              <PaopaoMascot size={48} highlight="soft" label={t('footer.mascotAlt')} />
              <span className="text-xs font-semibold text-body">{t('footer.mascotAlt')}</span>
            </div>
          </div>

          <nav aria-label={t('footer.explore')}>
            <h4 className="text-xs font-bold uppercase tracking-[.1em] text-body mb-4">{t('footer.explore')}</h4>
            <Link href="/" className={footLinkClass}>
              {t('nav.home')}
            </Link>
            <Link href="/blogs" className={footLinkClass}>
              {t('nav.blog')}
            </Link>
            <Link href="/projects" className={footLinkClass}>
              {t('nav.projects')}
            </Link>
            <Link href="/staking" className={footLinkClass}>
              {t('footer.staking')}
            </Link>
            <Link href="/governance" className={footLinkClass}>
              {t('footer.governance')}
            </Link>
            <a
              href={GlobalConfig.CARDANOSCAN_POOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={footLinkClass}
            >
              CardanoScan
            </a>
          </nav>

          <nav aria-label={t('footer.community')}>
            <h4 className="text-xs font-bold uppercase tracking-[.1em] text-body mb-4">{t('footer.community')}</h4>
            <a href={GlobalConfig.social.twitter} target="_blank" rel="noopener noreferrer" className={footLinkClass}>
              X
            </a>
            <a href={GlobalConfig.social.telegram} target="_blank" rel="noopener noreferrer" className={footLinkClass}>
              Telegram
            </a>
            <a href={`mailto:${GlobalConfig.CONTACT_EMAIL}`} className={footLinkClass}>
              Email
            </a>
          </nav>
        </div>

        <div className="mt-12 pt-6 border-t border-hairline text-[13.5px] text-body flex flex-wrap items-center gap-2 max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-1.5">
          <span className="tnum">© 2024–2026 Pao Studio</span>
        </div>
      </div>
    </footer>
  );
};
