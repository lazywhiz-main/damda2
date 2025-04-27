import { Product } from '@/types/product';

export const completedItems: Product[] = [
  {
    id: 'postcard-comfort',
    category: '완성형 소품',
    name: '엽서 세트 - 위로편',
    title: '당신을 위로하는 순간을 선물하세요',
    description: '일상에 지친 마음을 위로하는 메시지를 담은 엽서 세트입니다. 소중한 사람에게 마음을 전하세요.',
    prices: [
      {
        amount: 12000,
        description: '엽서 세트 (5장)',
      }
    ],
    imageUrl: '/images/products/postcard-comfort.jpg',
    images: [
      {
        url: '/images/products/postcard-comfort.jpg',
        alt: '위로 엽서 세트 메인 이미지',
        isMain: true
      },
      {
        url: '/images/products/postcard-comfort-detail.jpg',
        alt: '위로 엽서 세트 상세 이미지'
      }
    ],
    detailContent: `
# 위로가 필요한 순간을 위한 엽서 세트

마음을 전하는 가장 아름다운 방법, 손글씨 엽서로 당신의 마음을 전해보세요.

## 제품 구성
- 디자인 엽서 5종
- 고급 봉투 5매
- 보관용 케이스 1개

## 엽서 메시지
1. "괜찮아요, 잘 하고 있어요"
2. "당신의 하루를 응원합니다"
3. "쉬어가도 좋아요"
4. "함께라서 행복해요"
5. "당신은 충분히 잘하고 있어요"

## 사용 방법
1. 마음을 담아 메시지를 작성합니다
2. 동봉된 봉투에 넣어 소중한 사람에게 전달합니다
3. 받는 사람의 미소를 상상해보세요

## 보관 방법
- 직사광선을 피해 보관해주세요
- 습기가 많은 곳은 피해주세요
- 동봉된 케이스에 보관하시면 오랫동안 깨끗하게 사용하실 수 있습니다
    `,
    buttonType: 'buy',
    specifications: {
      '크기': '100 x 148mm',
      '용지': '고급 아트지 250g',
      '구성품': '엽서 5장, 봉투 5매, 보관 케이스',
      '제조국': '대한민국'
    }
  },
  {
    id: 'postcard-seasons',
    category: '완성형 소품',
    name: '엽서 세트 - 사계절',
    title: '계절의 변화를 담은 감성적인 메시지',
    description: '봄, 여름, 가을, 겨울의 풍경과 감성을 담은 엽서 세트입니다.',
    prices: [
      {
        amount: 12000,
        description: '엽서 세트 (4장)',
      }
    ],
    imageUrl: '/images/products/postcard-seasons.jpg',
    images: [
      {
        url: '/images/products/postcard-seasons.jpg',
        alt: '사계절 엽서 세트 메인 이미지',
        isMain: true
      }
    ],
    detailContent: `
# 사계절의 아름다움을 담은 엽서 세트

자연의 변화를 감성적인 글씨체로 담아낸 특별한 엽서 세트입니다.

## 제품 구성
- 계절별 디자인 엽서 4종
- 고급 봉투 4매
- 보관용 케이스 1개

## 계절별 테마
- 봄: "새로운 시작의 설렘"
- 여름: "청량한 순간의 기억"
- 가을: "감사함의 계절"
- 겨울: "고요한 겨울의 선물"

## 특징
- 계절감이 돋보이는 파스텔 톤 디자인
- 고급스러운 필기체로 작성된 메시지
- 선물하기 좋은 패키지 구성
    `,
    buttonType: 'buy',
    specifications: {
      '크기': '100 x 148mm',
      '용지': '고급 아트지 250g',
      '구성품': '엽서 4장, 봉투 4매, 보관 케이스',
      '제조국': '대한민국'
    }
  }
]; 