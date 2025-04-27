'use client';

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Quote } from '@/types/quote';

interface CalendarProps {
  quotes: Quote[];
  onSelectDate: (date: Date) => void;
  selectedDate: Date;
}

export default function Calendar({ quotes, onSelectDate, selectedDate }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // 현재 월의 모든 날짜 가져오기
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // 날짜에 해당하는 quote가 있는지 확인
  const hasQuoteForDate = (date: Date) => {
    return quotes.some(quote => isSameDay(new Date(quote.date), date));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* 월 표시 및 네비게이션 */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-serif">
          {format(currentMonth, 'yyyy년 MM월', { locale: ko })}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
            className="p-2 hover:bg-ink/5 rounded-full transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
            className="p-2 hover:bg-ink/5 rounded-full transition-colors"
          >
            →
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day} className="text-center text-sm py-2">
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => {
          const hasQuote = hasQuoteForDate(day);
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentMonth = isSameMonth(day, currentMonth);

          return (
            <button
              key={day.toString()}
              onClick={() => hasQuote && onSelectDate(day)}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-full
                ${!isCurrentMonth && 'text-ink/30'}
                ${hasQuote && isCurrentMonth && 'hover:bg-ink/5'}
                ${isSelected && 'bg-ink text-ivory hover:bg-ink/90'}
                ${hasQuote && !isSelected && 'font-bold'}
                transition-colors
              `}
              disabled={!hasQuote}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
} 