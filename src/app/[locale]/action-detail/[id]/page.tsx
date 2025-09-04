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

const HOT_TOPICS = ['GA:14', 'GA:13', 'GA:18'];

export interface Tweet {
  id: string;
  user: { name: string; avatar: string };
  content: string;
  url: string;
}

export default function GovActionDetail() {
  const t = useTranslations('common');
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
    <div className="mb-4 shadow-md md:card bg-white p-4 relative">
      {isHotTopic && <div className="vote-badge md:block hidden">{`${t('governance.hot')}!`}</div>}

      {/* 投票内容 */}
      {currentProposal && (
        <div className="border-3 border-[#0a2463] rounded-lg flex flex-col space-y-2 md:space-y-4">
          <h3 className="text-base md:text-xl font-bold text-[#0a2463]">{currentProposal.title}</h3>

          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center text-sm">
              <Calendar size={16} className="mr-1" />
              <span>
                {t('governance.submit_at')}: {dayjs(currentProposal?.metadata.createdDate).format('YYYY-MM-DD HH:mm')}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <Calendar size={16} className="mr-1" />
              <span>
                {t('governance.expire_at')}: {dayjs(currentProposal?.metadata.expiryDate).format('YYYY-MM-DD HH:mm')}
              </span>
            </div>
            <div className="flex items-center text-sm font-bold text-[#3f8efc]">
              <Clock size={16} className="mr-1" />
              <span>
                {t('governance.remaining_time')}: {duration}
              </span>
            </div>
          </div>

          <div className="border-2 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff]">
            <h3 className="font-bold text-[#0a2463] mb-1 flex items-center">
              <MessageCircle size={20} className="mr-2 text-[#3f8efc]" />
              {t('governance.title_proposal_content')}
            </h3>

            <div className="text-sm text-gray-900 leading-relaxed">
              <ReactMarkdown>{currentProposal?.opinions.summary}</ReactMarkdown>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
            {/* 正方观点 */}
            <div className="border-2 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff]">
              <h3 className="font-bold text-[#0a2463] mb-1 flex items-center">
                <CheckCircle size={20} className="mr-2 text-[#06D6A0]" />
                {t('governance.title_pros')}
              </h3>

              <ul className="point-list pros text-sm text-gray-900 leading-relaxed">
                {currentProposal?.opinions.pros.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            {/* 反方观点 */}
            <div className="border-2 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff]">
              <h3 className="font-bold text-[#0a2463] mb-1 flex items-center">
                <XCircle size={20} className="mr-2 text-[#EF476F]" />
                {t('governance.title_cons')}
              </h3>

              <ul className="point-list cons text-sm text-gray-900 leading-relaxed">
                {currentProposal?.opinions.cons.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 我们的观点 */}
          <div className="border-2 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff]">
            <h3 className="font-bold text-[#0a2463] mb-1 flex items-center">
              <Lightbulb size={20} className="mr-2 text-[#3f8efc]" />
              {t('governance.title_our_opinion')}
            </h3>
            <div className="text-sm text-gray-900 leading-relaxed">
              <ReactMarkdown>{currentProposal?.opinions.myOpinion}</ReactMarkdown>
            </div>
          </div>

          {/* 推文讨论列表 */}
          <div className="my-6 flex flex-col flex-1">
            <h3 className="font-bold text-[#0a2463] mb-2 mt-2 flex items-center">{t('governance.related_tweets')}</h3>
            <div className="md:columns-1 lg:columns-2 gap-2 md:block flex flex-col flex-1">
              {tweets.map((tweet) => (
                <Link
                  key={tweet.tweetId}
                  href={`https://x.com/${tweet.author.screen_name}/status/${tweet.tweetId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 break-inside-avoid md:mb-2"
                >
                  <div className="flex flex-1 items-start p-4 border-2 border-[#0a2463] rounded-lg bg-[#f7faff] hover:shadow-lg transition overflow-hidden">
                    <Image
                      src={tweet?.author?.avatar || ''}
                      alt={tweet?.author?.name}
                      width={24}
                      height={24}
                      className="rounded-full mr-3 h-6 w-6"
                    />
                    <div className="flex-1 flex flex-col overflow-hidden">
                      <div className="font-bold text-[#0a2463] text-sm">{tweet.author.name}</div>
                      <div className="text-xs text-gray-900 mt-1">
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
        <button className="btn px-4 py-2 bg-[#3f8efc] text-white" onClick={() => router.push(`/${locale}/governance`)}>
          {t('common.back')}
        </button>
      </div>
    </div>
  );
}
