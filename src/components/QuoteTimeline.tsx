'use client';

import { Quote } from '@/types/quote';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface QuoteTimelineProps {
  quotes: Quote[];
  selectedTags: string[];
}

export default function QuoteTimeline({ quotes, selectedTags }: QuoteTimelineProps) {
  // 날짜별로 그룹화
  const groupedQuotes = quotes.reduce((acc, quote) => {
    const date = format(new Date(quote.date), 'yyyy년 M월', { locale: ko });
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(quote);
    return acc;
  }, {} as Record<string, Quote[]>);

  // 선택된 태그가 있으면 필터링
  const filteredGroups = Object.entries(groupedQuotes).map(([date, quotes]) => ({
    date,
    quotes: selectedTags.length > 0
      ? quotes.filter(quote => 
          quote.tags?.some(tag => selectedTags.includes(tag))
        )
      : quotes
  })).filter(group => group.quotes.length > 0);

  return (
    <div className="space-y-12">
      {filteredGroups.map(({ date, quotes }) => (
        <div key={date}>
          <h3 className="timeline-period">{date}</h3>
          <div className="space-y-6">
            {quotes.map((quote) => (
              <div key={quote.id} className="timeline-quote">
                <p className="text-lg font-serif mb-4">{quote.text}</p>
                <div className="flex flex-wrap gap-2">
                  {quote.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-sm bg-ink/5 text-ink/70 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="mt-4 text-sm text-ink/60">
                  {format(new Date(quote.date), 'PPP', { locale: ko })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 