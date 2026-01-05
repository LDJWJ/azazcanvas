import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Play } from 'lucide-react';
import { Template } from '@/data/templates';
import { trackClick } from '@/lib/tracking';

// Import template images
import template1 from '@/assets/templates/template-1.jpg';
import template2 from '@/assets/templates/template-2.jpg';
import template3 from '@/assets/templates/template-3.jpg';
import template4 from '@/assets/templates/template-4.jpg';
import template5 from '@/assets/templates/template-5.jpg';
import template6 from '@/assets/templates/template-6.jpg';
import template7 from '@/assets/templates/template-7.jpg';
import template8 from '@/assets/templates/template-8.jpg';
import template9 from '@/assets/templates/template-9.jpg';
import template10 from '@/assets/templates/template-10.jpg';
import template11 from '@/assets/templates/template-11.jpg';
import template12 from '@/assets/templates/template-12.jpg';

const thumbnailMap: Record<string, string> = {
  'tpl-1': template1,
  'tpl-2': template2,
  'tpl-3': template3,
  'tpl-4': template4,
  'tpl-5': template5,
  'tpl-6': template6,
  'tpl-7': template7,
  'tpl-8': template8,
  'tpl-9': template9,
  'tpl-10': template10,
  'tpl-11': template11,
  'tpl-12': template12,
};

interface TemplateCardProps {
  template: Template;
  size?: 'small' | 'medium' | 'large';
  showLike?: boolean;
}

export function TemplateCard({ template, size = 'medium', showLike = false }: TemplateCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  // 릴스/숏폼 템플릿을 위해 9:16 세로 비율 사용
  const aspectRatioClass = 'aspect-[9/16]';

  const sizeClass = {
    small: 'w-full min-w-0',
    medium: 'w-full min-w-0',
    large: 'w-full min-w-0',
  }[size];

  const handleClick = () => {
    trackClick(`card_tpl_${template.id}`);
    // Navigate to template detail or editor
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    trackClick(`like_tpl_${template.id}`);
  };

  const thumbnailSrc = thumbnailMap[template.id] || template.thumbnail;
  const isVideo = ['instagram-reels', 'youtube-shorts', 'tiktok', 'youtube-video'].includes(template.type);

  return (
    <div
      onClick={handleClick}
      className={`template-card group cursor-pointer ${sizeClass}`}
    >
      <div className={`relative overflow-hidden rounded-lg bg-muted ${aspectRatioClass}`}>
        <img
          src={thumbnailSrc}
          alt={template.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Video indicator */}
        {isVideo && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
            <Play className="h-3 w-3 fill-current" />
          </div>
        )}

        {/* New badge */}
        {template.isNew && (
          <div className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            NEW
          </div>
        )}

        {/* Like button */}
        {showLike && (
          <button
            onClick={handleLikeClick}
            className={`like-button ${isLiked ? 'like-button-active' : ''}`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Hover overlay */}
        <div className="template-card-overlay">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-foreground">
            템플릿 사용하기
          </span>
        </div>
      </div>

      {/* Title (optional, for grid view) */}
      {size === 'large' && (
        <p className="mt-2 truncate text-sm text-muted-foreground">{template.title}</p>
      )}
    </div>
  );
}
