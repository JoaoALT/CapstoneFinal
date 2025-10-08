
import React from 'react';

interface IconProps {
  className?: string;
}

export const DumbbellIcon: React.FC<IconProps> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 4.5L12 3m-1.5 1.5L12 6m0-3v3m0 0l-1.5-1.5M12 6l1.5-1.5M5.25 10.5l-1.5 1.5-1.5-1.5m3 0l-1.5-1.5 1.5-1.5m0 3l1.5-1.5-1.5-1.5m1.5 6l-1.5 1.5-1.5-1.5m3 0l-1.5-1.5 1.5-1.5m0 3l1.5-1.5-1.5-1.5m12-3l1.5 1.5 1.5-1.5m-3 0l1.5-1.5-1.5-1.5m0 3l-1.5-1.5 1.5-1.5m-1.5 6l1.5 1.5 1.5-1.5m-3 0l1.5-1.5-1.5-1.5m0 3l-1.5-1.5 1.5-1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v4.5m0 0l-1.5 1.5M12 14.25l1.5 1.5" />
  </svg>
);
