import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '@/components/BottomNav';
import { trackPageView, trackPageLeave } from '@/lib/tracking';
import { User, Heart, Clock, Settings, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MyInfo = () => {
  const navigate = useNavigate();

  useEffect(() => {
    trackPageView('myinfo');
    return () => trackPageLeave('myinfo');
  }, []);

  // For now, assume user is not logged in
  const isLoggedIn = false;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="container flex h-14 items-center justify-center">
          <h1 className="text-lg font-bold">내 정보</h1>
        </div>
      </header>

      <main className="container py-6">
        {!isLoggedIn ? (
          // 비로그인 상태
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
              <User className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-foreground">로그인이 필요합니다</h2>
            <p className="mb-6 text-center text-muted-foreground">
              로그인하면 내 작업을 저장하고<br />
              좋아하는 템플릿을 관리할 수 있어요
            </p>
            <Button className="btn-hero-primary px-8">
              <LogIn className="mr-2 h-4 w-4" />
              로그인
            </Button>
          </div>
        ) : (
          // 로그인 상태 (추후 구현)
          <div className="space-y-4">
            <button className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary">
              <Heart className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">좋아요한 템플릿</span>
            </button>
            <button className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">최근 작업</span>
            </button>
            <button className="flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-secondary">
              <Settings className="h-5 w-5 text-primary" />
              <span className="font-medium text-foreground">설정</span>
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default MyInfo;
