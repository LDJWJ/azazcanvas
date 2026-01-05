import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TemplateCard } from '@/components/TemplateCard';
import { templates } from '@/data/templates';
import { trackClick, trackPageView, trackPageLeave } from '@/lib/tracking';
import { BottomNav } from '@/components/BottomNav';
import { Search, User } from 'lucide-react';

const categoryChips = [
  { id: 'vlog', name: '브이로그' },
  { id: 'ootd', name: 'OOTD/패션' },
  { id: 'food', name: '먹방/레시피' },
  { id: 'beauty', name: '뷰티/메이크업' },
  { id: 'fitness', name: '운동/헬스' },
  { id: 'news', name: '뉴스/정보' },
];

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('main');
    return () => trackPageLeave('main');
  }, []);

  const reelsTemplates = templates.filter(
    (t) =>
      t.aspectRatio === '9:16' ||
      t.tags.some((tag) =>
        ['릴스', '숏폼', '쇼츠', 'shorts'].includes(tag.toLowerCase())
      )
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Compact Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="flex h-14 items-center justify-between px-4">
          <h1 className="text-lg font-bold text-primary">아자아자캔버스</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/search')}
              className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/myinfo')}
              className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              로그인
            </button>
          </div>
        </div>
      </header>

      {/* Reels Templates Section */}
      <section className="py-4">
        <div className="px-4 md:px-5">
          <h2 className="mb-4 text-xl font-bold text-foreground">릴스 템플릿</h2>
          <div className="mb-4 flex flex-wrap gap-2">
            {categoryChips.map((chip) => (
              <button
                key={chip.id}
                onClick={() => {
                  trackClick(`chip_${chip.id}`);
                  navigate(`/search?q=${encodeURIComponent(chip.name)}`);
                }}
                className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {chip.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-x-[14px] gap-y-4 sm:grid-cols-3 lg:grid-cols-4">
            {reelsTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} size="large" />
            ))}
          </div>
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Index;
