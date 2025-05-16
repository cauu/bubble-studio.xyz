import { Info } from 'lucide-react';
import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="card bg-white p-5">
      <h2 className="text-2xl title-font mb-4 flex items-center text-[#0a2463] font-bold">
        <Info className="w-6 h-6 mr-2" />
        关于治理
      </h2>

      <div className="border-3 border-[#0a2463] rounded-lg p-4 mb-4 bg-[#e6f0ff]">
        <p className="text-sm mb-3 leading-relaxed">
          Bubble Studio致力于推动Cardano生态系统的去中心化治理，我们相信社区的力量和集体智慧。
        </p>
        {/* <p className="text-sm leading-relaxed">通过参与投票和提案，您可以直接影响Cardano的未来发展方向。</p> */}
      </div>

      <div className="space-y-3">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full border-3 border-[#0a2463] flex items-center justify-center mr-3 bg-[#3f8efc] transform rotate-3">
            <img src="https://unpkg.com/lucide-static@latest/icons/vote.svg" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold">投票权</h3>
            <p className="text-xs">基于您的ADA质押量</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full border-3 border-[#0a2463] flex items-center justify-center mr-3 bg-[#d6e4ff] transform -rotate-3">
            <img src="https://unpkg.com/lucide-static@latest/icons/file-text.svg" className="w-6 h-6 text-[#0a2463]" />
          </div>
          <div>
            <h3 className="font-bold">提案流程</h3>
            <p className="text-xs">从提交到执行的完整周期</p>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full border-3 border-[#0a2463] flex items-center justify-center mr-3 bg-[#3f8efc] transform rotate-3">
            <img src="https://unpkg.com/lucide-static@latest/icons/users.svg" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold">代表机制</h3>
            <p className="text-xs">了解DReps如何代表社区</p>
          </div>
        </div>
      </div>
    </div>
  );
};
