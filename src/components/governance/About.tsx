import { Info } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React from 'react';

export const About: React.FC = () => {
  const t = useTranslations();

  return (
    <div className="bg-white rounded-lg p-5 shadow-card">
      <h2 className="text-lg mb-4 flex items-center text-ink">
        <Info className="w-5 h-5 mr-2 text-brand-incana" />
        {t('governance.about_title')}
      </h2>

      <div className="rounded-md p-4 bg-surface-soft">
        <p className="text-sm leading-relaxed text-body">{t('governance.about_content')}</p>
      </div>

      {/* <div className="space-y-3">
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
      </div> */}
    </div>
  );
};

export default About;
