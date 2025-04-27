import { Order, OrderFormData } from '@/types/order';
import { Product } from '@/types/product';

/**
 * 주문번호 생성
 * 형식: YYYYMMDD-HHMMSS-XXXX (X: 랜덤 숫자)
 */
export function generateOrderId(): string {
  const now = new Date();
  const date = now.toISOString().slice(2, 10).replace(/-/g, '');
  const time = now.toISOString().slice(11, 19).replace(/:/g, '');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${date}-${time}-${random}`;
}

/**
 * 주문 데이터 생성
 */
export function createOrder(formData: OrderFormData, product: Product, selectedPriceIndex: number): Order {
  return {
    ...formData,
    orderId: generateOrderId(),
    productId: product.id,
    orderDate: new Date(),
    status: 'PENDING_PAYMENT',
    amount: product.prices[selectedPriceIndex].amount,
    selectedPrice: product.prices[selectedPriceIndex],
  };
}

// 주문 데이터를 로컬 스토리지에 저장
export function saveOrder(order: Order): void {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem('orders', JSON.stringify(orders));
}

// 저장된 주문 데이터 조회
export function getOrders(): Order[] {
  const ordersJson = localStorage.getItem('orders');
  if (!ordersJson) return [];
  
  const orders = JSON.parse(ordersJson);
  return orders.map((order: any) => ({
    ...order,
    orderDate: new Date(order.orderDate),
  }));
}

// 주문번호로 주문 조회
export function getOrderById(orderId: string): Order | null {
  const orders = getOrders();
  const order = orders.find(order => order.orderId === orderId);
  return order || null;
} 