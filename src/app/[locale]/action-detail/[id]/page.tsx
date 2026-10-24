import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import { Link } from '@/i18n/navigation';
import { PageHeader } from '@/components/neon/PageHeader';
import governanceData from '@/data/gov-contents-2025-05-15.json';
import type { IGovActionContent } from '@/types/governance';

type Props = { params: { locale: string; id: string } };
export default async function GovActionDetail({ params: { locale, id } }: Props) {
  const t = await getTranslations({ locale });
  const entries = (governanceData as unknown as Record<string, IGovActionContent[]>)[locale] || [];
  const proposal = entries.find((item) => item.id === decodeURIComponent(id));
  if (!proposal) notFound();
  return (
    <div className="governance-page detail-page">
      <PageHeader path={`governance/${proposal.id}`} title={proposal.title} color="cy">
        <div className="meta-row">
          <span>
            {t('governance.submit_at')} · {proposal.metadata.createdDate?.slice(0, 10)}
          </span>
          <span>
            {t('governance.expire_at')} · {proposal.metadata.expiryDate?.slice(0, 10)}
          </span>
        </div>
        <Link href="/governance" className="text-link">
          ← {t('common.back')}
        </Link>
      </PageHeader>
      <div className="lane page-content">
        <p className="meta snapshot-note">{t('pages.snapshot')}</p>
        <section className="detail-panel">
          <h2>{t('governance.title_proposal_content')}</h2>
          <div className="prose max-w-none">
            <ReactMarkdown>{proposal.opinions.summary}</ReactMarkdown>
          </div>
        </section>
        <div className="opinion-grid">
          {(['pros', 'cons'] as const).map((key) => (
            <section key={key} className={`detail-panel ${key}`}>
              <h2>{t(`governance.title_${key}`)}</h2>
              <ul>
                {proposal.opinions[key].map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
        <section className="detail-panel">
          <h2>{t('governance.title_our_opinion')}</h2>
          <div className="prose max-w-none">
            <ReactMarkdown>{proposal.opinions.myOpinion}</ReactMarkdown>
          </div>
        </section>
        {!!proposal.tweets.length && (
          <section className="discussion">
            <h2>{t('governance.related_tweets')}</h2>
            <div className="discussion-grid">
              {proposal.tweets.map((tweet) => (
                <article key={tweet.tweetId} className="detail-panel">
                  <a
                    className="text-link"
                    href={`https://x.com/${tweet.author.screen_name}/status/${tweet.tweetId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tweet.author.name} ↗
                  </a>
                  <div className="prose max-w-none">
                    <ReactMarkdown>{tweet.text}</ReactMarkdown>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
        <Link className="cbtn alt" href="/governance">
          ← {t('common.back')}
        </Link>
      </div>
      <div className="sec-end" />
    </div>
  );
}
