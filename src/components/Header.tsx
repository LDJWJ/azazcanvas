import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, HelpCircle, Presentation, Newspaper, FileText, Monitor, Smile, Youtube, Play, Instagram, Film, CreditCard, FileImage, Files, Mail, Flag, Rows, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { trackClick } from '@/lib/tracking';

const iconMap: Record<string, React.ElementType> = {
  Presentation,
  Newspaper,
  FileText,
  Monitor,
  Smile,
  Youtube,
  Play,
  Instagram,
  Film,
  CreditCard,
  FileImage,
  Files,
  Mail,
  Flag,
  Rows,
};

const menuData = {
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
      { id: 'instagram-reels', name: '인스타그램 릴스', icon: 'Film', highlight: true },
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

export function Header() {
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
                  {/* Template Categories */}
                  <div className="border-b border-border">
                    <button
                      onClick={() => toggleCategory('templates')}
                      className="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-secondary"
                    >
                      템플릿
                      <ChevronRight className={`h-5 w-5 transition-transform ${expandedCategory === 'templates' ? 'rotate-90' : ''}`} />
                    </button>
                    
                    {expandedCategory === 'templates' && (
                      <div className="bg-secondary/30 pb-2">
                        {Object.entries(menuData).map(([key, category]) => (
                          <div key={key} className="px-4 py-2">
                            <h4 className="mb-2 text-xs font-semibold uppercase text-muted-foreground">
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
                                    {item.highlight && (
                                      <span className="ml-auto text-xs text-primary">NEW</span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Other Menu Items */}
                  <nav className="p-2">
                    <button
                      onClick={() => handleMobileNavClick('/templates')}
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium hover:bg-secondary"
                    >
                      추천 기능
                    </button>
                    <button
                      onClick={() => handleMobileNavClick('/enterprise')}
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium hover:bg-secondary"
                    >
                      기업용
                    </button>
                    <button
                      onClick={() => handleMobileNavClick('/education')}
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left font-medium hover:bg-secondary"
                    >
                      교육용
                    </button>
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
                  <Button variant="default" className="btn-hero-primary mb-2 w-full">
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
            <div className="relative" ref={menuRef}>
              <button
                onClick={handleMenuToggle}
                className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                템플릿
                <ChevronDown className={`h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu */}
              {isMenuOpen && (
                <div className="dropdown-menu animate-scale-in left-0 top-full mt-2 w-[600px] p-6">
                  <div className="grid grid-cols-3 gap-8">
                    {Object.entries(menuData).map(([key, category]) => (
                      <div key={key}>
                        <h3 className="mb-4 text-sm font-semibold text-muted-foreground">
                          {category.name}
                        </h3>
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
                                  {item.highlight && (
                                    <span className="ml-auto text-xs text-primary">•</span>
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button className="flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary">
              추천 기능
              <ChevronDown className="h-4 w-4" />
            </button>
            <Link
              to="/enterprise"
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              기업용
            </Link>
            <Link
              to="/education"
              className="rounded-lg px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              교육용
            </Link>
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
          <Button variant="default" className="btn-hero-primary h-9 px-4 text-sm">
            디자인 만들기
          </Button>
          <Button variant="outline" className="hidden h-9 rounded-full px-4 text-sm md:flex">
            로그인
          </Button>
        </div>
      </div>
    </header>
  );
}
