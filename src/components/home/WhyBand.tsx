import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Chip } from '@/components/ui/Chip';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';

const cardKeys = [
  { key: 'c1', icon: 'bg-brand-mint' },
  { key: 'c2', icon: 'bg-brand-lavender' },
  { key: 'c3', icon: 'bg-brand-grass' }
] as const;

export const WhyBand = () => {
  const t = useTranslations('home.why');

  return (
    <section id="why" className="bg-surface-card py-section max-[860px]:py-[72px]" aria-labelledby="why-h2">
      <div className="wrap">
        <Reveal>
          <SectionHead chip={t('chip')} chipColor="mint" titleId="why-h2" title={t('title')} sub={t('sub')} />
        </Reveal>
        <div className="grid grid-cols-3 gap-6 max-[860px]:grid-cols-1">
          {cardKeys.map((card, i) => (
            <Reveal
              key={card.key}
              delay={i * 70}
              className="bg-white rounded-lg p-8 flex flex-col gap-3 shadow-card transition-all duration-300 ease-brand hover:-translate-y-1 hover:scale-[1.01] hover:shadow-card-hover"
            >
              <div
                className={clsx(
                  'w-[46px] h-[46px] rounded-md flex-none grid place-items-center text-base font-bold text-ink mb-1 tnum',
                  card.icon
                )}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <Chip className="self-start">{t(`cards.${card.key}.chip`)}</Chip>
              <h3 className="text-[21px] leading-[1.3]">{t(`cards.${card.key}.title`)}</h3>
              <p className="text-[15px] text-body">{t(`cards.${card.key}.body`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
