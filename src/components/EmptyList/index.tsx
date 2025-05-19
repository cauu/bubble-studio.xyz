// BubbleEmptyList.tsx
import React from 'react';

export default function EmptyList({ text = '暂无数据' }) {
  return (
    <div className="relative flex flex-col items-center justify-center py-16 bg-white card">
      {/* 装饰气泡（无动画） */}
      <div
        className="absolute"
        style={{
          width: 40,
          height: 40,
          top: 10,
          left: 20,
          background: '#d6e4ff',
          border: '2px solid #0a2463',
          borderRadius: '50%',
          opacity: 0.7,
          zIndex: 0
        }}
      />
      <div
        className="absolute"
        style={{
          width: 24,
          height: 24,
          bottom: 10,
          right: 30,
          background: '#b8d3ff',
          border: '2px solid #0a2463',
          borderRadius: '50%',
          opacity: 0.7,
          zIndex: 0
        }}
      />
      {/* 主体内容 */}
      <div className="flex flex-col items-center z-10">
        <svg width="64" height="64" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4">
          <circle cx="20" cy="20" r="18" fill="#d6e4ff" stroke="#0a2463" strokeWidth="4" />
          <circle cx="20" cy="20" r="8" fill="#3f8efc" stroke="#0a2463" strokeWidth="4" />
          {/* <ellipse cx="20" cy="28" rx="7" ry="2" fill="#fff" stroke="#3f8efc" strokeWidth="1" opacity="0.5" /> */}
        </svg>
        <div className="text-2xl title-font text-[#3f8efc] mb-2" style={{ fontFamily: "'Bangers', cursive" }}>
          {text}
        </div>
        {/* <div className="text-[#0a2463] text-base font-bold opacity-70">这里还没有任何内容哦～</div> */}
      </div>
      {/* 样式 */}
      <style>
        {`
          .card {
            border: 3px solid #0a2463;
            border-radius: 16px;
            box-shadow: 6px 6px 0px #0a2463;
            position: relative;
            overflow: hidden;
          }
          .title-font {
            font-family: 'Bangers', cursive;
            letter-spacing: 1px;
          }
        `}
      </style>
    </div>
  );
}
