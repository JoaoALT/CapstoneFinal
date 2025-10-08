
import React from 'react';
import { StarIcon } from './icons/StarIcon';

export const WordOfTheDay: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-md mx-auto">
      <h3 className="text-sm font-bold text-sky-500 uppercase tracking-wider mb-2">Frase del Día</h3>
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
            <StarIcon className="w-8 h-8 text-amber-400"/>
        </div>
        <div>
            <p className="text-xl font-bold text-slate-800">"¿Dónde está la biblioteca?"</p>
            <p className="text-slate-500">"Where is the library?"</p>
        </div>
      </div>
    </div>
  );
};
