import { useLocale, useTranslations } from 'next-intl';
import clsx from 'clsx';
import { GlobalConfig } from '@/constants';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { PoolLedgerCard, PoolStats } from './PoolLedgerCard';

export const Hero = ({ stats }: { stats: PoolStats }) => {
  const t = useTranslations('home.hero');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  // Latin titles run much longer than CJK — step the display size down and
  // apply the spec's negative display tracking so the h1 keeps to two lines
  const isLatin = locale === 'en';

  return (
    <section
      className="relative z-[2] overflow-hidden pb-24 pt-28 max-[860px]:pb-[72px] max-[860px]:pt-20"
      aria-labelledby="hero-h1"
    >
      <div className="hero-aura animate-aura-drift" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="wrap relative z-[1] grid grid-cols-[1.32fr_.88fr] items-center gap-12 max-[900px]:grid-cols-1 max-[900px]:gap-10">
        <Reveal>
          <span className="block text-xs font-bold tracking-[.12em] uppercase text-brand-incana mb-5">
            {t('eyebrow')}
          </span>
          <h1
            id="hero-h1"
            className={clsx(
              'leading-[1.15] mb-[18px] text-balance',
              isLatin
                ? 'text-[clamp(42px,4.8vw,60px)] tracking-[-2px]'
                : 'text-[clamp(44px,4.7vw,60px)] max-[900px]:text-[clamp(28px,7.5vw,40px)]'
            )}
          >
            {isLatin ? (
              <>
                {t('title1')}
                <br />
                {t('title2')}
                <span className="text-brand-incana">{t('title2Highlight')}</span>
              </>
            ) : (
              <>
                <span className="max-[900px]:hidden">
                  <span className="whitespace-nowrap">{t('title1')}</span>
                  <br />
                  <span className="whitespace-nowrap">
                    {t('title2')}
                    <span className="text-brand-incana">{t('title2Highlight')}</span>
                  </span>
                </span>
                <span className="hidden max-[900px]:block">
                  <span className="block whitespace-nowrap">{t('mobileTitle1')}</span>
                  <span className="block whitespace-nowrap">
                    {t('mobileTitle2')}
                    <span className="text-brand-incana">{t('title2Highlight')}</span>
                  </span>
                </span>
              </>
            )}
          </h1>
          <p className="mb-7 max-w-[31em] whitespace-pre-line text-[17px] text-body-strong">{t('sub')}</p>
          <div className="flex flex-wrap gap-3 max-[600px]:flex-col">
            <Button
              href={GlobalConfig.DELEGATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="max-[600px]:w-full"
            >
              {tNav('stakeCta')}
            </Button>
            <Button href="#why" variant="ghost" size="lg" className="max-[600px]:w-full">
              {t('ctaLearn')}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={70}>
          <PoolLedgerCard stats={stats} />
        </Reveal>
      </div>
    </section>
  );
};
