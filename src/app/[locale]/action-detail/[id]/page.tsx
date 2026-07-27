'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, CheckCircle, Clock, Lightbulb, MessageCircle, XCircle } from 'lucide-react';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import governanceData from '@/data/gov-contents-2025-05-15.json';
import { IGovActionContent } from '@/types/governance';
import { getDurationString } from '@/utils';
import { Button } from '@/components/ui/Button';

const HOT_TOPICS = ['GA:14', 'GA:13', 'GA:18'];

export interface Tweet {
  id: string;
  user: { name: string; avatar: string };
  content: string;
  url: string;
}

export default function GovActionDetail() {
  const t = useTranslations();
  const router = useRouter();
  const params = useParams();

  const locale = params.locale as string;
  const id = params.id as string;

  const [content, setContent] = useState<IGovActionContent | null>(null);
  const [duration, setDuration] = useState<string>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const action = (governanceData as any)[locale]?.find((item: any) => item.type === 'action' && item.id === id);
      if (!action) {
        router.push('/not-found');
        return;
      }
      setContent(action);
    } catch (error) {
      console.error('Failed to load action:', error);
      router.push('/not-found');
    } finally {
      setLoading(false);
    }
  }, [locale, id, router]);

  const currentProposal = useMemo(() => content, [content]);
  const tweets = useMemo(() => {
    return currentProposal?.tweets || [];
  }, [currentProposal]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentProposal?.metadata.expiryDate) {
        setDuration(getDurationString(new Date(), currentProposal?.metadata.expiryDate, locale as 'zh' | 'en' | 'tw'));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentProposal?.metadata.expiryDate, locale]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentProposal) {
    return <div>Action not found</div>;
  }

  const isHotTopic = HOT_TOPICS.includes(currentProposal?.id);

  return (
    <div className="wrap pt-10 pb-24 max-[860px]:pt-7 max-[860px]:pb-[72px]">
      <div className="bg-white rounded-lg p-5 md:p-6 relative shadow-card">
        {/* 投票内容 */}
        {currentProposal && (
          <div className="flex flex-col space-y-3 md:space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base md:text-xl text-ink">{currentProposal.title}</h3>
              {isHotTopic && (
                <span className="hidden md:inline-flex items-center text-[13px] font-semibold leading-none text-ink px-[13px] py-[7px] rounded-pill bg-brand-lemon flex-none">
                  {`${t('governance.hot')}!`}
                </span>
              )}
            </div>

            <div className="flex flex-col md:flex-row justify-between gap-1 text-muted">
              <div className="flex items-center text-sm">
                <Calendar size={16} className="mr-1" />
                <span className="tnum">
                  {t('governance.submit_at')}: {dayjs(currentProposal?.metadata.createdDate).format('YYYY-MM-DD HH:mm')}
                </span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar size={16} className="mr-1" />
                <span className="tnum">
                  {t('governance.expire_at')}: {dayjs(currentProposal?.metadata.expiryDate).format('YYYY-MM-DD HH:mm')}
                </span>
              </div>
              <div className="flex items-center text-sm font-semibold text-brand-incana">
                <Clock size={16} className="mr-1" />
                <span className="tnum">
                  {t('governance.remaining_time')}: {duration}
                </span>
              </div>
            </div>

            <div className="rounded-md p-4 bg-surface-soft">
              <h3 className="text-ink mb-1 flex items-center text-[15px]">
                <MessageCircle size={18} className="mr-2 text-brand-sea" />
                {t('governance.title_proposal_content')}
              </h3>

              <div className="text-sm text-body leading-relaxed">
                <ReactMarkdown>{currentProposal?.opinions.summary}</ReactMarkdown>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              {/* 正方观点 */}
              <div className="rounded-md p-4 bg-surface-soft">
                <h3 className="text-ink mb-1 flex items-center text-[15px]">
                  <CheckCircle size={18} className="mr-2 text-brand-grass" />
                  {t('governance.title_pros')}
                </h3>

                <ul className="list-disc pl-5 marker:text-brand-grass text-sm text-body leading-relaxed space-y-1">
                  {currentProposal?.opinions.pros.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* 反方观点 */}
              <div className="rounded-md p-4 bg-surface-soft">
                <h3 className="text-ink mb-1 flex items-center text-[15px]">
                  <XCircle size={18} className="mr-2 text-brand-orange" />
                  {t('governance.title_cons')}
                </h3>

                <ul className="list-disc pl-5 marker:text-brand-orange text-sm text-body leading-relaxed space-y-1">
                  {currentProposal?.opinions.cons.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 我们的观点 */}
            <div className="rounded-md p-4 bg-surface-soft">
              <h3 className="text-ink mb-1 flex items-center text-[15px]">
                <Lightbulb size={18} className="mr-2 text-brand-incana" />
                {t('governance.title_our_opinion')}
              </h3>
              <div className="text-sm text-body leading-relaxed">
                <ReactMarkdown>{currentProposal?.opinions.myOpinion}</ReactMarkdown>
              </div>
            </div>

            {/* 推文讨论列表 */}
            <div className="my-6 flex flex-col flex-1">
              <h3 className="text-ink mb-2 mt-2 flex items-center text-[15px]">{t('governance.related_tweets')}</h3>
              <div className="md:columns-1 lg:columns-2 gap-2 md:block flex flex-col flex-1">
                {tweets.map((tweet) => (
                  <Link
                    key={tweet.tweetId}
                    href={`https://x.com/${tweet.author.screen_name}/status/${tweet.tweetId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 break-inside-avoid md:mb-2"
                  >
                    <div className="flex flex-1 items-start p-4 rounded-md bg-surface-soft transition-colors duration-200 ease-brand hover:bg-hairline-soft overflow-hidden">
                      <Image
                        src={tweet?.author?.avatar || ''}
                        alt={tweet?.author?.name}
                        width={24}
                        height={24}
                        className="rounded-full mr-3 h-6 w-6"
                      />
                      <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="font-semibold text-ink text-sm">{tweet.author.name}</div>
                        <div className="text-xs text-body mt-1">
                          <ReactMarkdown>{tweet.text}</ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <Button variant="primary" size="md" onClick={() => router.push(`/${locale}/governance`)}>
            {t('common.back')}
          </Button>
        </div>
      </div>
    </div>
  );
}
