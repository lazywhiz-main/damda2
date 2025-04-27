'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import { ProductCategory, CATEGORY_EMOJI } from '@/types/product';
import ProductCard from '@/components/ProductCard';

const categories: ProductCategory[] = ['완성형 소품', '개인 맞춤 주문', '법인・단체 맞춤 주문'];

const categoryDescriptions: Record<ProductCategory, string> = {
  '완성형 소품': '따뜻한 감성이 담긴 완성된 작품들을 만나보세요',
  '개인 맞춤 주문': '당신만을 위한 특별한 손글씨 작품을 제작해드립니다',
  '법인・단체 맞춤 주문': '기업과 단체의 가치를 손글씨로 표현합니다'
};

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('완성형 소품');

  const filteredProducts = products.filter(product => product.category === selectedCategory);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full hero-store" />
        </div>
        <div className="relative z-10 text-center text-ink">
          <h1 className="handwriting text-4xl sm:text-6xl mb-4">
            담다 스토어
          </h1>
          <p className="text-lg">손글씨로 전하는 마음, 이야기가 되다</p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-6 py-4 rounded-2xl text-center transition-all duration-300
                    ${selectedCategory === category
                      ? 'bg-ink text-ivory shadow-md transform -translate-y-1'
                      : 'bg-ivory hover:bg-ink/5 text-ink'
                    }
                  `}
                >
                  <span className="text-2xl mb-2 block">{CATEGORY_EMOJI[category]}</span>
                  <span className="font-serif">{category}</span>
                </button>
              ))}
            </div>

            <div className="text-center mb-16">
              <p className="text-ink/70">{categoryDescriptions[selectedCategory]}</p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 