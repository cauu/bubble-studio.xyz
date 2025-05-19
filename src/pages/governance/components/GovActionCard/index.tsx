import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, CalendarX, CheckCircle, Clock, Lightbulb, MessageCircle, XCircle } from 'lucide-react';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import { useTranslation } from 'next-i18next';

import { IGovActionContent } from '@/types/governance';

import { getDurationString } from '@/utils';

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
  const { t } = useTranslation('common');

  console.log(t('governance.hot'));

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
        setDuration(getDurationString(new Date(), currentProposal?.metadata.expiryDate));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [currentProposal?.metadata.expiryDate]);

  const isHotTopic = HOT_TOPICS.includes(currentProposal?.id);

  return (
    <div className="card bg-white p-5 relative">
      {isHotTopic && <div className="vote-badge">{`${t('governance.hot')}!`}</div>}

      {/* 投票内容 */}
      {currentProposal && (
        <div className="border-3 border-[#0a2463] rounded-lg flex flex-col space-y-4">
          <h3 className="text-xl font-bold text-[#0a2463]">{currentProposal.title}</h3>

          <div className="flex justify-between">
            <div className="flex items-center text-sm">
              <Calendar size={16} className="mr-1" />
              <span>
                {t('governance.submit_at')}: {dayjs(currentProposal?.metadata.createdDate).format('YYYY-MM-DD HH:mm')}
              </span>
            </div>
            <div className="flex items-center text-sm">
              <CalendarX size={16} className="mr-1" />
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

          <div className="border-2 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff]">
            <h3 className="font-bold text-[#0a2463] mb-2 flex items-center">
              <MessageCircle size={20} className="mr-2 text-[#3f8efc]" />
              {t('governance.title_proposal_content')}
            </h3>

            <div className="text-sm text-gray-900 leading-relaxed">
              <ReactMarkdown>{currentProposal?.opinions.summary}</ReactMarkdown>
            </div>
          </div>

          {/* <div className="grid grid-cols-3 gap-2 rounded-lg p-3">
            {votingOrganizations.map((org, index) => (
              <VotingOrganization key={`org-${index}`} organization={org} />
            ))}
          </div> */}

          <div className="grid grid-cols-2 gap-4">
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

            {/* <p className="text-sm text-gray-900">{currentProposal.opinions.myOpinion}</p> */}
            <div className="text-sm text-gray-900 leading-relaxed">
              <ReactMarkdown>{currentProposal?.opinions.myOpinion}</ReactMarkdown>
            </div>
          </div>

          {/* <div className="flex justify-end">
            <button className="btn px-4 py-2 bg-[#3f8efc] text-white">查看详情</button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default GovActionCard;
