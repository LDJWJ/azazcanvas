import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Type, Image, Shapes, Layers, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { templates } from '@/data/templates';

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

const aspectRatioClasses: Record<string, string> = {
  '9:16': 'aspect-[9/16]',
  '1:1': 'aspect-square',
  '16:9': 'aspect-video',
};

const toolItems = [
  { id: 'text', icon: Type, label: '텍스트' },
  { id: 'image', icon: Image, label: '이미지' },
  { id: 'shape', icon: Shapes, label: '도형' },
  { id: 'layers', icon: Layers, label: '레이어' },
];

const Editor = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const templateId = searchParams.get('template') || 'tpl-1';
  const ratio = searchParams.get('ratio') || '9:16';
  
  const template = templates.find((t) => t.id === templateId) || templates[0];
  const thumbnailSrc = thumbnailMap[template.id] || template.thumbnail;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex h-screen flex-col bg-muted">
      {/* Header */}
      <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="font-semibold text-foreground">{template.title}</h1>
        <Button size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          저장
        </Button>
      </header>

      {/* Canvas Area */}
      <main className="flex flex-1 items-center justify-center overflow-auto p-4">
        <div 
          className={`${aspectRatioClasses[ratio] || 'aspect-[9/16]'} w-full max-w-sm overflow-hidden rounded-lg bg-background shadow-lg`}
        >
          <img
            src={thumbnailSrc}
            alt={template.title}
            className="h-full w-full object-cover"
          />
        </div>
      </main>

      {/* Bottom Toolbar */}
      <nav className="border-t border-border bg-background">
        <div className="flex h-16 items-center justify-around">
          {toolItems.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                className="flex flex-1 flex-col items-center justify-center gap-1 py-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{tool.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Editor;
