// Google Analytics 유틸리티 함수들

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// 페이지 뷰 추적
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// 이벤트 추적
interface GtagEventProps {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: GtagEventProps) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 사용 예시를 위한 미리 정의된 이벤트들
export const trackEvents = {
  // 작품 갤러리 관련
  viewGallery: () => event({
    action: 'view_gallery',
    category: 'engagement',
    label: 'gallery_page',
  }),

  filterByTag: (tagName: string) => event({
    action: 'filter_by_tag',
    category: 'engagement',
    label: tagName,
  }),

  viewArtwork: (artworkId: string) => event({
    action: 'view_artwork',
    category: 'engagement',
    label: artworkId,
  }),

  // 네비게이션 관련
  navigationClick: (pageName: string) => event({
    action: 'navigation_click',
    category: 'navigation',
    label: pageName,
  }),

  // 문의 관련
  contactFormSubmit: () => event({
    action: 'form_submit',
    category: 'contact',
    label: 'contact_form',
  }),

  // 스토어 관련
  viewProduct: (productId: string) => event({
    action: 'view_product',
    category: 'ecommerce',
    label: productId,
  }),

  addToCart: (productId: string) => event({
    action: 'add_to_cart',
    category: 'ecommerce',
    label: productId,
  }),
}; 