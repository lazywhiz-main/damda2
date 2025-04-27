'use client';

import { useParams } from 'next/navigation';
import { products } from '@/data/products';
import { OrderFormData } from '@/types/order';
import { BANK_INFO } from '@/constants/bank';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import Link from 'next/link';
import { createOrder, saveOrder } from '@/utils/order';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@/components/Button';

export default function OrderPage() {
  const params = useParams();
  const router = useRouter();
  const id = typeof params?.id === 'string' ? params.id : '';
  const product = products.find(p => p.id === id);

  const { register, handleSubmit, formState: { errors } } = useForm<OrderFormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: OrderFormData) => {
    if (!product) return;
    setIsSubmitting(true);
    try {
      // 주문 생성 및 저장
      const order = createOrder(data, product, 0);
      saveOrder(order);
      // 이메일 발송을 서버 API로 요청
      await fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      // 주문 완료 페이지로 이동
      router.push(`/shop/order/complete/${order.orderId}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-serif mb-8">주문하기</h1>
          
          {/* 상품 정보 */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <div className="flex gap-6">
              <div className="relative w-24 h-24 bg-ink/5 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-serif mb-2">{product.name}</h2>
                <p className="text-ink/60 mb-2">{product.title}</p>
                <p className="font-medium">
                  {formatPrice(product.prices[0].amount)}원
                  {product.prices[0].description && ` (${product.prices[0].description})`}
                </p>
              </div>
            </div>
          </div>

          {/* 주문 폼 */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* 주문자 정보 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-6">주문자 정보</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">이름</label>
                  <input
                    type="text"
                    {...register('name', { required: '이름을 입력해주세요' })}
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-2">휴대폰 번호</label>
                  <input
                    type="tel"
                    placeholder="01012345678"
                    {...register('phone', {
                      required: '휴대폰 번호를 입력해주세요',
                      pattern: {
                        value: /^01[016789][0-9]{7,8}$/,
                        message: '유효한 휴대폰 번호를 입력해주세요',
                      },
                    })}
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-2">이메일</label>
                  <input
                    type="email"
                    {...register('email', { required: '이메일을 입력해주세요' })}
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* 배송 정보 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-6">배송 정보</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">수령인</label>
                  <input
                    type="text"
                    {...register('shippingName', { required: '수령인을 입력해주세요' })}
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                  />
                  {errors.shippingName && (
                    <p className="text-red-500 text-sm mt-1">{errors.shippingName.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-2">주소</label>
                  <input
                    type="text"
                    {...register('address', { required: '주소를 입력해주세요' })}
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-2">상세주소</label>
                  <input
                    type="text"
                    {...register('addressDetail', { required: '상세주소를 입력해주세요' })}
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                  />
                  {errors.addressDetail && (
                    <p className="text-red-500 text-sm mt-1">{errors.addressDetail.message}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm mb-2">배송 요청사항</label>
                  <textarea
                    {...register('memo')}
                    className="w-full px-4 py-2 rounded-lg border border-ink/20 focus:outline-none focus:border-ink"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* 계좌 정보 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-medium mb-6">입금 계좌 정보</h2>
              <div className="space-y-2 text-ink/80">
                <p>예금주: {BANK_INFO.accountHolder}</p>
                <p>은행: {BANK_INFO.bankName}</p>
                <p>계좌번호: {BANK_INFO.accountNumber}</p>
              </div>
            </div>

            {/* 약관 동의 */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  {...register('termsAgreed', { required: '주문 약관에 동의해주세요' })}
                  className="mt-1"
                />
                <span className="text-sm">
                  주문 내용을 확인하였으며, 개인정보 수집 및 이용에 동의합니다.
                </span>
              </label>
              {errors.termsAgreed && (
                <p className="text-red-500 text-sm mt-1">{errors.termsAgreed.message}</p>
              )}
            </div>

            {/* 주문하기 버튼 */}
            <div className="flex gap-4">
              <Button
                variant="secondary"
                onClick={() => router.push(`/shop/${product.id}`)}
              >
                돌아가기
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? '주문 처리 중...' : '주문하기'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 