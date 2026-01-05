import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { trackClick } from '@/lib/tracking';

interface SearchBarProps {
  placeholder?: string;
  showDropdown?: boolean;
  size?: 'default' | 'large' | 'compact';
  className?: string;
}

export function SearchBar({
  placeholder = '스타일과 용도를 함께 검색해 보세요',
  showDropdown = false,
  size = 'default',
  className = '',
}: SearchBarProps) {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
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
    compact: 'py-2 px-4',
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
      </div>
    </form>
  );
}
