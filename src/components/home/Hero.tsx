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
      className="relative z-[2] overflow-hidden pt-32 pb-28 max-[860px]:pt-20 max-[860px]:pb-[72px]"
      aria-labelledby="hero-h1"
    >
      <div className="hero-aura animate-aura-drift" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      <div className="wrap grid grid-cols-[1.2fr_1fr] gap-14 items-center relative z-[1] max-[900px]:grid-cols-1 max-[900px]:gap-10">
        <Reveal>
          <span className="block text-xs font-bold tracking-[.12em] uppercase text-brand-incana mb-5">
            {t('eyebrow')}
          </span>
          <h1
            id="hero-h1"
            className={clsx(
              'leading-[1.15] mb-[18px] text-balance',
              isLatin ? 'text-[clamp(34px,3.8vw,46px)] tracking-[-1.5px]' : 'text-[clamp(38px,5vw,60px)]'
            )}
          >
            {t('title1')}
            <br />
            {t('title2')}
            <span className="text-brand-incana">{t('title2Highlight')}</span>
          </h1>
          <p className="mb-7 max-w-[31em] text-[17px] text-body-strong">{t('sub')}</p>
          <div className="flex flex-wrap gap-3 max-[600px]:flex-col">
            <Button href={GlobalConfig.DELEGATE_URL} variant="primary" size="lg" className="max-[600px]:w-full">
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
