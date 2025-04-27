import { Product } from '@/types/product';

export const corporateOrders: Product[] = [
  {
    id: 'business-card',
    category: '법인・단체 맞춤 주문',
    name: '명함 디자인 및 제작',
    title: '기업의 가치를 담은 명함을 만들어드립니다',
    description: '브랜드 아이덴티티를 반영한 고급스러운 명함을 디자인하고 제작해드립니다.',
    prices: [
      {
        amount: 200000,
        amount2: 500000,
        description: '디자인 + 인쇄 (100매 기준)',
      }
    ],
    imageUrl: '/images/products/business-card.jpg',
    images: [
      {
        url: '/images/products/business-card.jpg',
        alt: '명함 디자인 메인 이미지',
        isMain: true
      }
    ],
    detailContent: `
# 기업 명함 디자인 및 제작 서비스

브랜드의 가치를 담은 특별한 명함을 제작해드립니다.

## 서비스 내용
1. 브랜드 분석 및 컨셉 설정
2. 디자인 시안 제작 (3안)
3. 수정 및 보완
4. 최종 디자인 확정
5. 인쇄 및 후가공

## 제작 가능 옵션
### 용지 선택
- 일반 용지
- 리넨 용지
- 펄 용지
- 특수 용지

### 후가공
- 형압
- 박
- UV 코팅
- 엠보싱

## 견적 산출 기준
- 수량
- 용지 종류
- 후가공 옵션
- 디자인 난이도

## 진행 과정
1. 초기 상담
2. 견적 산출
3. 디자인 진행
4. 시안 확인 및 수정
5. 인쇄 및 후가공
6. 납품

## 특별 서비스
- 브랜드 매뉴얼 제작
- 패키지 디자인
- 기타 인쇄물 통합 디자인
    `,
    buttonType: 'inquiry',
    specifications: {
      '최소 주문 수량': '100매',
      '제작 기간': '디자인 7-14일 / 인쇄 5-7일',
      '파일 형식': 'AI, PSD',
      '해상도': '300dpi CMYK'
    }
  }
]; 