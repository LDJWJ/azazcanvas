import { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { TemplateCard } from '@/components/TemplateCard';
import { templates, searchTemplates, relatedKeywords } from '@/data/templates';
import { trackClick, trackPageView, trackPageLeave } from '@/lib/tracking';

const styleFilters = ['모던', '심플', '빈티지', '컬러풀', '미니멀'];
const colorFilters = ['레드', '블루', '그린', '옐로우', '블랙', '화이트'];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isStyleOpen, setIsStyleOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);

  useEffect(() => {
    trackPageView('search');
    return () => trackPageLeave('search');
  }, []);

  const results = useMemo(() => {
    return searchTemplates(query);
  }, [query]);

  // Get related keywords for the search query
  const keywords = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    for (const [key, values] of Object.entries(relatedKeywords)) {
      if (lowerQuery.includes(key.toLowerCase())) {
        return values;
      }
    }
    return ['숏폼', '쇼츠', 'shorts', '단축'];
  }, [query]);

  const handleKeywordClick = (keyword: string) => {
    trackClick(`chip_kw_${keyword}`);
    setSearchParams({ q: keyword });
  };

  const handleStyleSelect = (style: string) => {
    trackClick('filter_style', { style });
    setSelectedStyle(style === selectedStyle ? '' : style);
    setIsStyleOpen(false);
  };

  const handleColorSelect = (color: string) => {
    trackClick('filter_color', { color });
    setSelectedColor(color === selectedColor ? '' : color);
    setIsColorOpen(false);
  };

  // Calculate mixed ratio stats for tracking
  const mixedRatioStats = useMemo(() => {
    const vertical = results.filter((t) => t.aspectRatio === '9:16').length;
    const horizontal = results.filter((t) => t.aspectRatio === '16:9').length;
    const other = results.length - vertical - horizontal;
    return { vertical, horizontal, other, total: results.length };
  }, [results]);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/templates" className="hover:text-foreground">
            템플릿
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{query || '검색 결과'}</span>
        </nav>

        {/* Title */}
        <h1 className="mb-6 text-2xl font-bold md:text-3xl">
          {query ? `${query} 템플릿` : '검색 결과'}
        </h1>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar showDropdown />
        </div>

        {/* Filters & Keywords */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {/* Style Filter */}
          <div className="relative">
            <button
              onClick={() => setIsStyleOpen(!isStyleOpen)}
              className="chip flex items-center gap-1"
            >
              스타일 {selectedStyle && `· ${selectedStyle}`}
              <ChevronDown className="h-3 w-3" />
            </button>
            {isStyleOpen && (
              <div className="dropdown-menu left-0 top-full mt-2 w-36">
                {styleFilters.map((style) => (
                  <button
                    key={style}
                    onClick={() => handleStyleSelect(style)}
                    className={`dropdown-item w-full ${selectedStyle === style ? 'bg-accent' : ''}`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Color Filter */}
          <div className="relative">
            <button
              onClick={() => setIsColorOpen(!isColorOpen)}
              className="chip flex items-center gap-1"
            >
              색상 {selectedColor && `· ${selectedColor}`}
              <ChevronDown className="h-3 w-3" />
            </button>
            {isColorOpen && (
              <div className="dropdown-menu left-0 top-full mt-2 w-36">
                {colorFilters.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className={`dropdown-item w-full ${selectedColor === color ? 'bg-accent' : ''}`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-border" />

          {/* Related Keywords */}
          {keywords.map((keyword) => (
            <button
              key={keyword}
              onClick={() => handleKeywordClick(keyword)}
              className={`chip ${query.toLowerCase().includes(keyword.toLowerCase()) ? 'chip-active' : ''}`}
            >
              {keyword}
            </button>
          ))}
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
          <p>© 2024 MiriCanvas. 모든 권리 보유.</p>
        </div>
      </footer>
    </div>
  );
};

export default Search;
