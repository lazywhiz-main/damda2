'use client';

import { useParams, useRouter } from 'next/navigation';
import { products } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Button from '@/components/Button';

export default function ProductDetail() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : '';
  const product = products.find(p => p.id === id);
  const [selectedPrice, setSelectedPrice] = useState(product?.prices[0]);
  const [selectedImage, setSelectedImage] = useState(
    product?.images?.find(img => img.isMain) || 
    (product?.images && product.images[0]) || 
    { url: product?.imageUrl || '', alt: product?.name || '' }
  );
  const router = useRouter();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">상품을 찾을 수 없습니다</h1>
          <Link href="/shop" className="text-ink underline">
            스토어로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  return (
    <main className="pt-20">
      <div className="container py-12">
        <div className="max-w-6xl mx-auto">
          {/* 상품 기본 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 이미지 섹션 */}
            <div className="space-y-6">
              <div className="relative aspect-[4/3] bg-ink/5 rounded-lg overflow-hidden">
                <Image
                  src={selectedImage.url || product.imageUrl}
                  alt={selectedImage.alt || product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              {/* 이미지 갤러리 */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`relative aspect-square rounded-lg overflow-hidden ${
                        selectedImage === image ? 'ring-2 ring-ink' : ''
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 25vw, 15vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 상품 정보 섹션 */}
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-serif mb-2">{product.name}</h1>
                <p className="text-xl handwriting text-ink/80 mb-4">{product.title}</p>
                <p className="text-ink/60">{product.description}</p>
              </div>

              {/* 제품 스펙 */}
              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <div className="border-t border-b border-ink/10 py-4">
                  <dl className="space-y-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-3 gap-4">
                        <dt className="text-ink/60">{key}</dt>
                        <dd className="col-span-2">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* 가격 옵션 */}
              <div className="space-y-4">
                <h2 className="text-lg font-medium">옵션 선택</h2>
                <div className="space-y-2">
                  {product.prices.map((price, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedPrice(price)}
                      className={`
                        w-full px-4 py-3 rounded-lg text-left transition-colors
                        ${selectedPrice === price
                          ? 'bg-ink text-ivory'
                          : 'bg-ink/5 hover:bg-ink/10 text-ink'
                        }
                      `}
                    >
                      <div className="flex justify-between items-center">
                        <span>{price.description || '기본 옵션'}</span>
                        <span className="font-medium">
                          {price.amount2
                            ? `${formatPrice(price.amount)}~${formatPrice(price.amount2)}원`
                            : `${formatPrice(price.amount)}원`
                          }
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 구매/문의/다른 상품 보기 버튼 */}
              <div className="pt-8 space-y-4">
                {product.buttonType === 'buy' ? (
                  <Button
                    variant="primary"
                    onClick={() => router.push(`/shop/buy/${product.id}`)}
                  >
                    구매하기
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={() => router.push(`/contact?product=${product.id}`)}
                  >
                    문의하기
                  </Button>
                )}
                <Button
                  variant="secondary"
                  onClick={() => router.push('/shop')}
                >
                  다른 상품 보기
                </Button>
              </div>
            </div>
          </div>

          {/* 상세 설명 섹션 */}
          <div className="mt-24">
            <h2 className="text-2xl font-serif mb-8">상품 상세 정보</h2>
            <div className="prose prose-ink max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {product.detailContent || '상세 정보는 준비 중입니다.'}
              </ReactMarkdown>
            </div>
          </div>

          {/* 관련 상품 섹션 */}
          <div className="mt-24">
            <h2 className="text-2xl font-serif mb-8">관련 상품</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 3)
                .map(relatedProduct => (
                  <Link
                    key={relatedProduct.id}
                    href={`/shop/${relatedProduct.id}`}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] bg-ink/5 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={relatedProduct.imageUrl}
                        alt={relatedProduct.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="font-serif text-lg mb-1">{relatedProduct.name}</h3>
                    <p className="text-ink/60">{relatedProduct.title}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 