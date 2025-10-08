
import React from 'react';

interface ActionButtonProps {
  text: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ text, icon, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-extrabold text-lg text-white bg-sky-500 shadow-lg shadow-sky-500/30 transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-sky-300 ${className}`}
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};
