import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import { TemplateCard } from '@/components/TemplateCard';
import { searchTemplates } from '@/data/templates';
import { trackClick, trackPageView, trackPageLeave } from '@/lib/tracking';

// 목적 중심 탐색 칩
const purposeChips = [
  { id: 'daily', label: '일상 기록' },
  { id: 'info', label: '정보 전달' },
  { id: 'review', label: '후기' },
  { id: 'routine', label: '루틴' },
  { id: 'branding', label: '브랜딩' },
];

const difficultyChips = [
  { id: 'quick', label: '빠르게 만들기' },
  { id: 'normal', label: '보통' },
  { id: 'detailed', label: '공들인 영상' },
];

const situationChips = [
  { id: 'daily-upload', label: '매일 업로드용' },
  { id: 'experiment', label: '실험용' },
  { id: 'main-content', label: '메인 콘텐츠' },
];

const moodChips = [
  { id: 'emotional', label: '감성' },
  { id: 'clean', label: '깔끔' },
  { id: 'casual', label: '캐주얼' },
  { id: 'impact', label: '임팩트' },
];

const compositionChips = [
  { id: 'subtitle', label: '자막 중심' },
  { id: 'video', label: '영상 중심' },
  { id: 'mixed', label: '이미지+텍스트' },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  useEffect(() => {
    trackPageView('search');
    return () => trackPageLeave('search');
  }, []);

  const results = useMemo(() => {
    return searchTemplates(query);
  }, [query]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleChipClick = (chipId: string) => {
    trackClick(`chip_${chipId}`);
    setSelectedChips(prev => 
      prev.includes(chipId) 
        ? prev.filter(id => id !== chipId)
        : [...prev, chipId]
    );
  };

  const pageTitle = query ? `${query} 템플릿` : '템플릿 검색';

  return (
    <div className="min-h-screen bg-background">
      {/* Simplified Header - Back button + centered title */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="container flex h-14 items-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="flex-1 text-center font-semibold">{pageTitle}</h1>
          <div className="w-9" />
        </div>
      </header>

      <main className="container py-4">
        {/* Search Bar - Below header */}
        <div className="mb-5">
          <SearchBar 
            size="compact" 
            placeholder={query ? `${query} 템플릿 검색` : '템플릿 검색'}
          />
        </div>

        {/* Purpose-based Filter Chips */}
        <div className="mb-6 space-y-4">
          {/* 콘텐츠 목적 */}
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">콘텐츠 목적</p>
            <div className="flex flex-wrap gap-2">
              {purposeChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => handleChipClick(chip.id)}
                  className={`chip ${selectedChips.includes(chip.id) ? 'chip-active' : ''}`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* 제작 난이도 */}
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">제작 난이도</p>
            <div className="flex flex-wrap gap-2">
              {difficultyChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => handleChipClick(chip.id)}
                  className={`chip ${selectedChips.includes(chip.id) ? 'chip-active' : ''}`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* 사용 상황 */}
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">사용 상황</p>
            <div className="flex flex-wrap gap-2">
              {situationChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => handleChipClick(chip.id)}
                  className={`chip ${selectedChips.includes(chip.id) ? 'chip-active' : ''}`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* 영상 분위기 */}
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">영상 분위기</p>
            <div className="flex flex-wrap gap-2">
              {moodChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => handleChipClick(chip.id)}
                  className={`chip ${selectedChips.includes(chip.id) ? 'chip-active' : ''}`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          {/* 구성 방식 */}
          <div>
            <p className="mb-2 text-xs font-medium text-muted-foreground">구성 방식</p>
            <div className="flex flex-wrap gap-2">
              {compositionChips.map((chip) => (
                <button
                  key={chip.id}
                  onClick={() => handleChipClick(chip.id)}
                  className={`chip ${selectedChips.includes(chip.id) ? 'chip-active' : ''}`}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {results.map((template) => (
              <div key={template.id} className="w-full">
                <TemplateCard
                  template={template}
                  size="medium"
                  showLike
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">
              '{query}'에 대한 검색 결과가 없습니다.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              다른 키워드로 검색해 보세요.
            </p>
          </div>
        )}

        {/* Results Info */}
        {results.length > 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            총 {results.length}개의 템플릿
          </p>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 아자아자캔버스. 모든 권리 보유.</p>
        </div>
      </footer>
    </div>
  );
};

export default Search;
