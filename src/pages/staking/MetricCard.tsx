import React from 'react';

interface MetricCardProps {
  icon: string;
  title: string;
  value: string | number | React.ReactNode;
  description?: string;
  isGlow?: boolean;
  progressValue?: number;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  title,
  value,
  description,
  isGlow = false,
  progressValue,
  className = ''
}) => {
  return (
    <div
      className={`
            metric-card bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg text-center 
            transition-all duration-200 ease-in-out hover:scale-102 cursor-pointer
            ${isGlow ? 'shadow-[0_0_20px_rgba(255,154,158,0.3)]' : ''}
            ${className}
        `}
    >
      {/* Icon */}
      <div className="text-2xl mb-2">{icon}</div>

      {/* Title */}
      <h3 className="text-sm font-bold text-gray-800 mb-1">{title}</h3>

      {/* Value */}
      <div className="text-xl font-bold text-blue-600 mb-1 font-mono">{value}</div>

      {/* Progress Bar (if progressValue is provided) */}
      {progressValue !== undefined && (
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
          <div
            className="bg-gradient-to-r from-pink-400 to-pink-300 h-1.5 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progressValue}%` }}
          />
        </div>
      )}

      {/* Description */}
      {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
  );
};

export default MetricCard;
