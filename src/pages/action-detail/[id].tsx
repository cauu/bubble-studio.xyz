import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, CalendarX, CheckCircle, Clock, Lightbulb, MessageCircle, XCircle } from 'lucide-react';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'next-i18next';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import governanceData from '@/data/gov-contents-2025-05-15.json';
import { IGovActionContent } from '@/types/governance';
import { getDurationString } from '@/utils';

// const VOTE_COLORS = ['#06D6A0', '#EF476F', '#d6e4ff'];

const HOT_TOPICS = ['GA:14', 'GA:13', 'GA:18'];

export interface Tweet {
  id: string;
  user: { name: string; avatar: string };
  content: string;
  url: string;
}

interface GovernanceActionProps {
  content: IGovActionContent;
}

export const getStaticPaths = async () => {
  // 假设 governanceData 结构为 { zh: [...], en: [...], ... }
  const paths: any[] = [];

  // 遍历所有语言和 action，生成所有静态路径
  for (const locale of Object.keys(governanceData)) {
    governanceData[locale]
      .filter((item) => item.type === 'action')
      .forEach((item) => {
        paths.push({
          params: { id: item.id },
          locale
        });
      });
  }

  return {
    paths,
    fallback: false // 没有的 id 返回 404
  };
};

export const getStaticProps: GetStaticProps<GovernanceActionProps> = async ({ locale, params }) => {
  const id = params?.id as string;
  const translations = await serverSideTranslations(locale || 'en', ['common']);
  const action = governanceData[locale as string].find((item) => item.type === 'action' && item.id === id) as any;

  console.log('action', action);

  return {
    props: {
      content: action,
      ...translations
    }
  };
};

export const GovActionDetail = ({ content }: { content: IGovActionContent }) => {
  const { t } = useTranslation('common');
  const { locale, push } = useRouter();

  const [duration, setDuration] = useState<string>();

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

  const isHotTopic = HOT_TOPICS.includes(currentProposal?.id);

  // 假设投票数据结构如下
  // const voteData = [
  //   { name: '赞成', value: currentProposal.metadata., color: VOTE_COLORS[0] },
  //   { name: '反对', value: currentProposal.metadata.noVotes, color: VOTE_COLORS[1] },
  //   { name: '弃权', value: currentProposal.metadata.abstainVotes, color: VOTE_COLORS[2] }
  // ];

  return (
    <div className="card bg-white p-5 relative">
      {isHotTopic && <div className="vote-badge">{`${t('governance.hot')}!`}</div>}

      {/* 投票内容 */}
      {currentProposal && (
        <div className="border-3 border-[#0a2463] rounded-lg flex flex-col space-y-4">
          <h3 className="text-xl font-bold text-[#0a2463]">{currentProposal.title}</h3>

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

          {/* 投票结果饼图 */}
          {/* <div className="my-6 flex flex-col items-center">
            <h3 className="font-bold text-[#0a2463] mb-2 flex items-center">投票结果</h3>
            <PieChart width={320} height={220}>
              <Pie data={voteData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {voteData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div> */}

          <div className="border-2 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff]">
            <h3 className="font-bold text-[#0a2463] mb-2 flex items-center">
              <MessageCircle size={20} className="mr-2 text-[#3f8efc]" />
              {t('governance.title_proposal_content')}
            </h3>

            <div className="text-sm text-gray-900 leading-relaxed">
              <ReactMarkdown>{currentProposal?.opinions.summary}</ReactMarkdown>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 正方观点 */}
            <div className="border-2 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff]">
              <h3 className="font-bold text-[#0a2463] mb-2 flex items-center">
                <CheckCircle size={20} className="mr-2 text-[#06D6A0]" />
                {t('governance.title_pros')}
              </h3>

              <ul className="point-list pros text-sm text-gray-900 leading-relaxed">
                {currentProposal?.opinions.pros.map((point, index) => <li key={index}>{point}</li>)}
              </ul>
            </div>

            {/* 反方观点 */}
            <div className="border-2 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff]">
              <h3 className="font-bold text-[#0a2463] mb-2 flex items-center">
                <XCircle size={20} className="mr-2 text-[#EF476F]" />
                {t('governance.title_cons')}
              </h3>

              <ul className="point-list cons text-sm text-gray-900 leading-relaxed">
                {currentProposal?.opinions.cons.map((point, index) => <li key={index}>{point}</li>)}
              </ul>
            </div>
          </div>

          {/* 我们的观点 */}
          <div className="border-2 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff]">
            <h3 className="font-bold text-[#0a2463] mb-2 flex items-center">
              <Lightbulb size={20} className="mr-2 text-[#3f8efc]" />
              {t('governance.title_our_opinion')}
            </h3>
            <div className="text-sm text-gray-900 leading-relaxed">
              <ReactMarkdown>{currentProposal?.opinions.myOpinion}</ReactMarkdown>
            </div>
          </div>

          {/* 推文讨论列表 */}
          <div className="my-6">
            <h3 className="font-bold text-[#0a2463] mb-4 flex items-center">{t('governance.related_tweets')}</h3>
            <div className="columns-1 lg:columns-2 gap-4">
              {tweets.map((tweet) => (
                <Link
                  key={tweet.tweetId}
                  href={`https://x.com/${tweet.author.screen_name}/status/${tweet.tweetId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-4 break-inside-avoid"
                >
                  <div className="flex items-start p-4 border-2 border-[#0a2463] rounded-lg bg-[#f7faff] hover:shadow-lg transition">
                    <Image
                      src={tweet?.author?.avatar || ''}
                      alt={tweet?.author?.name}
                      width={24}
                      height={24}
                      className="rounded-full mr-3 h-6 w-6"
                    />
                    <div>
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
        <button className="btn px-4 py-2 bg-[#3f8efc] text-white" onClick={() => push('/governance')}>
          {t('common.back')}
        </button>
      </div>
    </div>
  );
};

export default GovActionDetail;
