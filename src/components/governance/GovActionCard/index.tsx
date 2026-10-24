import { useTranslations } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import { Link } from '@/i18n/navigation';
import type { GovernanceSummary } from '@/types/governance';

export const GovActionCard = ({ proposal, index = 0 }: { proposal: GovernanceSummary; index?: number }) => {
  const t = useTranslations('governance');
  const c = useTranslations('common');
  const pros = proposal.opinions.pros.length,
    cons = proposal.opinions.cons.length;
  return (
    <article className="act corners" style={{ ['--c' as string]: `var(--${['cy', 'mag', 'yel', 'grn'][index % 4]})` }}>
      <div className="ah">
        <span className="id">{proposal.id}</span>
        <span className="meta">
          {t('submit_at')} ·{' '}
          <time dateTime={proposal.metadata.createdDate}>{proposal.metadata.createdDate?.slice(0, 10)}</time>
        </span>
        {['GA:14', 'GA:13', 'GA:18'].includes(proposal.id) && <span className="hot">{t('hot')}</span>}
      </div>
      <h2>
        <Link href={`/action-detail/${encodeURIComponent(proposal.id)}`}>{proposal.title}</Link>
      </h2>
      <div className="summary">
        <ReactMarkdown>{proposal.opinions.summary}</ReactMarkdown>
      </div>
      <div className="votes">
        <span className="pro">
          <b>{pros}</b> {t('title_pros')}
        </span>
        <span className="con">
          <b>{cons}</b> {t('title_cons')}
        </span>
        <span className="bar" aria-hidden="true">
          <i style={{ ['--p' as string]: pros + cons ? pros / (pros + cons) : 0 }} />
        </span>
      </div>
      <Link className="more" href={`/action-detail/${encodeURIComponent(proposal.id)}`}>
        {c('view_detail')} →
      </Link>
    </article>
  );
};
export default GovActionCard;
