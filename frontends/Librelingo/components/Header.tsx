
import React from 'react';
import { FlagIcon } from './icons/FlagIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-2">
        <FlagIcon className="w-8 h-8 text-sky-500" />
        <h1 className="text-2xl font-black text-slate-800">LinguaPath</h1>
      </div>
      <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center shadow-md">
        <span className="text-white font-bold text-lg">A</span>
      </div>
    </header>
  );
};
