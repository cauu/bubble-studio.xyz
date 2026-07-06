import { useTranslations } from 'next-intl';
import { GlobalConfig } from '@/constants';
import { Button } from '@/components/ui/Button';
import { Chip } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';

export const ServicesBand = () => {
  const t = useTranslations('home.services');

  return (
    <section className="pb-section max-[860px]:pb-[72px]" aria-labelledby="svc-h2">
      <div className="wrap">
        <Reveal className="relative overflow-hidden bg-surface-card rounded-xl px-14 py-16 max-[860px]:px-7 max-[860px]:py-11 flex items-center justify-between gap-8 flex-wrap shadow-[0_1px_2px_rgba(23,32,38,.04),0_12px_32px_rgba(23,32,38,.07),inset_0_1px_0_rgba(255,255,255,.5)]">
          <span
            className="absolute rounded-full bg-[rgba(249,248,246,.6)] pointer-events-none w-[200px] h-[200px] -top-[70px] right-[22%]"
            aria-hidden="true"
          />
          <span
            className="absolute rounded-full bg-[rgba(249,248,246,.6)] pointer-events-none w-[120px] h-[120px] -bottom-[46px] -left-[30px]"
            aria-hidden="true"
          />

          <div className="relative max-w-[36em]">
            <Chip color="blank" className="mb-4">
              {t('chip')}
            </Chip>
            <h2 id="svc-h2" className="text-[clamp(26px,3.2vw,36px)] leading-[1.2] mb-3">
              {t('title')}
            </h2>
            <p className="text-base text-body">{t('body')}</p>
          </div>

          <div className="relative flex flex-col items-start gap-3">
            <Button href={`mailto:${GlobalConfig.CONTACT_EMAIL}`} variant="primary" size="lg">
              {t('cta')}
            </Button>
            <span className="text-[13px] text-body tnum">{GlobalConfig.CONTACT_EMAIL}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
