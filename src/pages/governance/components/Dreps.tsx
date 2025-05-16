import { ChevronRight, Info, Users } from 'lucide-react';
import React from 'react';

export const Dreps: React.FC = () => {
  return (
    <div className="card bg-white p-5">
      <h2 className="text-2xl title-font mb-4 flex items-center text-[#0a2463]">
        <Users className="w-6 h-6 mr-2" />
        DReps
      </h2>

      <div className="space-y-3">
        <div className="border-3 border-[#0a2463] rounded-lg p-3 flex items-center bg-[#e6f0ff]">
          <div className="w-12 h-12 rounded-full bg-[#3f8efc] border-3 border-[#0a2463] mr-3 flex items-center justify-center transform rotate-3">
            <span className="font-bold text-lg text-white">AC</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Alex Chen</h3>
            <div className="text-xs flex items-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  d="M7 1L9 5H13L10 8L11 12L7 10L3 12L4 8L1 5H5L7 1Z"
                  fill="#3f8efc"
                  stroke="#0a2463"
                  strokeWidth="1.5"
                />
              </svg>
              投票权重: 8.5%
            </div>
          </div>
          <button className="p-1.5 border-2 border-[#0a2463] rounded-lg bg-white">
            <Info className="w-4 h-4" />
          </button>
        </div>

        <div className="border-3 border-[#0a2463] rounded-lg p-3 flex items-center bg-[#e6f0ff]">
          <div className="w-12 h-12 rounded-full bg-[#d6e4ff] border-3 border-[#0a2463] mr-3 flex items-center justify-center transform -rotate-3">
            <span className="font-bold text-lg text-[#0a2463]">SJ</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Sarah Johnson</h3>
            <div className="text-xs flex items-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  d="M7 1L9 5H13L10 8L11 12L7 10L3 12L4 8L1 5H5L7 1Z"
                  fill="#3f8efc"
                  stroke="#0a2463"
                  strokeWidth="1.5"
                />
              </svg>
              投票权重: 7.2%
            </div>
          </div>
          <button className="p-1.5 border-2 border-[#0a2463] rounded-lg bg-white">
            <Info className="w-4 h-4" />
          </button>
        </div>

        <div className="border-3 border-[#0a2463] rounded-lg p-3 flex items-center bg-[#e6f0ff]">
          <div className="w-12 h-12 rounded-full bg-[#3f8efc] border-3 border-[#0a2463] mr-3 flex items-center justify-center transform rotate-3">
            <span className="font-bold text-lg text-white">MT</span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold">Michael Torres</h3>
            <div className="text-xs flex items-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-1"
              >
                <path
                  d="M7 1L9 5H13L10 8L11 12L7 10L3 12L4 8L1 5H5L7 1Z"
                  fill="#3f8efc"
                  stroke="#0a2463"
                  strokeWidth="1.5"
                />
              </svg>
              投票权重: 6.8%
            </div>
          </div>
          <button className="p-1.5 border-2 border-[#0a2463] rounded-lg bg-white">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <a href="#" className="text-[#3f8efc] text-sm font-bold flex items-center justify-center">
          查看全部DReps
          <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  );
};

export default Dreps;
