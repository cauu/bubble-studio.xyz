import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, CheckCircle, Clock, Lightbulb, MessageCircle, XCircle } from 'lucide-react';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import { useTranslations } from 'next-intl';

import { IGovActionContent } from '@/types/governance';

import { getDurationString } from '@/utils';
import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';

// 投票组织组件
// const VotingOrganization = ({ organization }) => {
//   const { name, icon, votes } = organization;

//   return (
//     <div className="flex items-center px-2">
//       <div className="relative w-16 h-16 mb-2">
//         <svg width="100%" height="100%" viewBox="0 0 100 100">
//           <circle cx="50" cy="50" r="45" fill="white" stroke="#0a2463" strokeWidth="2" />
//           <path d="M50 5 A45 45 0 0 1 95 50" fill="none" stroke="#06D6A0" strokeWidth="10" />
//           <path d="M95 50 A45 45 0 0 1 78 85" fill="none" stroke="#EF476F" strokeWidth="10" />
//           <path d="M78 85 A45 45 0 0 1 50 95" fill="none" stroke="#d6e4ff" strokeWidth="10" />
//           <path
//             d="M50 95 A45 45 0 0 1 5 50 A45 45 0 0 1 50 5"
//             fill="none"
//             stroke="#f0f7ff"
//             strokeWidth="10"
//             strokeDasharray="5,5"
//           />
//         </svg>
//       </div>
//       <div className="text-center flex flex-col ml-4">
//         <h3 className="font-bold text-sm text-[#0a2463] flex items-center justify-center mb-1">
//           {icon}
//           <span className="ml-1">{name}</span>
//         </h3>
//         <div className="text-xs space-y-1">
//           {votes.map((vote) => {
//             return (
//               <div key={vote.type} className="flex items-center justify-between space-x-2">
//                 <span className="font-medium text-nowrap" style={{ color: vote.color }}>
//                   {vote.type}
//                 </span>
//                 <span className="font-bold">{vote.percentage}%</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

const HOT_TOPICS = ['GA:14', 'GA:13', 'GA:18'];

export const GovActionCard = ({ proposal }: { proposal: IGovActionContent }) => {
  const currentProposal = useMemo(() => proposal, [proposal]);
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const locale = params.locale as string;

  const [duration, setDuration] = useState<string>();

  // const votingOrganizations = useMemo(() => {
  //   const metadata = currentProposal.metadata;
  //   return [
  //     {
  //       name: 'dRep',
  //       icon: <Users size={16} />,
  //       voteRate: 50,
  //       votes: [
  //         {
  //           type: '赞成',
  //           value: metadata.dRepYesVotes,
  //           percentage: 50,
  //           color: '#06D6A0'
  //         },
  //         {
  //           type: '反对',
  //           value: metadata.dRepNoVotes,
  //           percentage: 0,
  //           color: '#EF476F'
  //         },
  //         {
  //           type: '弃权',
  //           value: metadata.dRepAbstainVotes,
  //           percentage: 0,
  //           color: '#d6e4ff'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'pool',
  //       icon: <User size={16} />,
  //       voteRate: 50,
  //       votes: [
  //         {
  //           type: '赞成',
  //           value: metadata.poolYesVotes,
  //           percentage: 50,
  //           color: '#06D6A0'
  //         },
  //         {
  //           type: '反对',
  //           value: metadata.poolNoVotes,
  //           percentage: 0,
  //           color: '#EF476F'
  //         },
  //         {
  //           type: '弃权',
  //           value: metadata.poolAbstainVotes,
  //           percentage: 0,
  //           color: '#d6e4ff'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'cc',
  //       icon: <User size={16} />,
  //       voteRate: 50,
  //       votes: [
  //         {
  //           type: '赞成',
  //           value: metadata.ccYesVotes,
  //           percentage: 50,
  //           color: '#06D6A0'
  //         },
  //         {
  //           type: '反对',
  //           value: metadata.ccNoVotes,
  //           percentage: 0,
  //           color: '#EF476F'
  //         },
  //         {
  //           type: '弃权',
  //           value: metadata.ccAbstainVotes,
  //           percentage: 0,
  //           color: '#d6e4ff'
  //         }
  //       ]
  //     }
  //   ];
  // }, [currentProposal.metadata]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentProposal?.metadata.expiryDate) {
        setDuration(getDurationString(new Date(), currentProposal?.metadata.expiryDate, locale as 'zh' | 'en' | 'tw'));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentProposal?.metadata.expiryDate, locale]);

  const isHotTopic = HOT_TOPICS.includes(currentProposal?.id);

  return (
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

          <div className="flex justify-between flex-col md:flex-row gap-1 text-muted">
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

          {/* 总体投票进度 */}
          {/* <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold">总体投票进度</span>
              <span className="text-sm font-bold">50%</span>
            </div>
            <div className="progress-bar bg-white">
              <div className="progress-bar-inner bg-[#3f8efc]" style={{ width: `50%` }}></div>
              <div className="progress-threshold" style={{ left: `30%` }}></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>最低参与率: {65}%</span>
              <span className="text-[#06D6A0] font-bold">✓ 已达标</span>
            </div>
          </div> */}

          <div className="rounded-md p-4 bg-surface-soft">
            <h3 className="text-ink flex mb-1 items-center text-[15px]">
              <MessageCircle size={18} className="mr-2 text-brand-sea" />
              {t('governance.title_proposal_content')}
            </h3>

            <div className="text-sm text-body leading-relaxed line-clamp-5 md:line-clamp-none">
              <ReactMarkdown>{currentProposal?.opinions.summary}</ReactMarkdown>
            </div>
          </div>

          {/* <div className="grid grid-cols-3 gap-2 rounded-lg p-3">
            {votingOrganizations.map((org, index) => (
              <VotingOrganization key={`org-${index}`} organization={org} />
            ))}
          </div> */}

          <div className="grid-cols-1 md:grid-cols-2 gap-4 hidden md:grid">
            {/* 正方观点 */}
            <div className="rounded-md p-4 bg-surface-soft hidden md:block">
              <h3 className="text-ink flex items-center text-[15px] mb-1">
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
            <div className="rounded-md p-4 bg-surface-soft hidden md:block">
              <h3 className="text-ink flex mb-1 items-center text-[15px]">
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
            <h3 className="text-ink flex mb-1 items-center text-[15px]">
              <Lightbulb size={18} className="mr-2 text-brand-incana" />
              {t('governance.title_our_opinion')}
            </h3>

            <div className="text-sm text-body leading-relaxed line-clamp-5 md:line-clamp-none">
              <ReactMarkdown>{currentProposal?.opinions.myOpinion}</ReactMarkdown>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="primary" size="md" onClick={() => router.push(`/action-detail/${currentProposal.id}`)}>
              {t('common.view_detail')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovActionCard;
