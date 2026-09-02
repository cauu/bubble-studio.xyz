import { getTranslations } from 'next-intl/server';

import { GovernanceClient } from './GovernanceClient';

type Props = {
  params: {
    locale: string;
  };
};

export default async function GovernancePage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'governance' });

  return (
    <div className="relative overflow-x-hidden">
      <div className="page-aura animate-aura-drift" aria-hidden="true" />
      <header className="wrap relative pt-16 max-[860px]:pt-11">
        <h1 className="text-[clamp(36px,4.5vw,52px)] leading-[1.15]">{t('page_title')}</h1>
        <p className="mt-5 max-w-[50rem] text-[16.5px] leading-[1.8] text-body">{t('page_intro')}</p>
      </header>
      <GovernanceClient locale={locale} />
    </div>
  );
}
