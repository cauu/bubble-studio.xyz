import React, { useMemo } from 'react';
import { Calendar, CalendarX, CheckCircle, Clock, Lightbulb, User, Users, Vote, XCircle } from 'lucide-react';

import { IGovernanceAction } from '@/types/governance';

export const GovActionCard = ({ proposal }: { proposal: IGovernanceAction }) => {
  const currentProposal = proposal;

  const groups = useMemo(() => {
    return [
      {
        name: 'dRep',
        icon: <Users size={16} />,
        voteRate: 50,
        votes: [
          {
            type: '赞成',
            value: proposal.dRepYesVotes,
            percentage: 50,
            color: '#06D6A0'
          },
          {
            type: '反对',
            value: proposal.dRepNoVotes,
            percentage: 0,
            color: '#EF476F'
          },
          {
            type: '弃权',
            value: proposal.dRepAbstainVotes,
            percentage: 0,
            color: '#d6e4ff'
          }
        ]
      },
      {
        name: 'pool',
        icon: <User size={16} />,
        voteRate: 50,
        votes: [
          {
            type: '赞成',
            value: proposal.poolYesVotes,
            percentage: 50,
            color: '#06D6A0'
          },
          {
            type: '反对',
            value: proposal.poolNoVotes,
            percentage: 0,
            color: '#EF476F'
          },
          {
            type: '弃权',
            value: proposal.poolAbstainVotes,
            percentage: 0,
            color: '#d6e4ff'
          }
        ]
      },
      {
        name: 'cc',
        icon: <User size={16} />,
        voteRate: 50,
        votes: [
          {
            type: '赞成',
            value: proposal.ccYesVotes,
            percentage: 50,
            color: '#06D6A0'
          },
          {
            type: '反对',
            value: proposal.ccNoVotes,
            percentage: 0,
            color: '#EF476F'
          },
          {
            type: '弃权',
            value: proposal.ccAbstainVotes,
            percentage: 0,
            color: '#d6e4ff'
          }
        ]
      }
    ];
  }, [proposal]);

  return (
    <div className="card bg-white p-5 relative">
      <div className="vote-badge">热门！</div>
      <h2 className="text-2xl title-font mb-4 flex items-center text-[#0a2463]">
        <Vote size={32} className="mr-2" />
        当前投票
      </h2>

      {/* 投票标签页 */}
      {/* <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {proposals.map((proposal) => (
          <button
            key={proposal.id}
            className={`tab ${proposal.id === currentProposal.id ? 'tab-active' : 'tab-inactive'} border-3 border-[#0a2463] rounded-t-lg px-4 py-2 font-bold`}
            onClick={() => onTabChange(proposal.id)}
          >
            提案 #{proposal.id}
          </button>
        ))}
      </div> */}

      {/* 投票内容 */}
      {currentProposal && (
        <div className="border-3 border-[#0a2463] rounded-lg p-4 bg-[#e6f0ff] mb-4">
          <h3 className="text-xl font-bold text-[#0a2463] mb-2">
            提案 #{currentProposal.id}: {currentProposal.title}
          </h3>

          <div className="flex justify-between mb-3">
            <div className="flex items-center text-sm">
              <Calendar size={16} className="mr-1" />
              <span>开始: {currentProposal.createdDate}</span>
            </div>
            <div className="flex items-center text-sm">
              <CalendarX size={16} className="mr-1" />
              <span>结束: {currentProposal.expiryDate}</span>
            </div>
            <div className="flex items-center text-sm font-bold text-[#3f8efc]">
              <Clock size={16} className="mr-1" />
              {/* <span>剩余时间: {currentProposal.}</span> */}
              <span>剩余时间: 3天5小时</span>
            </div>
          </div>

          {/* 总体投票进度 */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-bold">总体投票进度</span>
              {/* <span className="text-sm font-bold">{currentProposal.participationRate}%</span> */}
              <span className="text-sm font-bold">50%</span>
            </div>
            <div className="progress-bar bg-white">
              <div
                className="progress-bar-inner bg-[#3f8efc]"
                // style={{ width: `${currentProposal.participationRate}%` }}
                style={{ width: `50%` }}
              ></div>
              <div className="progress-threshold" style={{ left: `30%` }}></div>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span>最低参与率: {65}%</span>
              <span className="text-[#06D6A0] font-bold">✓ 已达标</span>
              {/* {currentProposal.participationRate >= currentProposal.minParticipationRate ? (
                <span className="text-[#06D6A0] font-bold">✓ 已达标</span>
              ) : (
                <span className="text-[#EF476F] font-bold">✗ 未达标</span>
              )} */}
            </div>
          </div>

          {/* 三个组织的投票进度 */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            {groups.map((group) => (
              <div key={group.name} className="border-3 border-[#0a2463] rounded-lg p-3 bg-white">
                <h3 className="font-bold text-[#0a2463] mb-2 flex items-center">
                  <div className="mr-1">{group.icon}</div>
                  {group.name}
                </h3>

                <div className="flex flex-col items-center">
                  <div className="relative w-24 h-24 mb-2">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="white" stroke="#0a2463" strokeWidth="2" />
                      {/* {group.chartPaths.map((path, index) => (
                        <path
                          key={index}
                          d={path.d}
                          fill="none"
                          stroke={path.color}
                          strokeWidth="10"
                          strokeDasharray={path.dasharray || ''}
                        />
                      ))} */}
                      <path d="M50 5 A45 45 0 0 1 95 50" fill="none" stroke="#06D6A0" stroke-width="10" />
                      <path d="M95 50 A45 45 0 0 1 78 85" fill="none" stroke="#EF476F" stroke-width="10" />
                      <path d="M78 85 A45 45 0 0 1 50 95" fill="none" stroke="#d6e4ff" stroke-width="10" />
                      <path
                        d="M50 95 A45 45 0 0 1 5 50 A45 45 0 0 1 50 5"
                        fill="none"
                        stroke="#f0f7ff"
                        stroke-width="10"
                        stroke-dasharray="5,5"
                      />
                      <text x="50" y="55" text-anchor="middle" font-size="16" font-weight="bold">
                        70%
                      </text>
                      <text x="50" y="55" textAnchor="middle" fontSize="16" fontWeight="bold">
                        {group.voteRate}%
                      </text>
                    </svg>
                  </div>

                  <div className="w-full space-y-1 text-xs">
                    {group.votes.map((vote) => {
                      return (
                        <div key={vote.type} className="flex justify-between">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-[#06D6A0] mr-1" style={{ backgroundColor: vote.color }}></div>
                            <span>{vote.type}</span>
                          </div>
                          <span>{vote.percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 观点总结 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* 正方观点 */}
            <div className="border-3 border-[#0a2463] rounded-lg p-3 bg-white">
              <h3 className="font-bold text-[#0a2463] mb-2 flex items-center">
                <CheckCircle size={32} className="mr-2 text-[#06D6A0]" />
                正方观点总结
              </h3>

              <ul className="point-list pros text-xs">
                {currentProposal.opinions.pros.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            {/* 反方观点 */}
            <div className="border-3 border-[#0a2463] rounded-lg p-3 bg-white">
              <h3 className="font-bold text-[#0a2463] mb-2 flex items-center">
                <XCircle size={16} className="mr-2 text-[#EF476F]" />
                反方观点总结
              </h3>

              <ul className="point-list cons text-xs">
                {currentProposal.opinions.againsts.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 我们的观点 */}
          <div className="border-3 border-[#0a2463] rounded-lg p-3 bg-white">
            <h3 className="font-bold text-[#0a2463] mb-2 flex items-center">
              <Lightbulb size={16} className="mr-2 text-[#3f8efc]" />
              我们的观点
            </h3>

            <p className="text-xs">{currentProposal.opinions.myOpinions}</p>
          </div>

          {/* 投票按钮 */}
          {/* <div className="flex justify-center mt-4 space-x-3">
            <button className="btn px-4 py-2 bg-[#06D6A0] text-white flex items-center text-sm">
              <img src="https://unpkg.com/lucide-static@latest/icons/thumbs-up.svg" className="w-4 h-4 mr-1" />
              赞成
            </button>
            <button className="btn px-4 py-2 bg-[#EF476F] text-white flex items-center text-sm">
              <img src="https://unpkg.com/lucide-static@latest/icons/thumbs-down.svg" className="w-4 h-4 mr-1" />
              反对
            </button>
            <button className="btn px-4 py-2 bg-[#d6e4ff] text-[#0a2463] flex items-center text-sm">
              <img src="https://unpkg.com/lucide-static@latest/icons/minus-circle.svg" className="w-4 h-4 mr-1" />
              弃权
            </button>
          </div> */}
        </div>
      )}

      {/* 其他投票预览 */}
      {/* <div className="grid grid-cols-2 gap-4">
        {proposals
          .filter((proposal) => proposal.id !== currentProposal?.id)
          .slice(0, 2)
          .map((proposal) => (
            <div key={proposal.id} className="border-3 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff]">
              <h3 className="font-bold text-[#0a2463] mb-2">
                提案 #{proposal.id}: {proposal.title}
              </h3>
              <div className="flex justify-between text-xs mb-2">
                <div className="flex items-center">
                  <img src="https://unpkg.com/lucide-static@latest/icons/clock.svg" className="w-3 h-3 mr-1" />
                  <span>剩余: {proposal.remainingTime}</span>
                </div>
                <div className="font-bold text-[#3f8efc]">参与率: {proposal.participationRate}%</div>
              </div>
              <div className="progress-bar bg-white mb-2" style={{ height: '16px' }}>
                <div
                  className="progress-bar-inner bg-[#3f8efc]"
                  style={{ width: `${proposal.participationRate}%` }}
                ></div>
                <div className="progress-threshold" style={{ left: `${proposal.minParticipationRate}%` }}></div>
              </div>
              <button
                className="btn px-3 py-1 bg-white text-[#0a2463] text-xs w-full"
                onClick={() => onTabChange(proposal.id)}
              >
                查看详情
              </button>
            </div>
          ))}
      </div> */}
    </div>
  );
};
