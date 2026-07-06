import React from 'react';

export default function EmptyList({ text = '暂无数据' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 bg-white rounded-lg shadow-card">
      {/* Paopao-style bubble */}
      <div className="relative w-14 h-14 mb-4" aria-hidden="true">
        <span className="absolute inset-0 rounded-full bg-brand-sky" />
        <span className="absolute w-[17px] h-[17px] rounded-full bg-surface-blank top-[11px] left-[10px]" />
        <span className="absolute w-[11px] h-[11px] rounded-full bg-brand-lavender -right-0.5 -top-0.5" />
      </div>
      <div className="text-base font-semibold text-muted">{text}</div>
    </div>
  );
}
