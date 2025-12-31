import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ChevronDown, X } from 'lucide-react';
import { trackClick } from '@/lib/tracking';

interface SearchBarProps {
  placeholder?: string;
  showDropdown?: boolean;
  size?: 'default' | 'large';
  className?: string;
}

export function SearchBar({
  placeholder = '스타일과 용도를 함께 검색해 보세요 (예: 초록색 차분한 캘리그라피 웨딩 초대장)',
  showDropdown = true,
  size = 'default',
  className = '',
}: SearchBarProps) {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      trackClick('btn_search', { query });
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  const sizeClasses = {
    default: 'py-3 px-5',
    large: 'py-4 px-6',
  }[size];

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className={`search-bar ${sizeClasses}`}>
        <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
        {showDropdown && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 border-l border-border pl-4 text-sm text-muted-foreground hover:text-foreground"
            >
              모든 템플릿
              <ChevronDown className="h-4 w-4" />
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu right-0 top-full mt-2 w-40">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(false)}
                  className="dropdown-item w-full"
                >
                  모든 템플릿
                </button>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(false)}
                  className="dropdown-item w-full"
                >
                  프레젠테이션
                </button>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(false)}
                  className="dropdown-item w-full"
                >
                  동영상
                </button>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(false)}
                  className="dropdown-item w-full"
                >
                  소셜 미디어
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
