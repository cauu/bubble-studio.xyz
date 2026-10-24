import { getTranslations } from 'next-intl/server';

import governanceData from '@/data/gov-contents-2025-05-15.json';
import type { IGovActionContent, GovernanceSummary } from '@/types/governance';
import { PageHeader } from '@/components/neon/PageHeader';

import { GovernanceClient } from './GovernanceClient';

type Props = {
  params: {
    locale: string;
  };
};

export default async function GovernancePage({ params: { locale } }: Props) {
  const t = await getTranslations({ locale, namespace: 'governance' });

  const entries: GovernanceSummary[] = (
    (governanceData as unknown as Record<string, IGovActionContent[]>)[locale] || []
  ).map(({ id, type, title, metadata, opinions }) => ({
    id,
    type,
    title,
    metadata: { createdDate: metadata.createdDate },
    opinions: { summary: opinions.summary, pros: opinions.pros, cons: opinions.cons }
  }));
  return (
    <div className="governance-page">
      <PageHeader
        path="governance"
        title={<span className="hl">{t('page_title')}</span>}
        sub={t('page_intro')}
        color="yel"
      />
      <GovernanceClient entries={entries} />
    </div>
  );
}
