'use client';

import { useState } from 'react';
import { quotes } from '@/data/quotes';
import QuoteTimeline from '@/components/QuoteTimeline';

// 모든 태그 추출
const allTags = Array.from(
  new Set(quotes.flatMap(quote => quote.tags || []))
);

export default function Today() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const todayQuote = quotes[0]; // 최신 문장

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full hero-today" />
        </div>
        <div className="relative z-10 text-center text-ink">
          <h1 className="handwriting text-4xl sm:text-6xl mb-4">
            하루 한 문장
          </h1>
          <p className="text-lg">오늘의 마음을 담은 글씨</p>
        </div>
      </section>

      {/* Today's Quote */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[4/3] mb-12 bg-ink/5 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="handwriting text-3xl sm:text-4xl md:text-5xl text-ink/80 px-8 text-center">
                  {todayQuote.text}
                </p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-ink/80">- {todayQuote.author}</p>
              <div className="mt-4 flex gap-2 justify-center">
                {todayQuote.tags?.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-ink/5 rounded-full text-sm text-ink/60">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section bg-ivory/50">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-serif mb-6">지난 문장들</h2>
              <p className="text-ink/60 mb-8">
                시간의 흐름 속에 담긴 마음들을 만나보세요
              </p>
              {/* 태그 필터 */}
              <div className="flex flex-wrap gap-2 justify-center">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`
                      px-3 py-1 rounded-full text-sm transition-colors
                      ${selectedTags.includes(tag)
                        ? 'bg-ink text-ivory'
                        : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
                      }
                    `}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            <QuoteTimeline
              quotes={quotes.slice(1)} // 오늘의 문장 제외
              selectedTags={selectedTags}
            />
          </div>
        </div>
      </section>
    </main>
  );
} 