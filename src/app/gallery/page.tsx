"use client"

import Image from 'next/image'
import { useState, useMemo, useEffect } from 'react'
import { artworks } from '@/data/artworks'
import { trackEvents } from '@/utils/analytics'

const PAGE_SIZE = 9;

export default function Gallery() {
  const [selectedTag, setSelectedTag] = useState('전체');
  const [page, setPage] = useState(1);

  // 모든 태그 추출 및 정렬 (빈도수 기준) - 3개 이상인 태그만 표시
  const availableTags = useMemo(() => {
    const tagCounts = artworks.reduce((acc, artwork) => {
      artwork.tags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {} as { [key: string]: number });

    return Object.entries(tagCounts)
      .filter(([, count]) => count >= 3) // 3개 이상인 태그만 필터링
      .sort(([,a], [,b]) => b - a) // 빈도수 내림차순 정렬
      .map(([tag, count]) => ({ tag, count }));
  }, []);

  // 필터링된 작품 목록
  const filteredArtworks = useMemo(() => {
    if (selectedTag === '전체') {
      return artworks;
    }
    return artworks.filter(artwork => artwork.tags.includes(selectedTag));
  }, [selectedTag]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredArtworks.length / PAGE_SIZE);
  const pagedArtworks = filteredArtworks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // 태그 변경 시 페이지를 1로 리셋
  const handleTagChange = (tag: string) => {
    setSelectedTag(tag);
    setPage(1);
    // 태그 필터링 이벤트 추적
    if (tag !== '전체') {
      trackEvents.filterByTag(tag);
    }
  };

  // 페이지 뷰 추적
  useEffect(() => {
    trackEvents.viewGallery();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full hero-gallery" />
        </div>
        <div className="relative z-10 text-center text-ink">
          <h1 className="handwriting text-4xl sm:text-6xl mb-4">
            작품 갤러리
          </h1>
          <p className="text-lg">글씨로 전하는 마음, 작품으로 남기는 순간</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section">
        <div className="container">
          {/* Filter Tags */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            <button 
              onClick={() => handleTagChange('전체')}
              className={`px-4 py-2 rounded-full transition-colors text-sm font-medium ${
                selectedTag === '전체'
                  ? 'bg-ink text-ivory shadow-md'
                  : 'border border-ink hover:bg-ink hover:text-ivory'
              }`}
            >
              전체 ({artworks.length})
            </button>
            {availableTags.map(({ tag, count }) => (
              <button 
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`px-4 py-2 rounded-full transition-colors text-sm font-medium ${
                  selectedTag === tag
                    ? 'bg-ink text-ivory shadow-md'
                    : 'border border-ink hover:bg-ink hover:text-ivory'
                }`}
              >
                #{tag} ({count})
              </button>
            ))}
          </div>

          {/* 결과 카운트 표시 */}
          <div className="text-center mb-8 text-ink/70">
            {selectedTag === '전체' 
              ? `총 ${filteredArtworks.length}개의 작품`
              : `'${selectedTag}' 태그: ${filteredArtworks.length}개의 작품`
            }
          </div>

          {/* Artwork Grid */}
          {pagedArtworks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pagedArtworks.map((artwork) => (
                <div key={artwork.id} className="group">
                  <div className="relative aspect-square mb-4 bg-ink/5 rounded-lg overflow-hidden">
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-serif mb-2">{artwork.title}</h3>
                  {artwork.description && (
                    <p className="text-ink/70 mb-3 text-sm">{artwork.description}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleTagChange(tag)}
                        className={`text-sm px-3 py-1 rounded-full transition-colors cursor-pointer ${
                          selectedTag === tag
                            ? 'bg-ink text-ivory'
                            : 'bg-ink/5 text-ink/60 hover:bg-ink/10'
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-ink/50">
              <p className="text-lg">해당 태그의 작품이 없습니다.</p>
              <button 
                onClick={() => handleTagChange('전체')}
                className="mt-4 px-6 py-2 border border-ink rounded-full hover:bg-ink hover:text-ivory transition-colors"
              >
                전체 작품 보기
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              <button
                className="px-3 py-1 rounded bg-ivory border border-ink/10 text-ink/60 disabled:opacity-40"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-3 py-1 rounded border text-sm font-serif transition-colors duration-150 ${
                    page === i + 1
                      ? 'bg-ink text-ivory border-ink'
                      : 'bg-ivory text-ink border-ink/10 hover:bg-ink/10'
                  }`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded bg-ivory border border-ink/10 text-ink/60 disabled:opacity-40"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
              >
                다음
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
} 