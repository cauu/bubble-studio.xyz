import React from 'react';

interface MetricCardProps {
  icon: string;
  title: string;
  value: string | number | React.ReactNode;
  description?: string;
  progressValue?: number;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, description, progressValue, className = '' }) => {
  return (
    <div
      className={`bg-white rounded-lg p-4 md:p-5 text-center shadow-card transition-all duration-300 ease-brand hover:-translate-y-1 hover:scale-[1.01] hover:shadow-card-hover ${className}`}
    >
      <div className="text-xl md:text-2xl mb-1 md:mb-2">{icon}</div>

      <h3 className="text-xs md:text-sm font-semibold text-muted mb-1 line-clamp-1">{title}</h3>

      <div className="text-lg md:text-xl font-bold text-ink mb-1 tnum">{value}</div>

      {progressValue !== undefined && (
        <div className="w-full bg-hairline-soft rounded-pill h-1 md:h-1.5 mb-1">
          <div
            className="bg-brand-sea h-1 md:h-1.5 rounded-pill transition-all duration-300 ease-in-out"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      )}

      {description && <p className="text-[10px] md:text-xs text-muted line-clamp-1">{description}</p>}
    </div>
  );
};

export default MetricCard;
