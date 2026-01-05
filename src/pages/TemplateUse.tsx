import { useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { templates } from '@/data/templates';

const aspectRatioOptions = [
  { value: '9:16', label: '9:16', description: '세로형 (쇼츠/릴스)' },
  { value: '1:1', label: '1:1', description: '정사각형' },
  { value: '16:9', label: '16:9', description: '가로형' },
];

const TemplateUse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedRatio, setSelectedRatio] = useState('9:16');

  // Find template by id or use first one as fallback
  const template = templates.find((t) => t.id === id) || templates[0];
  const isVideo = template.type === 'video' || template.tags.some(tag => 
    ['릴스', '쇼츠', 'shorts', '숏폼', '동영상'].includes(tag.toLowerCase())
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleStart = () => {
    // Navigate to editor with selected options
    navigate(`/editor?template=${template.id}&ratio=${selectedRatio}`);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background">
        <div className="container flex h-14 items-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="flex-1 text-center font-semibold">템플릿 사용</h1>
          <div className="w-9" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="container py-6">
          {/* Template Preview */}
          <div className="relative mx-auto mb-6 max-w-sm overflow-hidden rounded-2xl bg-secondary">
            <div className="aspect-[9/16]">
              <img
                src={template.thumbnail}
                alt={template.title}
                className="h-full w-full object-cover"
              />
              {isVideo && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
                    <Play className="h-8 w-8 fill-primary text-primary" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Template Info */}
          <div className="mx-auto mb-8 max-w-sm text-center">
            <h2 className="mb-2 text-xl font-bold text-foreground">
              {template.title}
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {template.category}
              </span>
              {template.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Size Options */}
          <div className="mx-auto max-w-sm">
            <h3 className="mb-3 text-sm font-medium text-muted-foreground">
              콘텐츠 사이즈
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {aspectRatioOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSelectedRatio(option.value)}
                  className={`flex flex-col items-center gap-1 rounded-xl border-2 p-4 transition-all ${
                    selectedRatio === option.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-muted-foreground/50'
                  }`}
                >
                  <span className="text-lg font-semibold text-foreground">
                    {option.label}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="sticky bottom-0 border-t border-border bg-background p-4">
        <div className="container">
          <Button
            onClick={handleStart}
            className="btn-hero-primary w-full py-6 text-base font-semibold"
          >
            이 템플릿으로 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateUse;
