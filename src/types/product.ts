export type ProductCategory = '완성형 소품' | '개인 맞춤 주문' | '법인・단체 맞춤 주문';

export type ProductPrice = {
  amount: number;
  amount2?: number;
  description?: string;
};

export type ProductImage = {
  url: string;
  alt: string;
  isMain?: boolean;
};

export type Product = {
  id: string;
  category: string;
  name: string;
  title: string;
  description: string;
  prices: ProductPrice[];
  imageUrl: string;
  images: ProductImage[];
  detailContent: string; // 마크다운 형식의 상세 설명
  buttonType: 'buy' | 'inquiry';
  specifications?: {
    [key: string]: string;
  };
};

export const CATEGORY_EMOJI: Record<ProductCategory, string> = {
  '완성형 소품': '🎨',
  '개인 맞춤 주문': '✍️',
  '법인・단체 맞춤 주문': '🏢'
}; 