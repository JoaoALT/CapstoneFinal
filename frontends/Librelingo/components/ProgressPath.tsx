
import React from 'react';
import { Lesson, LessonStatus } from '../types';
import { CheckIcon } from './icons/CheckIcon';
import { LockIcon } from './icons/LockIcon';
import { StarIcon } from './icons/StarIcon';

interface LessonNodeProps {
  lesson: Lesson;
  isLast: boolean;
}

const LessonNode: React.FC<LessonNodeProps> = ({ lesson, isLast }) => {
  const getStatusStyles = () => {
    switch (lesson.status) {
      case LessonStatus.Completed:
        return {
          bgColor: 'bg-green-500',
          textColor: 'text-white',
          borderColor: 'border-green-600',
          icon: <CheckIcon className="w-6 h-6" />,
        };
      case LessonStatus.Current:
        return {
          bgColor: 'bg-sky-500 animate-pulse',
          textColor: 'text-white',
          borderColor: 'border-sky-600',
          icon: <StarIcon className="w-6 h-6" />,
        };
      case LessonStatus.Locked:
      default:
        return {
          bgColor: 'bg-slate-300',
          textColor: 'text-slate-500',
          borderColor: 'border-slate-400',
          icon: <LockIcon className="w-6 h-6" />,
        };
    }
  };

  const { bgColor, textColor, borderColor, icon } = getStatusStyles();

  return (
    <div className="relative z-10">
      <div className="flex items-center w-full">
        {/* Node */}
        <div className={`w-16 h-16 rounded-full flex-shrink-0 flex items-center justify-center ${bgColor} ${textColor} ${borderColor} border-4 shadow-lg`}>
          {icon}
        </div>
        {/* Label */}
        <div className="ml-4 bg-white p-3 rounded-xl shadow-md">
            <h4 className={`font-extrabold text-slate-700 ${lesson.status === LessonStatus.Locked ? 'text-slate-400' : ''}`}>{lesson.title}</h4>
        </div>
      </div>
      {/* Connector line */}
      {!isLast && (
        <div className="absolute top-16 left-8 h-20 w-1 border-l-4 border-slate-300 border-dashed"></div>
      )}
    </div>
  );
};


export const ProgressPath: React.FC = () => {
    const lessons: Lesson[] = [
        { id: 1, title: 'Saludos', status: LessonStatus.Completed },
        { id: 2, title: 'Familia', status: LessonStatus.Completed },
        { id: 3, title: 'En el Café', status: LessonStatus.Current },
        { id: 4, title: 'Viajes', status: LessonStatus.Locked },
        { id: 5, title: 'Pasatiempos', status: LessonStatus.Locked },
        { id: 6, title: 'Futuro', status: LessonStatus.Locked },
    ];

  return (
    <div className="p-4 md:p-8 w-full">
      <div className="relative flex flex-col items-start gap-4">
        {lessons.map((lesson, index) => (
          <LessonNode key={lesson.id} lesson={lesson} isLast={index === lessons.length - 1} />
        ))}
      </div>
    </div>
  );
};
