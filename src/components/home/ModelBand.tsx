import { useTranslations } from 'next-intl';
import { Bot, Boxes, BriefcaseBusiness, Building2, ChartNoAxesCombined, Landmark, Server } from 'lucide-react';
import clsx from 'clsx';
import { Reveal } from '@/components/ui/Reveal';

const growthSources = [
  {
    key: 'trading',
    icon: ChartNoAxesCombined,
    iconClass: 'bg-brand-lavender'
  },
  {
    key: 'products',
    icon: Boxes,
    iconClass: 'bg-brand-mint'
  },
  {
    key: 'services',
    icon: BriefcaseBusiness,
    iconClass: 'bg-brand-grass'
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
          <div className="mb-4 flex items-center gap-3 px-1">
            <span className="text-[11px] font-bold uppercase tracking-[.12em] text-muted">
              {t('structure.exploreLabel')}
            </span>
            <span className="h-px flex-1 bg-hairline-soft" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-3 gap-3 max-[800px]:grid-cols-1">
            {growthSources.map((source) => {
              const Icon = source.icon;

              return (
                <div
                  key={source.key}
                  className="flex min-h-[190px] flex-col rounded-lg border border-hairline-soft bg-surface-soft p-5 max-[800px]:min-h-0"
                >
                  <span
                    className={clsx('grid h-12 w-12 place-items-center rounded-md text-ink', source.iconClass)}
                    aria-hidden="true"
                  >
                    <Icon size={21} strokeWidth={1.8} />
                  </span>
                  <div className="mt-5 min-w-0">
                    <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[.1em] text-muted">
                      {t(`sources.${source.key}.eyebrow`)}
                    </span>
                    <h3 className="text-[19px] leading-snug">{t(`sources.${source.key}.title`)}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-body">{t(`sources.${source.key}.body`)}</p>
                  </div>
                  <span className="mt-auto self-start rounded-pill bg-white px-3 py-1.5 text-xs font-semibold text-body shadow-soft max-[800px]:mt-4">
                    {t(`sources.${source.key}.role`)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="relative my-5 flex items-center justify-center" aria-hidden="true">
            <span className="h-px w-full bg-hairline" />
            <span className="absolute grid h-9 w-9 place-items-center rounded-full border-4 border-white bg-brand-sky shadow-soft">
              <span className="h-2 w-2 rounded-full bg-primary/60" />
            </span>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-brand-incana p-7 text-on-dark shadow-[0_18px_44px_rgba(19,88,93,.22),inset_0_1px_0_rgba(255,255,255,.14)] max-[600px]:p-5">
            <div className="grid grid-cols-[.9fr_1.1fr] gap-10 max-[800px]:grid-cols-1 max-[800px]:gap-7">
              <div>
                <span className="text-xs font-bold uppercase tracking-[.12em] text-brand-lemon">
                  {t('structure.foundationLabel')}
                </span>
                <div className="mt-5 flex items-start gap-4">
                  <span
                    className="grid h-12 w-12 flex-none place-items-center rounded-md bg-brand-sky text-ink"
                    aria-hidden="true"
                  >
                    <Landmark size={21} strokeWidth={1.8} />
                  </span>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-[.1em] text-white/65">
                      {t('sources.pool.eyebrow')}
                    </span>
                    <h3 className="mt-1 text-[26px] leading-tight text-white">{t('sources.pool.title')}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-white/80">{t('sources.pool.body')}</p>
                  </div>
                </div>
                <span className="mt-5 inline-flex rounded-pill bg-white/12 px-3 py-1.5 text-xs font-semibold text-white">
                  {t('sources.pool.role')}
                </span>
              </div>

              <div className="border-l border-white/15 pl-8 max-[800px]:border-l-0 max-[800px]:border-t max-[800px]:pl-0 max-[800px]:pt-7">
                <span className="text-xs font-bold uppercase tracking-[.12em] text-brand-lemon">
                  {t('structure.supportsLabel')}
                </span>
                <h3 className="mt-2 text-[24px] leading-tight text-white">{t('cashflow.title')}</h3>
                <p className="mt-3 max-w-[500px] text-[14px] leading-relaxed text-white/80">{t('cashflow.body')}</p>
                <div className="mt-5 grid grid-cols-2 gap-2.5 max-[420px]:grid-cols-1">
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
          </div>
        </Reveal>
      </div>
    </section>
  );
};
