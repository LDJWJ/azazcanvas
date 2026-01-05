import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { trackPageView, trackPageLeave, trackClick } from '@/lib/tracking';
import { 
  Youtube, 
  Instagram, 
  Music2, 
  Compass,
  Presentation,
  Newspaper,
  FileText,
  Monitor,
  CreditCard,
  FileImage,
  Smile
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Youtube,
  Instagram,
  Music2,
  Compass,
  Presentation,
  Newspaper,
  FileText,
  Monitor,
  CreditCard,
  FileImage,
  Smile,
};

const socialCategories = [
  { id: 'youtube', name: '유튜브', icon: 'Youtube', keywords: ['유튜브', '썸네일', '쇼츠'] },
  { id: 'instagram', name: '인스타그램', icon: 'Instagram', keywords: ['인스타그램', '릴스', '피드', '스토리'] },
  { id: 'tiktok', name: '틱톡', icon: 'Music2', keywords: ['틱톡', '숏폼'] },
  { id: 'naver', name: '네이버 클립', icon: 'Compass', keywords: ['네이버', '클립'] },
];

const businessCategories = [
  { id: 'presentation', name: '프레젠테이션', icon: 'Presentation' },
  { id: 'card-news', name: '카드뉴스', icon: 'Newspaper' },
  { id: 'document', name: '문서 서식', icon: 'FileText' },
  { id: 'detail-page', name: '상세페이지', icon: 'Monitor' },
  { id: 'logo', name: '로고', icon: 'Smile' },
];

const printCategories = [
  { id: 'business-card', name: '명함', icon: 'CreditCard' },
  { id: 'poster', name: '포스터', icon: 'FileImage' },
];

const Category = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('category');
    return () => trackPageLeave('category');
  }, []);

  const handleCategoryClick = (name: string) => {
    trackClick(`category_${name}`);
    navigate(`/search?q=${encodeURIComponent(name)}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="container flex h-14 items-center justify-center">
          <h1 className="text-lg font-bold">카테고리</h1>
        </div>
      </header>

      <main className="container py-6">
        {/* 소셜 미디어 */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-foreground">소셜 미디어</h2>
          <div className="grid grid-cols-2 gap-3">
            {socialCategories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary"
                >
                  {Icon && <Icon className="h-6 w-6 text-primary" />}
                  <span className="font-medium text-foreground">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 교육·비즈니스 */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-bold text-foreground">교육·비즈니스</h2>
          <div className="grid grid-cols-2 gap-3">
            {businessCategories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary"
                >
                  {Icon && <Icon className="h-6 w-6 text-primary" />}
                  <span className="font-medium text-foreground">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 인쇄 */}
        <section>
          <h2 className="mb-4 text-lg font-bold text-foreground">인쇄</h2>
          <div className="grid grid-cols-2 gap-3">
            {printCategories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary"
                >
                  {Icon && <Icon className="h-6 w-6 text-primary" />}
                  <span className="font-medium text-foreground">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Category;
