export interface Template {
  id: string;
  title: string;
  category: string;
  type: string;
  aspectRatio: '16:9' | '9:16' | '1:1' | '4:3';
  tags: string[];
  thumbnail: string;
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
  {
    id: 'tpl-1',
    title: '와인바 영업시간 안내',
    category: 'business',
    type: 'card-news',
    aspectRatio: '16:9',
    tags: ['비즈니스', '카페', '영업시간'],
    thumbnail: '/src/assets/templates/template-1.jpg',
    isFeatured: true,
  },
  {
    id: 'tpl-2',
    title: '콘텐츠 개발 연구 논문',
    category: 'education',
    type: 'presentation',
    aspectRatio: '16:9',
    tags: ['학술', '연구', '발표'],
    thumbnail: '/src/assets/templates/template-2.jpg',
    isFeatured: true,
  },
  {
    id: 'tpl-3',
    title: '귀여운 일러스트 피드 꾸미기',
    category: 'social',
    type: 'instagram-feed',
    aspectRatio: '9:16',
    tags: ['인스타그램', '피드', '일러스트'],
    thumbnail: '/src/assets/templates/template-3.jpg',
  },
  {
    id: 'tpl-4',
    title: '자기소개 포트폴리오',
    category: 'business',
    type: 'detail-page',
    aspectRatio: '16:9',
    tags: ['포트폴리오', '자기소개', '이력서'],
    thumbnail: '/src/assets/templates/template-4.jpg',
  },
  {
    id: 'tpl-5',
    title: '경주 여행 브이로그',
    category: 'social',
    type: 'youtube-thumbnail',
    aspectRatio: '16:9',
    tags: ['여행', '브이로그', '유튜브'],
    thumbnail: '/src/assets/templates/template-5.jpg',
  },
  {
    id: 'tpl-6',
    title: '모닝 루틴 릴스',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['릴스', '숏폼', '쇼츠', 'shorts', '모닝루틴'],
    thumbnail: '/src/assets/templates/template-6.jpg',
    isNew: true,
  },
  {
    id: 'tpl-7',
    title: '속보 뉴스 숏츠',
    category: 'social',
    type: 'youtube-shorts',
    aspectRatio: '9:16',
    tags: ['뉴스', '숏폼', '쇼츠', 'shorts', '속보'],
    thumbnail: '/src/assets/templates/template-7.jpg',
    isNew: true,
  },
  {
    id: 'tpl-8',
    title: 'OOTD 패션 릴스',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['패션', 'OOTD', '릴스', '숏폼', 'shorts'],
    thumbnail: '/src/assets/templates/template-8.jpg',
  },
  {
    id: 'tpl-9',
    title: '카페 스토리 템플릿',
    category: 'social',
    type: 'instagram-story',
    aspectRatio: '9:16',
    tags: ['카페', '커피', '인스타그램', '스토리'],
    thumbnail: '/src/assets/templates/template-9.jpg',
  },
  {
    id: 'tpl-10',
    title: '굿바이브 챌린지',
    category: 'social',
    type: 'tiktok',
    aspectRatio: '9:16',
    tags: ['틱톡', '챌린지', '숏폼', '쇼츠', 'shorts'],
    thumbnail: '/src/assets/templates/template-10.jpg',
    isNew: true,
  },
  {
    id: 'tpl-11',
    title: '레시피 요리 영상',
    category: 'social',
    type: 'instagram-reels',
    aspectRatio: '9:16',
    tags: ['요리', '레시피', '릴스', '숏폼'],
    thumbnail: '/src/assets/templates/template-11.jpg',
  },
  {
    id: 'tpl-12',
    title: '블랙프라이데이 세일',
    category: 'business',
    type: 'youtube-shorts',
    aspectRatio: '9:16',
    tags: ['세일', '할인', '쇼핑', '숏폼', 'shorts'],
    thumbnail: '/src/assets/templates/template-12.jpg',
  },
];

export const relatedKeywords: Record<string, string[]> = {
  '숏폼': ['숏폼', '쇼츠', 'shorts', '단축', '릴스'],
  '릴스': ['릴스', '인스타그램', '쇼츠', '숏폼', 'shorts'],
  '쇼츠': ['쇼츠', 'shorts', '숏폼', '유튜브', '단축'],
  'shorts': ['shorts', '쇼츠', '숏폼', '릴스', '단축'],
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
