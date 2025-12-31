import { useNavigate } from 'react-router-dom';
import { Presentation, FileText, Newspaper, Video, Youtube, Square, Image } from 'lucide-react';
import { trackClick } from '@/lib/tracking';

const iconMap: Record<string, React.ElementType> = {
  Presentation,
  FileText,
  Newspaper,
  Video,
  Youtube,
  Square,
  Image,
};

const types = [
  { id: 'presentation', name: '프레젠테이션', icon: 'Presentation' },
  { id: 'detail-page', name: '상세페이지', icon: 'FileText' },
  { id: 'card-news', name: '카드뉴스', icon: 'Newspaper' },
  { id: 'video', name: '동영상', icon: 'Video' },
  { id: 'youtube-thumbnail', name: '유튜브 썸네일', icon: 'Youtube' },
  { id: 'social-square', name: '소셜 미디어 정사각형', icon: 'Square' },
  { id: 'web-poster', name: '웹 포스터 가로형', icon: 'Image' },
];

import template1 from '@/assets/templates/template-1.jpg';
import template2 from '@/assets/templates/template-2.jpg';
import template3 from '@/assets/templates/template-3.jpg';
import template4 from '@/assets/templates/template-4.jpg';
import template5 from '@/assets/templates/template-5.jpg';
import template6 from '@/assets/templates/template-6.jpg';
import template7 from '@/assets/templates/template-7.jpg';

const typeImages: Record<string, string> = {
  presentation: template2,
  'detail-page': template4,
  'card-news': template1,
  video: template5,
  'youtube-thumbnail': template5,
  'social-square': template3,
  'web-poster': template6,
};

export function TypeCards() {
  const navigate = useNavigate();

  const handleTypeClick = (typeId: string, typeName: string) => {
    trackClick(`type_card_${typeId}`);
    navigate(`/search?q=${encodeURIComponent(typeName)}`);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
      {types.map((type) => {
        const Icon = iconMap[type.icon];
        return (
          <button
            key={type.id}
            onClick={() => handleTypeClick(type.id, type.name)}
            className="type-card shrink-0"
          >
            <span className="text-sm font-medium">{type.name}</span>
            <div className="h-20 overflow-hidden rounded-lg bg-muted">
              <img
                src={typeImages[type.id]}
                alt={type.name}
                className="h-full w-full object-cover"
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
