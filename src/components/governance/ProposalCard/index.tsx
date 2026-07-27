import React from 'react';
import { Chip } from '@/components/ui/Chip';
import { Button } from '@/components/ui/Button';

export const ProposalCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg p-5 md:p-6 relative shadow-card">
      <div className="flex justify-between items-start gap-3">
        <div>
          <h3 className="text-lg text-ink">提案 #56: 社区治理结构改革</h3>
          <p className="text-sm mt-1 text-body">该提案建议重组社区治理结构，引入更多的社区代表和专家顾问角色。</p>
        </div>
        <div className="flex flex-col items-end gap-1 flex-none">
          <Chip color="lemon">讨论中</Chip>
          <span className="text-sm text-muted tnum">评论: 28</span>
        </div>
      </div>

      {/* 正反方观点区域 */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="rounded-md p-4 bg-surface-soft">
          <h4 className="font-semibold text-sm text-ink mb-2">支持观点</h4>
          <ul className="list-disc pl-5 marker:text-brand-grass text-xs space-y-1 text-body">
            <li>增加社区参与度和决策透明度</li>
            <li>引入专业顾问提升治理质量</li>
            <li>更多样化的代表结构反映不同利益相关方</li>
          </ul>
        </div>

        <div className="rounded-md p-4 bg-surface-soft">
          <h4 className="font-semibold text-sm text-ink mb-2">反对观点</h4>
          <ul className="list-disc pl-5 marker:text-brand-orange text-xs space-y-1 text-body">
            <li>可能导致决策流程变慢</li>
            <li>增加治理复杂性和运营成本</li>
            <li>权力分散可能削弱执行效率</li>
          </ul>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <Chip>治理</Chip>
        <Chip>社区</Chip>
        <Chip>结构改革</Chip>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-body">
          <span className="font-semibold text-ink">提案者: </span>
          <span>Cardano社区联盟</span>
        </div>
        <Button variant="primary" size="md">
          查看详情
        </Button>
      </div>
    </div>
  );
};

export default ProposalCard;
