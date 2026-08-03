import { useTranslations } from 'next-intl';
import { Bot, Boxes, BriefcaseBusiness, Building2, ChartNoAxesCombined, Landmark, Server } from 'lucide-react';
import clsx from 'clsx';
import { Reveal } from '@/components/ui/Reveal';

const sources = [
  {
    key: 'pool',
    icon: Landmark,
    iconClass: 'bg-brand-sky',
    lineClass: 'bg-brand-sky',
    topClass: 'top-[12.5%]'
  },
  {
    key: 'trading',
    icon: ChartNoAxesCombined,
    iconClass: 'bg-brand-lavender',
    lineClass: 'bg-brand-lavender',
    topClass: 'top-[37.5%]'
  },
  {
    key: 'products',
    icon: Boxes,
    iconClass: 'bg-brand-mint',
    lineClass: 'bg-brand-mint',
    topClass: 'top-[62.5%]'
  },
  {
    key: 'services',
    icon: BriefcaseBusiness,
    iconClass: 'bg-brand-grass',
    lineClass: 'bg-brand-grass',
    topClass: 'top-[87.5%]'
  }
] as const;

const uses = [
  { key: 'infrastructure', icon: Server },
  { key: 'ai', icon: Bot },
  { key: 'development', icon: Boxes },
  { key: 'operations', icon: Building2 }
] as const;

export const ModelBand = () => {
  const t = useTranslations('home.model');

  return (
    <section className="bg-surface-card py-section max-[860px]:py-[72px]" aria-labelledby="model-h2">
      <div className="wrap">
        <Reveal className="mx-auto mb-12 max-w-[1040px] max-[860px]:mb-9">
          <h2 id="model-h2" className="text-[clamp(30px,4vw,46px)] leading-[1.15] text-balance">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-[780px] text-pretty text-[16px] leading-[1.8] text-body">{t('summary')}</p>
        </Reveal>

        <Reveal className="mx-auto max-w-[1100px] rounded-xl bg-white p-6 shadow-card max-[600px]:p-4">
          <div className="grid grid-cols-[minmax(0,1.15fr)_140px_minmax(280px,.85fr)] items-stretch max-[900px]:grid-cols-1">
            <div className="grid grid-rows-4 gap-3">
              {sources.map((source) => {
                const Icon = source.icon;

                return (
                  <div
                    key={source.key}
                    className="grid min-h-[94px] grid-cols-[48px_minmax(0,1fr)_auto] items-center gap-4 rounded-lg border border-hairline-soft bg-surface-soft px-4 py-3 max-[600px]:grid-cols-[44px_minmax(0,1fr)] max-[600px]:gap-3"
                  >
                    <span
                      className={clsx(
                        'grid h-12 w-12 place-items-center rounded-md text-ink max-[600px]:h-11 max-[600px]:w-11',
                        source.iconClass
                      )}
                      aria-hidden="true"
                    >
                      <Icon size={21} strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0">
                      <span className="mb-1 block text-[11px] font-bold uppercase tracking-[.1em] text-muted">
                        {t(`sources.${source.key}.eyebrow`)}
                      </span>
                      <h3 className="text-[17px] leading-snug">{t(`sources.${source.key}.title`)}</h3>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-body">{t(`sources.${source.key}.body`)}</p>
                    </div>
                    <span className="rounded-pill bg-white px-3 py-1.5 text-xs font-semibold text-body shadow-soft max-[600px]:col-start-2 max-[600px]:justify-self-start">
                      {t(`sources.${source.key}.role`)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="relative hidden min-[901px]:block" aria-hidden="true">
              <span className="absolute bottom-[12.5%] left-1/2 top-[12.5%] w-[2px] -translate-x-1/2 bg-brand-mint" />
              {sources.map((source) => (
                <span
                  key={source.key}
                  className={clsx('absolute left-0 h-[2px] w-1/2', source.topClass, source.lineClass)}
                />
              ))}
              <span className="absolute left-1/2 right-0 top-1/2 h-[2px] -translate-y-1/2 bg-brand-mint" />
              <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-white bg-brand-mint shadow-soft" />
            </div>

            <div className="relative hidden h-16 items-center justify-center max-[900px]:flex" aria-hidden="true">
              <span className="absolute bottom-0 top-0 w-[2px] bg-brand-mint" />
              <span className="relative h-9 w-9 rounded-full border-[5px] border-white bg-brand-mint shadow-soft" />
            </div>

            <div className="relative overflow-hidden rounded-xl bg-brand-incana p-7 text-on-dark shadow-[0_18px_44px_rgba(19,88,93,.22),inset_0_1px_0_rgba(255,255,255,.14)] max-[600px]:p-5">
              <span className="text-xs font-bold uppercase tracking-[.12em] text-brand-lemon">
                {t('cashflow.eyebrow')}
              </span>
              <h3 className="mt-2 text-[28px] leading-tight text-white">{t('cashflow.title')}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/85">{t('cashflow.body')}</p>

              <div className="mt-7 grid grid-cols-2 gap-2.5 max-[420px]:grid-cols-1">
                {uses.map((use) => {
                  const Icon = use.icon;

                  return (
                    <div
                      key={use.key}
                      className="flex min-h-[68px] items-center gap-3 rounded-md bg-white/10 px-3 py-2.5"
                    >
                      <Icon className="flex-none text-brand-lemon" size={18} strokeWidth={1.8} aria-hidden="true" />
                      <span className="text-[13px] font-semibold leading-snug text-white">
                        {t(`cashflow.uses.${use.key}`)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
