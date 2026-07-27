import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Reveal } from '@/components/ui/Reveal';

const items = [
  { key: 'income', numberClass: 'bg-brand-sky' },
  { key: 'identity', numberClass: 'bg-brand-lavender' },
  { key: 'relationship', numberClass: 'bg-brand-mint' }
] as const;

export const ModelBand = () => {
  const t = useTranslations('home.model');

  return (
    <section className="py-section max-[860px]:py-[72px]" aria-labelledby="model-h2">
      <div className="wrap">
        <Reveal className="mx-auto mb-12 max-w-[1040px] max-[860px]:mb-9">
          <h2 id="model-h2" className="text-[clamp(30px,4vw,46px)] leading-[1.15] text-balance">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-[780px] whitespace-pre-line text-[16px] leading-[1.8] text-body">{t('summary')}</p>
        </Reveal>

        <div className="mx-auto max-w-[1040px] overflow-hidden rounded-xl bg-white shadow-card">
          <div>
            {items.map((item, index) => (
              <Reveal
                key={item.key}
                delay={index * 70}
                className="relative flex items-start gap-6 border-b border-hairline-soft px-10 py-8 last:border-b-0 max-[600px]:gap-4 max-[600px]:px-6 max-[600px]:py-7"
              >
                <span
                  className={clsx(
                    'grid h-[46px] w-[46px] flex-none place-items-center rounded-md text-sm font-bold text-ink tnum',
                    item.numberClass
                  )}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 pt-0.5">
                  <h3 className="mb-2 text-[21px] leading-snug">{t(`items.${item.key}.title`)}</h3>
                  <p className="whitespace-pre-line text-[15px] leading-[1.8] text-body">
                    {t(`items.${item.key}.body`)}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
