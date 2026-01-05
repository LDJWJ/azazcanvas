import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Play } from 'lucide-react';
import { Template } from '@/data/templates';
import { trackClick } from '@/lib/tracking';
import { useVideoPreview } from '@/hooks/useVideoPreview';

// Import template images - Vlog
import vlog1 from '@/assets/templates/vlog-1.jpg';
import vlog2 from '@/assets/templates/vlog-2.jpg';
import vlog3 from '@/assets/templates/vlog-3.jpg';
import vlog4 from '@/assets/templates/vlog-4.jpg';
import vlog5 from '@/assets/templates/vlog-5.jpg';

// Import template images - Fashion
import fashion1 from '@/assets/templates/fashion-1.jpg';
import fashion2 from '@/assets/templates/fashion-2.jpg';
import fashion3 from '@/assets/templates/fashion-3.jpg';
import fashion4 from '@/assets/templates/fashion-4.jpg';
import fashion5 from '@/assets/templates/fashion-5.jpg';

// Import template images - Food
import food1 from '@/assets/templates/food-1.jpg';
import food2 from '@/assets/templates/food-2.jpg';
import food3 from '@/assets/templates/food-3.jpg';
import food4 from '@/assets/templates/food-4.jpg';
import food5 from '@/assets/templates/food-5.jpg';

// Import template images - Beauty
import beauty1 from '@/assets/templates/beauty-1.jpg';
import beauty2 from '@/assets/templates/beauty-2.jpg';
import beauty3 from '@/assets/templates/beauty-3.jpg';
import beauty4 from '@/assets/templates/beauty-4.jpg';
import beauty5 from '@/assets/templates/beauty-5.jpg';

// Import template images - Fitness
import fitness1 from '@/assets/templates/fitness-1.jpg';
import fitness2 from '@/assets/templates/fitness-2.jpg';
import fitness3 from '@/assets/templates/fitness-3.jpg';
import fitness4 from '@/assets/templates/fitness-4.jpg';
import fitness5 from '@/assets/templates/fitness-5.jpg';

// Import template images - News
import news1 from '@/assets/templates/news-1.jpg';
import news2 from '@/assets/templates/news-2.jpg';
import news3 from '@/assets/templates/news-3.jpg';
import news4 from '@/assets/templates/news-4.jpg';
import news5 from '@/assets/templates/news-5.jpg';

const thumbnailMap: Record<string, string> = {
  'vlog-1': vlog1,
  'vlog-2': vlog2,
  'vlog-3': vlog3,
  'vlog-4': vlog4,
  'vlog-5': vlog5,
  'fashion-1': fashion1,
  'fashion-2': fashion2,
  'fashion-3': fashion3,
  'fashion-4': fashion4,
  'fashion-5': fashion5,
  'food-1': food1,
  'food-2': food2,
  'food-3': food3,
  'food-4': food4,
  'food-5': food5,
  'beauty-1': beauty1,
  'beauty-2': beauty2,
  'beauty-3': beauty3,
  'beauty-4': beauty4,
  'beauty-5': beauty5,
  'fitness-1': fitness1,
  'fitness-2': fitness2,
  'fitness-3': fitness3,
  'fitness-4': fitness4,
  'fitness-5': fitness5,
  'news-1': news1,
  'news-2': news2,
  'news-3': news3,
  'news-4': news4,
  'news-5': news5,
};

interface TemplateCardProps {
  template: Template;
  size?: 'small' | 'medium' | 'large';
  showLike?: boolean;
}

export function TemplateCard({ template, size = 'medium', showLike = false }: TemplateCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const {
    videoRef,
    containerRef,
    isPlaying,
    isLoaded,
    hasError,
    handleMouseEnter,
    handleMouseLeave,
    handleVideoLoad,
    handleVideoError,
  } = useVideoPreview({ videoUrl: template.videoUrl });

  const aspectRatioClass = 'aspect-[9/16]';

  const sizeClass = {
    small: 'w-full min-w-0',
    medium: 'w-full min-w-0',
    large: 'w-full min-w-0',
  }[size];

  const handleClick = () => {
    trackClick(`card_tpl_${template.id}`);
    navigate(`/template/${template.id}`);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    trackClick(`like_tpl_${template.id}`);
  };

  const thumbnailSrc = thumbnailMap[template.id] || template.thumbnail;
  const isVideo = ['instagram-reels', 'youtube-shorts', 'tiktok', 'youtube-video'].includes(template.type);
  const hasVideoPreview = !!template.videoUrl && !hasError;

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`template-card group cursor-pointer ${sizeClass}`}
    >
      <div className={`relative overflow-hidden rounded-lg bg-muted ${aspectRatioClass}`}>
        {/* Thumbnail Image */}
        <img
          src={thumbnailSrc}
          alt={template.title}
          loading="lazy"
          className={`h-full w-full object-cover transition-all duration-300 ${
            isPlaying && hasVideoPreview ? 'opacity-0' : 'opacity-100 group-hover:scale-105'
          }`}
        />
        
        {/* Video Preview */}
        {hasVideoPreview && (
          <video
            ref={videoRef}
            src={template.videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={handleVideoLoad}
            onError={handleVideoError}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isPlaying && isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
        
        {/* Video indicator - hide when playing */}
        {isVideo && !isPlaying && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-xs text-white">
            <Play className="h-3 w-3 fill-current" />
          </div>
        )}

        {/* Playing indicator */}
        {isPlaying && hasVideoPreview && (
          <div className="absolute inset-0 ring-2 ring-primary/50 ring-inset rounded-lg" />
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

        {/* Hover overlay - hide when playing */}
        {!isPlaying && (
          <div className="template-card-overlay">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-medium text-foreground">
              템플릿 사용하기
            </span>
          </div>
        )}
      </div>

      {/* Title - 카드 아래에 표시 */}
      <p className="mt-2 truncate text-sm text-muted-foreground">{template.title}</p>
    </div>
  );
}
