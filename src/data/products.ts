import { Product } from '@/types/product';
import { completedItems } from './products/completed-items';
import { personalOrders } from './products/personal-orders';
import { corporateOrders } from './products/corporate-orders';

export const products: Product[] = [
  ...completedItems,
  ...personalOrders,
  ...corporateOrders,
];