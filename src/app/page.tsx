import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[100vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/main-hero.png"
            alt="담다 메인 이미지"
            fill
            priority
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-hero-home/80" />
        </div>
        <div className="relative z-10 text-center">
          <div className="inline-block bg-ivory/30 backdrop-blur-md px-8 py-6 rounded-xl shadow-2xl">
            <h1 className="handwriting text-3xl sm:text-4xl md:text-6xl text-ink drop-shadow-xl">
              마음을 글씨에 담습니다
            </h1>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-serif mb-8 md:mb-12 text-center">대표 작품 미리보기</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
            {[
              "/images/artworks/artwork-001-comfort-letter.jpeg",
              "/images/artworks/artwork-002-spring-poetry.jpeg",
              "/images/artworks/artwork-003-daily-happiness.jpeg"
            ].map((src, i) => (
              <div 
                key={i} 
                className="relative aspect-square bg-primary/5 rounded-lg overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`대표 작품 ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/gallery" className="inline-block border border-primary px-6 py-3 touch-button hover:bg-primary hover:text-light transition-colors rounded-lg">
              전체 작품 보러가기
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="section bg-primary/5">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-6">브랜드/작가 소개</h2>
            <p className="mb-8 text-ink/80">서예와 예쁜 글씨로 마음을 담아 전합니다.<br/>담다의 이야기를 만나보세요.</p>
            <Link 
              href="/about" 
              className="inline-block border border-primary px-6 py-3 touch-button hover:bg-primary hover:text-light transition-colors rounded-lg"
            >
              자세히 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Service/Product Preview Section */}
      <section className="section">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-serif mb-8 md:mb-12 text-center">주요 서비스/상품</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8">
            <div className="bg-ivory rounded-xl shadow p-6 text-center flex flex-col items-center">
              <span className="text-3xl mb-2">🖌️</span>
              <h3 className="font-serif text-xl mb-2">맞춤 캘리그라피</h3>
              <p className="text-ink/70 mb-2 text-sm">원하는 문구, 스타일로 세상에 하나뿐인 작품 제작</p>
              <Link href="/shop" className="text-primary underline text-sm">스토어 보기</Link>
            </div>
            <div className="bg-ivory rounded-xl shadow p-6 text-center flex flex-col items-center">
              <span className="text-3xl mb-2">🎁</span>
              <h3 className="font-serif text-xl mb-2">단체/기업 주문</h3>
              <p className="text-ink/70 mb-2 text-sm">행사, 기념품, 단체선물 등 대량 맞춤 제작 가능</p>
              <Link href="/contact" className="text-primary underline text-sm">문의하기</Link>
            </div>
            <div className="bg-ivory rounded-xl shadow p-6 text-center flex flex-col items-center">
              <span className="text-3xl mb-2">💌</span>
              <h3 className="font-serif text-xl mb-2">디지털 캘리/포스터</h3>
              <p className="text-ink/70 mb-2 text-sm">SNS, 인쇄용 등 다양한 용도의 디지털 파일 제공</p>
              <Link href="/shop" className="text-primary underline text-sm">스토어 보기</Link>
            </div>
          </div>
          <div className="text-center">
            <Link href="/shop" className="inline-block border border-primary px-6 py-3 touch-button hover:bg-primary hover:text-light transition-colors rounded-lg">
              전체 상품/서비스 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Contact/Social Preview Section */}
      <section className="section bg-primary/5">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-serif mb-8 md:mb-12 text-center">문의 및 소셜</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
            <Link href="/contact" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow border border-primary/20 hover:bg-primary/10">
              <span className="text-2xl">📩</span> <span className="font-serif">문의하기</span>
            </Link>
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow border border-primary/20 hover:bg-primary/10">
              <span className="text-2xl">📸</span> <span className="font-serif">Instagram</span>
            </a>
            <a href="https://pf.kakao.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow border border-primary/20 hover:bg-primary/10">
              <span className="text-2xl">💬</span> <span className="font-serif">카카오톡 채널</span>
            </a>
          </div>
          <div className="text-center text-ink/60 text-sm">언제든 문의/상담 환영합니다!</div>
        </div>
      </section>

      {/* Today's Quote Teaser */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-serif mb-6">하루 한 문장</h2>
            <p className="mb-8 text-secondary">매일 새로운 문장으로 마음을 전합니다.</p>
            <Link 
              href="/today" 
              className="inline-block border border-primary px-6 py-3 touch-button hover:bg-primary hover:text-light transition-colors"
            >
              오늘의 문장 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Instagram Feed */}
      <section className="section bg-primary text-light">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-serif mb-8 md:mb-12 text-center">Instagram</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="relative aspect-square bg-light/10 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-light/20 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
