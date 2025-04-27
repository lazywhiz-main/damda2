// 작품 태그 정의
export const ARTWORK_TAGS = {
  // 감정/마음
  COMFORT: '위로',
  HEALING: '힐링',
  LOVE: '사랑',
  EMOTION: '감성',
  MEDITATION: '명상',
  GRATITUDE: '감사',
  
  // 일상/생활
  DAILY: '일상',
  MEMORY: '추억',
  HAPPINESS: '행복',
  DREAM: '꿈',
  
  // 자연/환경
  NATURE: '자연',
  SEASON: '계절',
  SPRING: '봄',
  SUMMER: '여름',
  AUTUMN: '가을',
  WINTER: '겨울',
  
  // 관계/소통
  FRIENDSHIP: '우정',
  FAMILY: '가족',
  LETTER: '편지',
  MESSAGE: '메시지',
  
  // 문학/예술
  POETRY: '시',
  QUOTE: '명언',
  WISDOM: '지혜',
  PROVERB: '속담',
  
  // 이벤트/기념
  CELEBRATION: '축하',
  BIRTHDAY: '생일',
  WEDDING: '웨딩',
  ANNIVERSARY: '기념일',
  
  // 기타
  MODERN: '모던',
  MINIMAL: '미니멀',
  TRADITIONAL: '전통',
  EXPERIMENTAL: '실험적',
} as const;

// 태그 타입 정의
export type ArtworkTag = typeof ARTWORK_TAGS[keyof typeof ARTWORK_TAGS];

// 모든 태그 값 배열
export const ALL_TAGS = Object.values(ARTWORK_TAGS);

// 태그 카테고리 (UI 구성용)
export const TAG_CATEGORIES = {
  EMOTION: ['위로', '힐링', '사랑', '감성', '명상', '감사'],
  DAILY: ['일상', '추억', '행복', '꿈'],
  NATURE: ['자연', '계절', '봄', '여름', '가을', '겨울'],
  RELATIONSHIP: ['우정', '가족', '편지', '메시지'],
  LITERATURE: ['시', '명언', '지혜', '속담'],
  EVENT: ['축하', '생일', '웨딩', '기념일'],
  STYLE: ['모던', '미니멀', '전통', '실험적'],
} as const; 