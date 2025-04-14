import Image from 'next/image'

const artworks = [
  {
    id: 1,
    title: '위로의 글',
    tags: ['#위로글', '#힐링'],
  },
  {
    id: 2,
    title: '일상의 순간',
    tags: ['#일상', '#감성'],
  },
  {
    id: 3,
    title: '자연의 아름다움',
    tags: ['#자연', '#사계절'],
  },
  {
    id: 4,
    title: '사랑의 문장',
    tags: ['#사랑', '#감동'],
  },
  {
    id: 5,
    title: '힐링의 시간',
    tags: ['#힐링', '#명상'],
  },
  {
    id: 6,
    title: '일상의 위로',
    tags: ['#일상', '#위로'],
  },
]

export default function Gallery() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-ink/10" />
        <div className="relative z-10 text-center text-ink">
          <h1 className="handwriting text-4xl sm:text-6xl mb-8">
            작품 갤러리
          </h1>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding">
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
            {artworks.map((artwork) => (
              <div key={artwork.id} className="group">
                <div className="relative aspect-square mb-4 bg-ink/5 rounded-lg overflow-hidden" />
                <h3 className="text-xl font-serif mb-2">{artwork.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {artwork.tags.map((tag) => (
                    <span key={tag} className="text-sm text-ink/60">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 