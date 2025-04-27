export type OrderStatus =
  | 'PENDING_PAYMENT'    // 입금대기
  | 'PAYMENT_CONFIRMED'  // 입금확인
  | 'PREPARING'         // 상품준비중
  | 'SHIPPED'          // 배송중
  | 'COMPLETED'        // 배송완료
  | 'CANCELLED'        // 주문취소;

export interface OrderFormData {
  // 주문자 정보
  name: string;
  phone: string;
  email: string;
  
  // 배송 정보
  shippingName: string;
  address: string;
  addressDetail: string;
  memo?: string;

  // 약관 동의
  termsAgreed: boolean;
}

export interface Order extends OrderFormData {
  orderId: string;           // 주문번호
  productId: string;         // 상품 ID
  orderDate: Date;           // 주문일시
  status: OrderStatus;       // 주문상태
  amount: number;            // 주문금액
  selectedPrice: {           // 선택된 가격 옵션
    description?: string;
    amount: number;
    amount2?: number;
  };
}

export interface BankInfo {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
} 