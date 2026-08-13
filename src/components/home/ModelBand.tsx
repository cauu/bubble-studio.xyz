import { useTranslations } from 'next-intl';
import { Bot, Boxes, BriefcaseBusiness, Building2, ChartNoAxesCombined, Landmark, Server } from 'lucide-react';
import clsx from 'clsx';
import { DottedGlowBackground } from '@/components/ui/DottedGlowBackground';
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

const FlowArrow = ({ direction }: { direction: 'up' | 'down' }) => (
  <div className="flex h-12 items-center gap-3 max-[600px]:h-10 max-[600px]:gap-2.5" aria-hidden="true">
    <span className="h-px flex-1 bg-hairline" />
    <svg
      viewBox="0 0 36 22"
      className={clsx(
        'h-[22px] w-9 text-primary/40 max-[600px]:h-5 max-[600px]:w-8',
        direction === 'up' && 'rotate-180'
      )}
      focusable="false"
    >
      <path d="M18 21 2 3h32L18 21Z" fill="currentColor" />
    </svg>
    <span className="h-px flex-1 bg-hairline" />
  </div>
);

export const ModelBand = () => {
  const t = useTranslations('home.model');

  return (
    <section
      className="relative isolate overflow-hidden bg-white py-section max-[860px]:py-[72px]"
      aria-labelledby="model-h2"
    >
      <DottedGlowBackground className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-[70%] [mask-image:radial-gradient(75%_62%_at_78%_44%,black,transparent)] max-[700px]:w-full max-[700px]:opacity-60" />
      <div className="wrap relative z-10">
        <Reveal className="mx-auto mb-12 max-w-[1040px] max-[860px]:mb-9">
          <h2 id="model-h2" className="text-[clamp(30px,4vw,46px)] leading-[1.15] text-balance">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-[780px] text-pretty text-[16px] leading-[1.8] text-body">{t('summary')}</p>
        </Reveal>

        <Reveal className="mx-auto max-w-[1100px] rounded-xl border border-[rgba(72,76,110,.08)] bg-[#fdfdff] p-6 shadow-[0_1px_2px_rgba(23,32,38,.04),0_16px_44px_rgba(35,42,70,.08)] max-[600px]:p-3">
          <div className="mb-4 flex items-center gap-3 px-1">
            <span className="text-[11px] font-bold uppercase tracking-[.12em] text-muted">
              {t('structure.exploreLabel')}
            </span>
            <span className="h-px flex-1 bg-hairline-soft" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-3 gap-3 max-[960px]:grid-cols-1">
            {growthSources.map((source) => {
              const Icon = source.icon;

              return (
                <div
                  key={source.key}
                  className="min-h-[132px] rounded-lg border border-hairline-soft bg-surface-soft p-5 max-[960px]:min-h-0 max-[600px]:p-4"
                >
                  <div className="flex items-center gap-3 max-[600px]:gap-2.5">
                    <span
                      className={clsx(
                        'grid h-11 w-11 flex-none place-items-center rounded-md text-ink max-[600px]:h-10 max-[600px]:w-10',
                        source.iconClass
                      )}
                      aria-hidden="true"
                    >
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="mb-1 block text-[10.5px] font-bold uppercase tracking-[.1em] text-muted max-[600px]:hidden">
                        {t(`sources.${source.key}.eyebrow`)}
                      </span>
                      <h3 className="text-[18px] leading-tight max-[600px]:text-[17px]">
                        {t(`sources.${source.key}.title`)}
                      </h3>
                    </div>
                    <span className="flex-none rounded-pill bg-white px-3 py-1.5 text-xs font-semibold text-body shadow-soft max-[600px]:px-2.5 max-[600px]:py-1">
                      {t(`sources.${source.key}.role`)}
                    </span>
                  </div>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-body max-[600px]:hidden">
                    {t(`sources.${source.key}.body`)}
                  </p>
                </div>
              );
            })}
          </div>

          <FlowArrow direction="down" />

          <div className="grid grid-cols-[.75fr_1.25fr] gap-10 rounded-xl bg-brand-incana p-7 text-on-dark shadow-[0_18px_44px_rgba(19,88,93,.22),inset_0_1px_0_rgba(255,255,255,.14)] max-[800px]:grid-cols-1 max-[800px]:gap-7 max-[600px]:p-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-[.12em] text-brand-lemon">
                {t('structure.supportsLabel')}
              </span>
              <h3 className="mt-2 text-[24px] leading-tight text-white">{t('cashflow.title')}</h3>
              <p className="mt-3 max-w-[500px] text-[14px] leading-relaxed text-white/80">{t('cashflow.body')}</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-[420px]:grid-cols-1">
              {uses.map((use) => {
                const Icon = use.icon;

                return (
                  <div key={use.key} className="flex min-h-[72px] items-center gap-3 rounded-md bg-white/10 px-4 py-3">
                    <Icon className="flex-none text-brand-lemon" size={18} strokeWidth={1.8} aria-hidden="true" />
                    <span className="text-[13px] font-semibold leading-snug text-white">
                      {t(`cashflow.uses.${use.key}`)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <FlowArrow direction="up" />

          <div className="relative overflow-hidden rounded-xl border border-hairline-soft bg-surface-soft px-7 py-6 shadow-soft max-[600px]:px-5 max-[600px]:py-5">
            <div className="flex items-center gap-5 max-[700px]:grid max-[700px]:grid-cols-[52px_minmax(0,1fr)] max-[700px]:items-start max-[500px]:gap-4">
              <span
                className="grid h-[52px] w-[52px] flex-none place-items-center rounded-md bg-brand-sky text-ink shadow-soft"
                aria-hidden="true"
              >
                <Landmark size={22} strokeWidth={1.9} />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2.5 max-[500px]:items-start max-[500px]:flex-col max-[500px]:gap-1">
                  <span className="text-[11px] font-bold uppercase tracking-[.14em] text-primary">
                    {t('sources.pool.eyebrow')}
                  </span>
                  <span className="h-3 w-px bg-hairline max-[500px]:hidden" aria-hidden="true" />
                  <span className="text-[11px] font-bold tracking-[.08em] text-muted">
                    {t('structure.foundationLabel')}
                  </span>
                </div>
                <h3 className="mt-1.5 text-[25px] leading-tight text-ink">{t('sources.pool.title')}</h3>
                <p className="mt-2 max-w-[660px] text-[13.5px] leading-relaxed text-body">{t('sources.pool.body')}</p>
              </div>

              <span className="flex-none rounded-pill border border-hairline-soft bg-white px-3.5 py-2 text-xs font-semibold text-body shadow-soft max-[700px]:col-start-2 max-[700px]:justify-self-start">
                {t('sources.pool.role')}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
