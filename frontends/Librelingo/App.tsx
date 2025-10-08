
import React from 'react';
import { Header } from './components/Header';
import { ProgressPath } from './components/ProgressPath';
import { WordOfTheDay } from './components/WordOfTheDay';
import { ActionButton } from './components/ActionButton';
import { BookOpenIcon } from './components/icons/BookOpenIcon';
import { DumbbellIcon } from './components/icons/DumbbellIcon';
import { ChartBarIcon } from './components/icons/ChartBarIcon';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-nunito text-slate-800">
      <Header />
      
      <main className="pt-24 pb-48 px-4 max-w-4xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-8">
            <div className="w-full lg:w-2/3">
                 <ProgressPath />
            </div>

            <div className="w-full lg:w-1/3 space-y-8 lg:sticky top-24">
                <WordOfTheDay />

                <div className="space-y-4 px-2">
                    <ActionButton
                      text="Empezar Lección"
                      icon={<BookOpenIcon className="w-7 h-7" />}
                      onClick={() => alert('Starting Lesson...')}
                    />
                    <button className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-2xl font-bold text-lg text-slate-600 bg-white shadow-md transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-200">
                      <DumbbellIcon className="w-6 h-6" />
                      <span>Práctica</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-2xl font-bold text-lg text-slate-600 bg-white shadow-md transform hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-slate-200">
                      <ChartBarIcon className="w-6 h-6" />
                      <span>Mi Progreso</span>
                    </button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;
