import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { GlobalConfig } from '@/constants';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { GrainientBackground } from '@/components/ui/GrainientBackground';
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
    <section
      id="perks"
      className="relative isolate overflow-hidden bg-surface-card py-section max-[860px]:py-[72px]"
      aria-labelledby="perks-h2"
    >
      <GrainientBackground className="pointer-events-none absolute inset-0 -z-10 opacity-[.58] [mask-image:linear-gradient(115deg,black_0%,black_55%,transparent_96%)] max-[700px]:opacity-[.38]" />
      <div className="wrap relative z-10">
        <Reveal className="mb-12 max-w-[50rem]">
          <h2 id="perks-h2" className="mb-3.5 text-[clamp(30px,4vw,46px)] leading-[1.15] text-balance">
            {t('title')}
          </h2>
          <p className="whitespace-pre-line text-pretty text-[16.5px] leading-relaxed text-body">{t('sub')}</p>
        </Reveal>

        <div className="grid grid-cols-[1.45fr_1fr] gap-6 items-start max-[900px]:grid-cols-1">
          <Reveal className="bg-white rounded-lg overflow-hidden shadow-card">
            <div className="flex justify-between px-6 pb-1.5 pt-4 text-xs font-bold uppercase tracking-[.1em] text-muted max-[600px]:px-[18px] max-[600px]:pb-2">
              <span>{t('head.list')}</span>
              <span className="max-[600px]:hidden">{t('head.status')}</span>
            </div>
            {itemKeys.map((item, i) => (
              <div
                key={item.key}
                className="relative flex items-start gap-4 px-6 py-[22px] transition-colors duration-200 hover:bg-hairline-soft max-[600px]:px-[18px] max-[600px]:py-[18px] after:absolute after:bottom-0 after:left-6 after:right-6 after:h-px after:bg-[rgba(23,32,38,.05)] after:content-[''] last:after:hidden max-[600px]:after:left-[18px] max-[600px]:after:right-[18px]"
              >
                <span
                  className={clsx(
                    'mt-0.5 grid h-[42px] w-[42px] flex-none place-items-center rounded-md text-[13.5px] font-bold text-ink tnum max-[600px]:hidden',
                    item.num
                  )}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 max-[600px]:justify-between">
                    <h3 className="mb-1 text-[17px] leading-[1.35]">{t(`items.${item.key}.title`)}</h3>
                    <Chip className="mt-0.5 hidden flex-none max-[600px]:inline-flex">
                      {t(`items.${item.key}.chip`)}
                    </Chip>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-muted">{t(`items.${item.key}.body`)}</p>
                </div>
                <Chip className="mt-0.5 flex-none max-[600px]:hidden">{t(`items.${item.key}.chip`)}</Chip>
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
            <Button
              href={GlobalConfig.DELEGATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="oncolor"
              size="lg"
              className="self-stretch"
            >
              {tNav('stakeCta')}
            </Button>
            <span className="text-[12.5px] text-white/75 mt-3 text-center">{t('tier.fine')}</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
