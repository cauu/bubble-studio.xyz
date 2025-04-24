// export const ProposalCard = () => {
//   return (
//     <div className="card bg-white p-5 h-[calc(40%)]">
//       <h2 className="text-2xl title-font mb-4 flex items-center text-[#0a2463]">
//         <img src="https://unpkg.com/lucide-static@latest/icons/history.svg" className="w-6 h-6 mr-2" />
//         历史提案
//       </h2>

//       <div className="space-y-3 overflow-y-auto h-[calc(100%-60px)] pr-1">
//         <div className="border-3 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff] flex justify-between items-center">
//           <div>
//             <h3 className="font-bold text-[#0a2463]">提案 #39: DApp商店集成</h3>
//             <div className="text-xs text-[#3f8efc]">2023-10-15 结束</div>
//           </div>
//           <div className="flex items-center">
//             <div className="bg-[#06D6A0] text-white text-xs font-bold px-2 py-1 rounded-lg border-2 border-[#0a2463]">
//               已通过
//             </div>
//             <button className="ml-2">
//               <img src="https://unpkg.com/lucide-static@latest/icons/chevron-right.svg" className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <div className="border-3 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff] flex justify-between items-center">
//           <div>
//             <h3 className="font-bold text-[#0a2463]">提案 #38: 社区基金分配</h3>
//             <div className="text-xs text-[#3f8efc]">2023-10-01 结束</div>
//           </div>
//           <div className="flex items-center">
//             <div className="bg-[#EF476F] text-white text-xs font-bold px-2 py-1 rounded-lg border-2 border-[#0a2463]">
//               未通过
//             </div>
//             <button className="ml-2">
//               <img src="https://unpkg.com/lucide-static@latest/icons/chevron-right.svg" className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <div className="border-3 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff] flex justify-between items-center">
//           <div>
//             <h3 className="font-bold text-[#0a2463]">提案 #37: 质押池参数调整</h3>
//             <div className="text-xs text-[#3f8efc]">2023-09-15 结束</div>
//           </div>
//           <div className="flex items-center">
//             <div className="bg-[#06D6A0] text-white text-xs font-bold px-2 py-1 rounded-lg border-2 border-[#0a2463]">
//               已通过
//             </div>
//             <button className="ml-2">
//               <img src="https://unpkg.com/lucide-static@latest/icons/chevron-right.svg" className="w-5 h-5" />
//             </button>
//           </div>
//         </div>

//         <div className="border-3 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff] flex justify-between items-center">
//           <div>
//             <h3 className="font-bold text-[#0a2463]">提案 #36: 网络安全升级</h3>
//             <div className="text-xs text-[#3f8efc]">2023-09-01 结束</div>
//           </div>
//           <div className="flex items-center">
//             <div className="bg-[#06D6A0] text-white text-xs font-bold px-2 py-1 rounded-lg border-2 border-[#0a2463]">
//               已通过
//             </div>
//             <button className="ml-2">
//               <img src="https://unpkg.com/lucide-static@latest/icons/chevron-right.svg" className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="mt-3 text-center">
//         <a href="#" className="text-[#3f8efc] text-sm font-bold flex items-center justify-center">
//           查看全部历史提案
//           <img src="https://unpkg.com/lucide-static@latest/icons/chevron-right.svg" className="w-4 h-4 ml-1" />
//         </a>
//       </div>
//     </div>
//   );
// };

import React from 'react';

interface ProposalItem {
  id: number;
  title: string;
  date: string;
  status: string;
  rotation: number;
}

export const ProposalCard: React.FC = () => {
  // 模拟数据，实际使用时可以通过props传入或从API获取
  const proposals: ProposalItem[] = [
    { id: 43, title: 'DApp 互操作性标准', date: '2023-11-12', status: '投票中', rotation: 1 },
    { id: 44, title: '社区教育资金', date: '2023-11-08', status: '投票中', rotation: -1 },
    { id: 45, title: '跨链桥安全审计', date: '2023-11-05', status: '投票中', rotation: 1 }
  ];

  const DateIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
      <rect width="14" height="14" x="1" y="1" fill="#d6e4ff" stroke="#0a2463" strokeWidth="1.5" rx="2" />
      <path d="M4 8H12M4 4H12M4 12H8" stroke="#0a2463" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  return (
    <div className="card bg-white p-5">
      <h2 className="text-2xl title-font mb-4 flex items-center text-[#0a2463]">
        <img src="https://unpkg.com/lucide-static@latest/icons/file-text.svg" className="w-6 h-6 mr-2" />
        当前提案
      </h2>

      <div className="space-y-3 max-h-[calc(100%-60px)] overflow-y-auto pr-2">
        {proposals.map((proposal) => (
          <div
            key={proposal.id}
            className={`border-3 border-[#0a2463] rounded-lg p-4 flex items-center justify-between bg-[#e6f0ff] transform rotate-${proposal.rotation}`}
          >
            <div>
              <h3 className="font-bold">
                提案 #{proposal.id}: {proposal.title}
              </h3>
              <div className="text-sm text-[#3a506b] mt-1 flex items-center">
                <DateIcon />
                提交日期: {proposal.date}
              </div>
            </div>
            <div className="flex space-x-2">
              <span className="px-2 py-1 bg-[#3f8efc] border-2 border-[#0a2463] rounded text-xs font-bold text-white">
                {proposal.status}
              </span>
              <button className="btn px-3 py-1.5 bg-white text-sm">查看详情</button>
            </div>
          </div>
        ))}
      </div>

      {/* 创建提案按钮 */}
      {/* <div className="flex justify-center mt-4">
        <button className="btn px-4 py-2 bg-[#3f8efc] text-white flex items-center transform rotate-2">
          <img src="https://unpkg.com/lucide-static@latest/icons/plus.svg" className="w-4 h-4 mr-2 text-white" />
          创建新提案
        </button>
      </div> */}
    </div>
  );
};
