"use client"

import Image from 'next/image'
import { useState } from 'react'
import { artworks } from '@/data/artworks'

const PAGE_SIZE = 9;

export default function Gallery() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(artworks.length / PAGE_SIZE);
  const pagedArtworks = artworks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <button className="px-4 py-2 border border-ink rounded-full hover:bg-ink hover:text-ivory transition-colors">
              전체
            </button>
            <button className="px-4 py-2 border border-ink rounded-full hover:bg-ink hover:text-ivory transition-colors">
              #위로글
            </button>
            <button className="px-4 py-2 border border-ink rounded-full hover:bg-ink hover:text-ivory transition-colors">
              #일상
            </button>
            <button className="px-4 py-2 border border-ink rounded-full hover:bg-ink hover:text-ivory transition-colors">
              #자연
            </button>
          </div>

          {/* Artwork Grid */}
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
                    <span 
                      key={tag} 
                      className="text-sm px-3 py-1 bg-ink/5 rounded-full text-ink/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
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
        </div>
      </section>
    </main>
  )
} 