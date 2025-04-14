import Image from 'next/image'

export default function Today() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-ink/10" />
        <div className="relative z-10 text-center text-ink">
          <h1 className="handwriting text-4xl sm:text-6xl mb-8">
            하루 한 문장
          </h1>
          <p className="text-lg">오늘의 마음을 담은 글씨</p>
        </div>
      </section>

      {/* Today's Quote */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-[4/3] mb-12 bg-ink/5 rounded-lg" />
            <div className="text-center">
              <p className="handwriting text-2xl mb-8">
                "삶이 그대를 속일지라도 슬퍼하거나 노여워하지 말라"
              </p>
              <p className="text-ink/60">- 푸시킨</p>
            </div>
          </div>
        </div>
      </section>

      {/* Previous Quotes */}
      <section className="section-padding bg-ink text-ivory">
        <div className="container">
          <h2 className="text-3xl font-serif mb-12 text-center">지난 문장들</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative aspect-square bg-ivory/10 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
} 