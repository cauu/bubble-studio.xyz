import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { GlobalConfig } from '@/constants';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';

const itemKeys = [
  { key: 'i1', num: 'bg-brand-sky' },
  { key: 'i2', num: 'bg-brand-lavender' },
  { key: 'i3', num: 'bg-brand-mint' },
  { key: 'i4', num: 'bg-brand-grass' }
] as const;

export const Perks = () => {
  const t = useTranslations('home.perks');
  const tNav = useTranslations('nav');

  return (
    <section id="perks" className="bg-surface-card py-section max-[860px]:py-[72px]" aria-labelledby="perks-h2">
      <div className="wrap">
        <Reveal className="mb-12 max-w-[46rem]">
          <h2 id="perks-h2" className="mb-3.5 text-[clamp(30px,4vw,46px)] leading-[1.15] text-balance">
            {t('title')}
          </h2>
          <p className="whitespace-pre-line text-[16.5px] leading-relaxed text-body">{t('sub')}</p>
        </Reveal>

        <div className="grid grid-cols-[1.45fr_1fr] gap-6 items-start max-[900px]:grid-cols-1">
          <Reveal className="bg-white rounded-lg overflow-hidden shadow-card">
            <div className="px-6 pt-4 pb-1.5 text-xs font-bold tracking-[.1em] uppercase text-muted flex justify-between">
              <span>{t('head.list')}</span>
              <span>{t('head.status')}</span>
            </div>
            {itemKeys.map((item, i) => (
              <div
                key={item.key}
                className="relative flex items-start gap-4 px-6 py-[22px] transition-colors duration-200 hover:bg-hairline-soft max-[600px]:flex-wrap after:content-[''] after:absolute after:left-6 after:right-6 after:bottom-0 after:h-px after:bg-[rgba(23,32,38,.05)] last:after:hidden"
              >
                <span
                  className={clsx(
                    'w-[42px] h-[42px] rounded-md flex-none grid place-items-center text-[13.5px] font-bold text-ink mt-0.5 tnum',
                    item.num
                  )}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[17px] leading-[1.35] mb-1">{t(`items.${item.key}.title`)}</h3>
                  <p className="text-[13.5px] text-muted">{t(`items.${item.key}.body`)}</p>
                </div>
                <Chip className="flex-none mt-0.5 max-[600px]:ml-[58px]">{t(`items.${item.key}.chip`)}</Chip>
              </div>
            ))}
          </Reveal>

          <Reveal
            delay={70}
            className="bg-brand-incana rounded-xl px-9 py-10 text-on-dark flex flex-col gap-2 sticky top-24 max-[900px]:static shadow-[0_18px_44px_rgba(19,88,93,.26),inset_0_1px_0_rgba(255,255,255,.14)]"
          >
            <span className="text-xs font-bold tracking-[.12em] uppercase text-brand-lemon">{t('tier.cap')}</span>
            <span className="text-[60px] font-bold leading-none tracking-[-1.5px] tnum">
              $0<small className="text-lg font-semibold text-white/85">{t('tier.priceSuffix')}</small>
            </span>
            <p className="text-[14.5px] text-white/90 mt-1.5 mb-[22px]">{t('tier.body')}</p>
            <Button href={GlobalConfig.DELEGATE_URL} variant="oncolor" size="lg" className="self-stretch">
              {tNav('stakeCta')}
            </Button>
            <span className="text-[12.5px] text-white/75 mt-3 text-center">{t('tier.fine')}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
