export interface Template {
  id: string;
  title: string;
  category: string;
  type: string;
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:3';
  tags: string[];
  thumbnail: string;
  videoUrl?: string;
  isNew?: boolean;
  isFeatured?: boolean;
}

export const templateTypes = [
  { id: 'presentation', name: '프레젠테이션', icon: 'Presentation' },
  { id: 'detail-page', name: '상세페이지', icon: 'FileText' },
  { id: 'card-news', name: '카드뉴스', icon: 'Newspaper' },
  { id: 'video', name: '동영상', icon: 'Video' },
  { id: 'youtube-thumbnail', name: '유튜브 썸네일', icon: 'Youtube' },
  { id: 'social-square', name: '소셜 미디어 정사각형', icon: 'Square' },
  { id: 'web-poster', name: '웹 포스터 가로형', icon: 'Image' },
];

export const templateCategories = {
  education: {
    name: '교육·비즈니스',
    items: [
      { id: 'presentation', name: '프레젠테이션', icon: 'Presentation' },
      { id: 'card-news', name: '카드뉴스', icon: 'Newspaper' },
      { id: 'document', name: '문서 서식', icon: 'FileText' },
      { id: 'detail-page', name: '상세페이지', icon: 'Monitor' },
      { id: 'logo', name: '로고', icon: 'Smile' },
    ],
  },
  social: {
    name: '소셜 미디어',
    items: [
      { id: 'youtube-thumbnail', name: '유튜브 썸네일', icon: 'Youtube' },
      { id: 'youtube-video', name: '유튜브 동영상', icon: 'Play' },
      { id: 'instagram-feed', name: '인스타그램 피드', icon: 'Instagram' },
      { id: 'instagram-reels', name: '인스타그램 릴스', icon: 'Film' },
    ],
  },
  print: {
    name: '인쇄',
    items: [
      { id: 'business-card', name: '명함', icon: 'CreditCard' },
      { id: 'poster', name: '포스터', icon: 'FileImage' },
      { id: 'flyer', name: '전단지', icon: 'Files' },
      { id: 'postcard', name: '엽서카드', icon: 'Mail' },
      { id: 'banner', name: '현수막', icon: 'Flag' },
      { id: 'vinyl-banner', name: '배너', icon: 'Rows' },
    ],
  },
};

export const templates: Template[] = [
  // 브이로그 (5개)
  {
    id: 'vlog-1',
    title: '3초 오프닝 브이로그',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['브이로그', '릴스', '숏폼', 'shorts', '일상', '카페'],
    thumbnail: '/src/assets/templates/vlog-1.jpg',
    isNew: true,
  },
  {
    id: 'vlog-2',
    title: '하루 루틴 감성컷',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['브이로그', '릴스', '숏폼', 'shorts', '모닝루틴', '일상'],
    thumbnail: '/src/assets/templates/vlog-2.jpg',
    isFeatured: true,
  },
  {
    id: 'vlog-3',
    title: '주말 기록 무드필름',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['브이로그', '릴스', '숏폼', 'shorts', '여행', '주말'],
    thumbnail: '/src/assets/templates/vlog-3.jpg',
  },
  {
    id: 'vlog-4',
    title: '카페 투어 브이로그',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['브이로그', '릴스', '숏폼', 'shorts', '카페', '커피'],
    thumbnail: '/src/assets/templates/vlog-4.jpg',
    isNew: true,
  },
  {
    id: 'vlog-5',
    title: '출근길 데일리 브이로그',
    category: 'social',
    type: 'youtube-shorts',
    aspectRatio: '9:16',
    tags: ['브이로그', '릴스', '숏폼', 'shorts', '출근', '일상'],
    thumbnail: '/src/assets/templates/vlog-5.jpg',
  },

  // OOTD/패션 (5개)
  {
    id: 'fashion-1',
    title: '오늘의룩 5벌 룩북',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['OOTD', '패션', 'OOTD/패션', '릴스', '숏폼', 'shorts', '룩북'],
    thumbnail: '/src/assets/templates/fashion-1.jpg',
    isFeatured: true,
  },
  {
    id: 'fashion-2',
    title: '1주일 코디 모음',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['OOTD', '패션', 'OOTD/패션', '릴스', '숏폼', 'shorts', '코디'],
    thumbnail: '/src/assets/templates/fashion-2.jpg',
    isNew: true,
  },
  {
    id: 'fashion-3',
    title: '겨울 아우터 추천',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['OOTD', '패션', 'OOTD/패션', '릴스', '숏폼', 'shorts', '겨울', '아우터'],
    thumbnail: '/src/assets/templates/fashion-3.jpg',
  },
  {
    id: 'fashion-4',
    title: '키작녀 코디',
    category: 'social',
    type: 'youtube-shorts',
    aspectRatio: '9:16',
    tags: ['OOTD', '패션', 'OOTD/패션', '릴스', '숏폼', 'shorts', '키작녀'],
    thumbnail: '/src/assets/templates/fashion-4.jpg',
  },
  {
    id: 'fashion-5',
    title: '무채색 데일리룩',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['OOTD', '패션', 'OOTD/패션', '릴스', '숏폼', 'shorts', '미니멀'],
    thumbnail: '/src/assets/templates/fashion-5.jpg',
  },

  // 먹방/레시피 (5개)
  {
    id: 'food-1',
    title: '10분 레시피 자막형',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['먹방', '레시피', '먹방/레시피', '릴스', '숏폼', 'shorts', '요리'],
    thumbnail: '/src/assets/templates/food-1.jpg',
    isFeatured: true,
  },
  {
    id: 'food-2',
    title: '한끼 루틴 ASMR',
    category: 'social',
    type: 'youtube-shorts',
    aspectRatio: '9:16',
    tags: ['먹방', '레시피', '먹방/레시피', '릴스', '숏폼', 'shorts', 'ASMR'],
    thumbnail: '/src/assets/templates/food-2.jpg',
    isNew: true,
  },
  {
    id: 'food-3',
    title: '냉장고 털기 레시피',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['먹방', '레시피', '먹방/레시피', '릴스', '숏폼', 'shorts', '집밥'],
    thumbnail: '/src/assets/templates/food-3.jpg',
  },
  {
    id: 'food-4',
    title: '디저트 카페 리뷰',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['먹방', '레시피', '먹방/레시피', '릴스', '숏폼', 'shorts', '카페', '디저트'],
    thumbnail: '/src/assets/templates/food-4.jpg',
  },
  {
    id: 'food-5',
    title: '혼밥 브이로그',
    category: 'social',
    type: 'youtube-shorts',
    aspectRatio: '9:16',
    tags: ['먹방', '레시피', '먹방/레시피', '릴스', '숏폼', 'shorts', '혼밥'],
    thumbnail: '/src/assets/templates/food-5.jpg',
  },

  // 뷰티/메이크업 (5개)
  {
    id: 'beauty-1',
    title: '데일리 메이크업 전후',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['뷰티', '메이크업', '뷰티/메이크업', '릴스', '숏폼', 'shorts', '전후'],
    thumbnail: '/src/assets/templates/beauty-1.jpg',
    isFeatured: true,
  },
  {
    id: 'beauty-2',
    title: '3분 퀵 메이크업',
    category: 'social',
    type: 'youtube-shorts',
    aspectRatio: '9:16',
    tags: ['뷰티', '메이크업', '뷰티/메이크업', '릴스', '숏폼', 'shorts', '퀵'],
    thumbnail: '/src/assets/templates/beauty-2.jpg',
    isNew: true,
  },
  {
    id: 'beauty-3',
    title: '립 조합 추천',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['뷰티', '메이크업', '뷰티/메이크업', '릴스', '숏폼', 'shorts', '립스틱'],
    thumbnail: '/src/assets/templates/beauty-3.jpg',
  },
  {
    id: 'beauty-4',
    title: '퍼스널컬러 무드',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['뷰티', '메이크업', '뷰티/메이크업', '릴스', '숏폼', 'shorts', '퍼스널컬러'],
    thumbnail: '/src/assets/templates/beauty-4.jpg',
  },
  {
    id: 'beauty-5',
    title: '스킨케어 루틴',
    category: 'social',
    type: 'youtube-shorts',
    aspectRatio: '9:16',
    tags: ['뷰티', '메이크업', '뷰티/메이크업', '릴스', '숏폼', 'shorts', '스킨케어'],
    thumbnail: '/src/assets/templates/beauty-5.jpg',
  },

  // 운동/헬스 (5개)
  {
    id: 'fitness-1',
    title: '오늘의 운동 루틴',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['운동', '헬스', '운동/헬스', '릴스', '숏폼', 'shorts', '루틴'],
    thumbnail: '/src/assets/templates/fitness-1.jpg',
    isFeatured: true,
  },
  {
    id: 'fitness-2',
    title: '하체 루틴 30초',
    category: 'social',
    type: 'youtube-shorts',
    aspectRatio: '9:16',
    tags: ['운동', '헬스', '운동/헬스', '릴스', '숏폼', 'shorts', '하체'],
    thumbnail: '/src/assets/templates/fitness-2.jpg',
    isNew: true,
  },
  {
    id: 'fitness-3',
    title: '식단+운동 브이로그',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['운동', '헬스', '운동/헬스', '릴스', '숏폼', 'shorts', '식단'],
    thumbnail: '/src/assets/templates/fitness-3.jpg',
  },
  {
    id: 'fitness-4',
    title: '운동 기록 리캡',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['운동', '헬스', '운동/헬스', '릴스', '숏폼', 'shorts', '기록'],
    thumbnail: '/src/assets/templates/fitness-4.jpg',
  },
  {
    id: 'fitness-5',
    title: '홈트 따라하기',
    category: 'social',
    type: 'youtube-shorts',
    aspectRatio: '9:16',
    tags: ['운동', '헬스', '운동/헬스', '릴스', '숏폼', 'shorts', '홈트'],
    thumbnail: '/src/assets/templates/fitness-5.jpg',
  },

  // 뉴스/정보 (5개)
  {
    id: 'news-1',
    title: '오늘의 이슈 3줄 요약',
    category: 'social',
    type: 'youtube-shorts',
    aspectRatio: '9:16',
    tags: ['뉴스', '정보', '뉴스/정보', '릴스', '숏폼', 'shorts', '이슈'],
    thumbnail: '/src/assets/templates/news-1.jpg',
    isFeatured: true,
  },
  {
    id: 'news-2',
    title: '핵심만 브리핑',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['뉴스', '정보', '뉴스/정보', '릴스', '숏폼', 'shorts', '브리핑'],
    thumbnail: '/src/assets/templates/news-2.jpg',
    isNew: true,
  },
  {
    id: 'news-3',
    title: '체크리스트형 정보',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['뉴스', '정보', '뉴스/정보', '릴스', '숏폼', 'shorts', '체크리스트'],
    thumbnail: '/src/assets/templates/news-3.jpg',
  },
  {
    id: 'news-4',
    title: '전/후 비교 정보',
    category: 'social',
    type: 'youtube-shorts',
    aspectRatio: '9:16',
    tags: ['뉴스', '정보', '뉴스/정보', '릴스', '숏폼', 'shorts', '비교'],
    thumbnail: '/src/assets/templates/news-4.jpg',
  },
  {
    id: 'news-5',
    title: '통계 그래프 설명형',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['뉴스', '정보', '뉴스/정보', '릴스', '숏폼', 'shorts', '통계'],
    thumbnail: '/src/assets/templates/news-5.jpg',
  },
];

export const relatedKeywords: Record<string, string[]> = {
  '숏폼': ['숏폼', '쇼츠', 'shorts', '단축', '릴스'],
  '릴스': ['릴스', '인스타그램', '쇼츠', '숏폼', 'shorts'],
  '쇼츠': ['쇼츠', 'shorts', '숏폼', '유튜브', '단축'],
  'shorts': ['shorts', '쇼츠', '숏폼', '릴스', '단축'],
  '브이로그': ['브이로그', '일상', '루틴', '카페', 'vlog'],
  'OOTD/패션': ['OOTD', '패션', '룩북', '코디', '스타일'],
  '먹방/레시피': ['먹방', '레시피', '요리', '음식', 'ASMR'],
  '뷰티/메이크업': ['뷰티', '메이크업', '화장', '스킨케어', '립'],
  '운동/헬스': ['운동', '헬스', '피트니스', '홈트', '루틴'],
  '뉴스/정보': ['뉴스', '정보', '이슈', '브리핑', '통계'],
};

export const searchTemplates = (query: string): Template[] => {
  const lowerQuery = query.toLowerCase();
  const isShortFormSearch = ['숏폼', '릴스', '쇼츠', 'shorts'].some((term) =>
    lowerQuery.includes(term)
  );

  let results = templates.filter((template) => {
    const matchesTitle = template.title.toLowerCase().includes(lowerQuery);
    const matchesTags = template.tags.some((tag) =>
      tag.toLowerCase().includes(lowerQuery)
    );
    const matchesType = template.type.toLowerCase().includes(lowerQuery);
    return matchesTitle || matchesTags || matchesType;
  });

  // Boost 9:16 templates for short-form searches
  if (isShortFormSearch) {
    const shortFormTemplates = results.filter((t) => t.aspectRatio === '9:16');
    const otherTemplates = results.filter((t) => t.aspectRatio !== '9:16');
    
    // Mix in 20-30% of other aspect ratios
    const mixCount = Math.ceil(shortFormTemplates.length * 0.25);
    results = [...shortFormTemplates, ...otherTemplates.slice(0, mixCount)];
  }

  return results;
};
