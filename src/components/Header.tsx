import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, HelpCircle, Youtube, Play, Instagram, Film, Menu, X, ChevronRight, Video, Utensils, Sparkles, Dumbbell, Newspaper, Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { trackClick } from '@/lib/tracking';

const iconMap: Record<string, React.ElementType> = {
  Youtube,
  Play,
  Instagram,
  Film,
  Video,
  Utensils,
  Sparkles,
  Dumbbell,
  Newspaper,
  Clapperboard,
};

const socialMenuData = {
  youtube: {
    name: '유튜브',
    icon: 'Youtube',
    items: [
      { id: 'youtube-thumbnail', name: '유튜브 썸네일', icon: 'Youtube' },
      { id: 'youtube-shorts', name: '유튜브 쇼츠', icon: 'Play', highlight: true },
    ],
  },
  instagram: {
    name: '인스타',
    icon: 'Instagram',
    items: [
      { id: 'instagram-feed', name: '인스타그램 피드', icon: 'Instagram' },
      { id: 'instagram-reels', name: '인스타그램 릴스', icon: 'Film', highlight: true },
    ],
  },
  tiktok: {
    name: '틱톡',
    icon: 'Clapperboard',
    items: [
      { id: 'tiktok', name: '틱톡', icon: 'Clapperboard', highlight: true },
    ],
  },
  naverClip: {
    name: '네이버 클립',
    icon: 'Play',
    items: [
      { id: 'naver-clip', name: '네이버 클립', icon: 'Play' },
    ],
  },
};

const categoryMenuData = {
  items: [
    { id: 'vlog', name: '브이로그', icon: 'Video' },
    { id: 'ootd', name: 'OOTD/패션', icon: 'Sparkles' },
    { id: 'food', name: '먹방/레시피', icon: 'Utensils' },
    { id: 'beauty', name: '뷰티/메이크업', icon: 'Sparkles' },
    { id: 'fitness', name: '운동/헬스', icon: 'Dumbbell' },
    { id: 'news', name: '뉴스/정보', icon: 'Newspaper' },
  ],
};

interface HeaderProps {
  hideCreateButton?: boolean;
}

export function Header({ hideCreateButton = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    trackClick('btn_open_template_menu');
  };

  const handleMenuItemClick = (itemId: string, itemName: string) => {
    trackClick(`menu_${itemId}`);
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
    
    if (itemId === 'instagram-reels') {
      navigate('/search?q=인스타그램%20릴스');
    } else {
      navigate(`/search?q=${encodeURIComponent(itemName)}`);
    }
  };

  const handleMobileNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    navigate(path);
  };

  const toggleCategory = (key: string) => {
    setExpandedCategory(expandedCategory === key ? null : key);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="rounded-lg p-2 text-foreground hover:bg-secondary">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <div className="flex h-full flex-col">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between border-b border-border p-4">
                  <span className="text-lg font-bold text-primary">아자아자캔버스</span>
                  <SheetClose asChild>
                    <button className="rounded-lg p-2 hover:bg-secondary">
                      <X className="h-5 w-5" />
                    </button>
                  </SheetClose>
                </div>

                {/* Mobile Menu Content */}
                <div className="flex-1 overflow-y-auto">
                  {/* Social Media Categories - Top */}
                  <div className="border-b border-border">
                    <button
                      onClick={() => toggleCategory('social')}
                      className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-secondary"
                    >
                      소셜 미디어
                      <ChevronRight className={`h-5 w-5 transition-transform ${expandedCategory === 'social' ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {expandedCategory === 'social' && (
                      <div className="bg-secondary/30 pb-2">
                        {Object.entries(socialMenuData).map(([key, category]) => {
                          const CategoryIcon = iconMap[category.icon];
                          return (
                            <div key={key} className="px-4 py-2">
                              <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-muted-foreground">
                                {CategoryIcon && <CategoryIcon className="h-3 w-3" />}
                                {category.name}
                              </h4>
                              <div className="space-y-1">
                                {category.items.map((item) => {
                                  const Icon = iconMap[item.icon];
                                  return (
                                    <button
                                      key={item.id}
                                      onClick={() => handleMenuItemClick(item.id, item.name)}
                                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-secondary"
                                    >
                                      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                                      <span>{item.name}</span>
                                      {'highlight' in item && item.highlight && (
                                        <span className="ml-auto text-xs text-primary">NEW</span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Category Menu */}
                  <div className="border-b border-border">
                    <button
                      onClick={() => toggleCategory('category')}
                      className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-secondary"
                    >
                      카테고리
                      <ChevronRight className={`h-5 w-5 transition-transform ${expandedCategory === 'category' ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {expandedCategory === 'category' && (
                      <div className="bg-secondary/30 pb-2">
                        <div className="px-4 py-2">
                          <div className="space-y-1">
                            {categoryMenuData.items.map((item) => {
                              const Icon = iconMap[item.icon];
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => handleMenuItemClick(item.id, item.name)}
                                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-secondary"
                                >
                                  {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                                  <span>{item.name}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Other Menu Items */}
                  <nav className="p-2">
                    <button
                      onClick={() => handleMobileNavClick('/pricing')}
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium hover:bg-secondary"
                    >
                      요금제
                    </button>
                  </nav>
                </div>

                {/* Mobile Menu Footer */}
                <div className="border-t border-border p-4">
                  <Button variant="default" className="btn-hero-primary mb-2 w-full rounded-full">
                    디자인 만들기
                  </Button>
                  <Button variant="outline" className="w-full rounded-full">
                    로그인
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">아자아자캔버스</span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden items-center gap-1 md:flex">
            {/* 소셜 미디어 Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={handleMenuToggle}
                className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                소셜 미디어
                <ChevronDown className={`h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu */}
              {isMenuOpen && (
                <div className="dropdown-menu animate-scale-in left-0 top-full mt-2 w-[600px] p-6">
                  <div className="grid grid-cols-4 gap-6">
                    {Object.entries(socialMenuData).map(([key, category]) => {
                      const CategoryIcon = iconMap[category.icon];
                      return (
                        <div key={key}>
                          <h4 className="mb-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                            {CategoryIcon && <CategoryIcon className="h-3 w-3" />}
                            {category.name}
                          </h4>
                          <ul className="space-y-1">
                            {category.items.map((item) => {
                              const Icon = iconMap[item.icon];
                              return (
                                <li key={item.id}>
                                  <button
                                    onClick={() => handleMenuItemClick(item.id, item.name)}
                                    className="dropdown-item w-full"
                                  >
                                    {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                                    <span>{item.name}</span>
                                    {'highlight' in item && item.highlight && (
                                      <span className="ml-auto text-xs text-primary">NEW</span>
                                    )}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 카테고리 Menu */}
            <div className="relative">
              <button
                onClick={() => setExpandedCategory(expandedCategory === 'desktop-category' ? null : 'desktop-category')}
                className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                카테고리
                <ChevronDown className={`h-4 w-4 transition-transform ${expandedCategory === 'desktop-category' ? 'rotate-180' : ''}`} />
              </button>

              {expandedCategory === 'desktop-category' && (
                <div className="dropdown-menu animate-scale-in left-0 top-full mt-2 w-[300px] p-4">
                  <ul className="space-y-1">
                    {categoryMenuData.items.map((item) => {
                      const Icon = iconMap[item.icon];
                      return (
                        <li key={item.id}>
                          <button
                            onClick={() => handleMenuItemClick(item.id, item.name)}
                            className="dropdown-item w-full"
                          >
                            {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
                            <span>{item.name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>

            <Link
              to="/pricing"
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              요금제
            </Link>
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <button className="hidden rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:flex">
            <HelpCircle className="h-5 w-5" />
          </button>
          {!hideCreateButton && (
            <Button variant="default" className="btn-hero-primary h-9 px-4 text-sm">
              디자인 만들기
            </Button>
          )}
          <Button variant="outline" className="hidden h-9 rounded-full px-4 text-sm md:flex">
            로그인
          </Button>
        </div>
      </div>
    </header>
  );
}
