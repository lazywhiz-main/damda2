import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-ink/10" />
        <div className="relative z-10 text-center">
          <h1 className="handwriting text-4xl sm:text-6xl mb-8">
            마음을 글씨에 담습니다
          </h1>
        </div>
      </section>

      {/* Preview Section */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-3xl font-serif mb-12 text-center">작품 미리보기</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative aspect-square bg-ink/5 rounded-lg" />
            <div className="relative aspect-square bg-ink/5 rounded-lg" />
            <div className="relative aspect-square bg-ink/5 rounded-lg" />
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="section-padding bg-ink text-ivory">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6">작가 소개</h2>
            <p className="mb-8">서예와 예쁜 글씨로 마음을 담아 전합니다.</p>
            <Link href="/about" className="inline-block border border-ivory px-6 py-3 hover:bg-ivory hover:text-ink transition-colors">
              더 알아보기
            </Link>
          </div>
        </div>
      </section>

      {/* Today's Quote Teaser */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-6">하루 한 문장</h2>
            <p className="mb-8">매일 새로운 문장으로 마음을 전합니다.</p>
            <Link href="/today" className="inline-block border border-ink px-6 py-3 hover:bg-ink hover:text-ivory transition-colors">
              오늘의 문장 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="section-padding bg-ink text-ivory">
        <div className="container">
          <h2 className="text-3xl font-serif mb-12 text-center">Instagram</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative aspect-square bg-ivory/10 rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
