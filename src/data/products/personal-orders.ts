import { Product } from '@/types/product';

export const personalOrders: Product[] = [
  {
    id: 'calli-poster',
    category: '개인 맞춤 주문',
    name: '가훈 캘리 주문제작',
    title: '당신의 가치를 담은 문장을 선물하세요',
    description: '고객님이 원하시는 문구를 캘리그라피로 제작해드립니다. 특별한 가훈, 좋아하는 문구를 아름답게 담아보세요.',
    prices: [
      {
        amount: 50000,
        description: 'A4 사이즈',
      },
      {
        amount: 70000,
        description: 'A3 사이즈',
      },
      {
        amount: 100000,
        description: 'A2 사이즈',
      }
    ],
    imageUrl: '/images/products/calli-poster.jpg',
    images: [
      {
        url: '/images/products/calli-poster.jpg',
        alt: '캘리그라피 액자 메인 이미지',
        isMain: true
      }
    ],
    detailContent: `
# 나만의 특별한 가훈 만들기

소중한 가치와 의미를 담은 문구를 아름다운 캘리그라피로 제작해드립니다.

## 제작 과정
1. 원하시는 문구 전달
2. 스타일 상담 및 디자인 방향 결정
3. 시안 제작 및 수정
4. 최종 작품 제작 및 발송

## 옵션 안내
### 사이즈 선택
- A4 (210 x 297mm)
- A3 (297 x 420mm)
- A2 (420 x 594mm)

### 추가 옵션
- 액자 포함 여부
- 종이 색상 선택
- 잉크 색상 선택

## 주문 시 필요한 정보
1. 원하시는 문구
2. 선호하는 스타일 (예시 이미지 참고)
3. 특별히 강조하고 싶은 부분
4. 사용 용도 (인테리어, 선물 등)

## 제작 기간
- 기본 제작 기간: 7-10일
- 급행 제작 문의 가능
    `,
    buttonType: 'inquiry',
    specifications: {
      '제작 기간': '7-10일 소요',
      '수정 횟수': '2회 무료',
      '용지': '고급 한지 또는 아트지',
      '제작 방식': '수작업 캘리그라피'
    }
  }
]; 