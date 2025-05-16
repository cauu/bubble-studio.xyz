import React from 'react';

// interface ProposalItem {
//   id: number;
//   title: string;
//   date: string;
//   status: string;
//   rotation: number;
// }

export const ProposalCard: React.FC = () => {
  // 模拟数据，实际使用时可以通过props传入或从API获取
  // const proposals: ProposalItem[] = [
  //   { id: 43, title: 'DApp 互操作性标准', date: '2023-11-12', status: '投票中', rotation: 1 },
  //   { id: 44, title: '社区教育资金', date: '2023-11-08', status: '投票中', rotation: -1 },
  //   { id: 45, title: '跨链桥安全审计', date: '2023-11-05', status: '投票中', rotation: 1 }
  // ];

  // const DateIcon = () => (
  //   <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
  //     <rect width="14" height="14" x="1" y="1" fill="#d6e4ff" stroke="#0a2463" strokeWidth="1.5" rx="2" />
  //     <path d="M4 8H12M4 4H12M4 12H8" stroke="#0a2463" strokeWidth="1.5" strokeLinecap="round" />
  //   </svg>
  // );

  return (
    <div className="card bg-white p-5 relative">
      <div className="vote-badge bg-[#FFD166]">讨论中</div>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-[#0a2463]">提案 #56: 社区治理结构改革</h3>
          <p className="text-sm mt-1">该提案建议重组社区治理结构，引入更多的社区代表和专家顾问角色。</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[#3f8efc] font-bold">讨论阶段</span>
          <span className="text-sm">评论: 28</span>
        </div>
      </div>

      {/* 正反方观点区域 */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* 支持观点 */}
        <div className="border-2 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff]">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 rounded-full bg-[#06D6A0] border-2 border-[#0a2463] flex items-center justify-center mr-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/thumbs-up.svg" className="w-3 h-3 text-white" />
            </div>
            <h4 className="font-bold text-sm">支持观点</h4>
          </div>
          <ul className="text-xs space-y-1 point-list pros">
            <li>增加社区参与度和决策透明度</li>
            <li>引入专业顾问提升治理质量</li>
            <li>更多样化的代表结构反映不同利益相关方</li>
          </ul>
        </div>

        {/* 反对观点 */}
        <div className="border-2 border-[#0a2463] rounded-lg p-3 bg-[#e6f0ff]">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 rounded-full bg-[#EF476F] border-2 border-[#0a2463] flex items-center justify-center mr-2">
              <img src="https://unpkg.com/lucide-static@latest/icons/thumbs-down.svg" className="w-3 h-3 text-white" />
            </div>
            <h4 className="font-bold text-sm">反对观点</h4>
          </div>
          <ul className="text-xs space-y-1 point-list cons">
            <li>可能导致决策流程变慢</li>
            <li>增加治理复杂性和运营成本</li>
            <li>权力分散可能削弱执行效率</li>
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex space-x-2">
          <span className="bg-[#e6f0ff] text-[#0a2463] text-xs px-2 py-1 rounded-full border border-[#0a2463]">
            治理
          </span>
          <span className="bg-[#e6f0ff] text-[#0a2463] text-xs px-2 py-1 rounded-full border border-[#0a2463]">
            社区
          </span>
          <span className="bg-[#e6f0ff] text-[#0a2463] text-xs px-2 py-1 rounded-full border border-[#0a2463]">
            结构改革
          </span>
        </div>
      </div>

      <div className="mt-4 flex justify-between">
        <div>
          <span className="text-sm font-bold">提案者:</span>
          <span className="text-sm">Cardano社区联盟</span>
        </div>
        <button className="btn px-4 py-2 bg-[#3f8efc] text-white">查看详情</button>
      </div>
    </div>
  );
};
