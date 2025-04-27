'use client';

import { useParams } from 'next/navigation';
import { getOrderById } from '@/utils/order';
import { products } from '@/data/products';
import { BANK_INFO } from '@/constants/bank';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Order } from '@/types/order';
import Image from 'next/image';

export default function OrderCompletePage() {
  const params = useParams();
  const orderId = typeof params?.id === 'string' ? params.id : '';
  const [order, setOrder] = useState<Order | null>(null);
  const product = order ? products.find(p => p.id === order.productId) : null;

  useEffect(() => {
    const orderData = getOrderById(orderId);
    setOrder(orderData);
  }, [orderId]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ko-KR').format(price);
  };

  if (!order || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">주문 정보를 찾을 수 없습니다</h1>
          <Link href="/shop" className="text-ink underline">
            스토어로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="pt-20">
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-serif mb-4">주문이 완료되었습니다</h1>
            <p className="text-ink/60">아래 계좌로 입금해 주시면 주문이 확정됩니다.</p>
          </div>

          {/* 주문 정보 */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <div className="space-y-6">
              {/* 주문 번호 */}
              <div className="pb-6 border-b border-ink/10">
                <p className="text-sm text-ink/60 mb-1">주문번호</p>
                <p className="font-medium">{order.orderId}</p>
              </div>

              {/* 상품 정보 */}
              <div className="pb-6 border-b border-ink/10">
                <p className="text-sm text-ink/60 mb-4">주문 상품</p>
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
                      {formatPrice(order.amount)}원
                      {order.selectedPrice.description && ` (${order.selectedPrice.description})`}
                    </p>
                  </div>
                </div>
              </div>

              {/* 배송 정보 */}
              <div className="pb-6 border-b border-ink/10">
                <p className="text-sm text-ink/60 mb-4">배송 정보</p>
                <div className="space-y-2">
                  <p>수령인: {order.shippingName}</p>
                  <p>주소: {order.address} {order.addressDetail}</p>
                  {order.memo && <p>요청사항: {order.memo}</p>}
                </div>
              </div>

              {/* 입금 정보 */}
              <div>
                <p className="text-sm text-ink/60 mb-4">입금 정보</p>
                <div className="space-y-2">
                  <p>입금자명: {order.name}</p>
                  <p>입금액: {formatPrice(order.amount)}원</p>
                  <div className="mt-4 p-4 bg-ink/5 rounded-lg">
                    <p className="font-medium mb-2">입금 계좌</p>
                    <p>{BANK_INFO.bankName} {BANK_INFO.accountNumber}</p>
                    <p>예금주: {BANK_INFO.accountHolder}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 안내 메시지 */}
          <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
            <h2 className="font-medium mb-4">주문 안내</h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-ink/80">
              <li>24시간 이내에 입금해 주시기 바랍니다.</li>
              <li>입금자명이 다를 경우 입금 확인이 지연될 수 있습니다.</li>
              <li>주문 관련 안내는 입력하신 이메일로 발송됩니다.</li>
            </ul>
          </div>

          {/* 버튼 */}
          <div className="flex justify-center">
            <Link
              href="/shop"
              className="px-8 py-4 bg-ink text-ivory rounded-lg hover:bg-ink/90 transition-colors"
            >
              쇼핑 계속하기
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 