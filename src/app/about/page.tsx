import React from 'react';
import Image from 'next/image'

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full hero-about" />
        </div>
        <div className="relative z-10 text-center text-ink">
          <h1 className="handwriting text-4xl sm:text-6xl mb-4">
            작가의 말
          </h1>
          <div className="h-4" />
        </div>
      </section>

      {/* Brand Story Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="prose prose-ink max-w-none space-y-8">
            <p className="text-lg leading-relaxed">
              손글씨를 쓴다는 건, 단순히 글자를 적는 일이 아닙니다.<br />
              그 안엔 하루의 온도, 마음의 결, 살아온 시간이 함께 스며듭니다.
            </p>

            <p className="text-lg leading-relaxed">
              서예를 가르치며 보낸 시간,<br />
              아이들과 마주 앉아 '예쁜 글씨'를 나눈 방과후 교실,<br />
              수묵화와 연필화를 배우며 손끝의 감각을 갈고닦던 시간들—<br />
              그 모든 순간들이 제 글씨 안에 조용히 머물러 있습니다.
            </p>

            <p className="text-lg leading-relaxed">
              저는 글씨가 마음을 담는 그릇이 될 수 있다고 믿습니다.<br />
              한 줄의 문장에 위로를 담고,<br />
              짧은 단어 속에 응원을 담으며,<br />
              살며시 마음에 놓아두는 글씨를 그리고 싶습니다.
            </p>

            <p className="text-lg leading-relaxed">
              그래서 이 브랜드의 이름을<br />
              「담다」 라고 정했습니다.
            </p>

            <p className="text-lg leading-relaxed">
              담담하지만 깊게,<br />
              고요하지만 따뜻하게,<br />
              그저 한 획 한 획, 손끝으로 마음을 담아냅니다.
            </p>

            <p className="text-lg leading-relaxed">
              그리고 누군가의 하루에<br />
              그 마음이 닿을 수 있기를 바랍니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 