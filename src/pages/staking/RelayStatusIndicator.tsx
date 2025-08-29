import React from 'react';

interface RelayStatusIndicatorProps {
  onlineCount: number;
  totalCount: number;
  className?: string;
}

const RelayStatusIndicator: React.FC<RelayStatusIndicatorProps> = ({ onlineCount, totalCount, className = '' }) => {
  const relayDots = Array.from({ length: totalCount }, (_, index) => (
    <div
      key={index}
      className={`w-2 h-2 rounded-full transition-all duration-300 ${
        index < onlineCount ? 'bg-gradient-to-br from-green-400 to-blue-400 shadow-sm' : 'bg-gray-300'
      }`}
    />
  ));

  return <div className={`flex items-center justify-center space-x-1 ${className}`}>{relayDots}</div>;
};

export default RelayStatusIndicator;
