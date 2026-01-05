import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Type, Image, Replace, Scissors, Maximize, Download, Play, Pause } from 'lucide-react';
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

type ToolType = 'none' | 'text' | 'replace' | 'trim' | 'fit';
type FitMode = 'cover' | 'contain';

const Editor = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const templateId = searchParams.get('template') || 'tpl-1';
  const ratio = searchParams.get('ratio') || '9:16';
  
  const template = templates.find((t) => t.id === templateId) || templates[0];
  const thumbnailSrc = thumbnailMap[template.id] || template.thumbnail;

  // State
  const [activeTool, setActiveTool] = useState<ToolType>('none');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fitMode, setFitMode] = useState<FitMode>('cover');
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(100);
  const [videoDuration, setVideoDuration] = useState(0);
  const [textOverlays, setTextOverlays] = useState<Array<{
    id: string;
    text: string;
    x: number;
    y: number;
  }>>([
    { id: '1', text: template.title, x: 50, y: 20 },
  ]);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);

  // Load video from sessionStorage
  useEffect(() => {
    const storedVideo = sessionStorage.getItem('editorVideo');
    if (storedVideo) {
      setVideoUrl(storedVideo);
    }
  }, []);

  // Video controls
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoLoaded = () => {
    if (videoRef.current) {
      setVideoDuration(videoRef.current.duration);
    }
  };

  // Replace video
  const handleReplaceVideo = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('video/')) return;

    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setActiveTool('none');
  };

  // Text editing
  const handleTextClick = (id: string) => {
    setEditingTextId(id);
    setActiveTool('text');
  };

  const handleTextChange = (id: string, newText: string) => {
    setTextOverlays(prev => 
      prev.map(t => t.id === id ? { ...t, text: newText } : t)
    );
  };

  const handleAddText = () => {
    const newId = Date.now().toString();
    setTextOverlays(prev => [...prev, {
      id: newId,
      text: '텍스트를 입력하세요',
      x: 50,
      y: 50,
    }]);
    setEditingTextId(newId);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const toolItems = [
    { id: 'text' as ToolType, icon: Type, label: '텍스트' },
    { id: 'replace' as ToolType, icon: Replace, label: '교체' },
    { id: 'trim' as ToolType, icon: Scissors, label: '트리밍' },
    { id: 'fit' as ToolType, icon: Maximize, label: '맞춤' },
  ];

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
      <main className="flex flex-1 flex-col items-center justify-center overflow-auto p-4">
        <div 
          className={`${aspectRatioClasses[ratio] || 'aspect-[9/16]'} relative w-full max-w-sm overflow-hidden rounded-lg bg-background shadow-lg`}
        >
          {/* Video or Image */}
          {videoUrl ? (
            <video
              ref={videoRef}
              src={videoUrl}
              className={`h-full w-full ${fitMode === 'cover' ? 'object-cover' : 'object-contain'}`}
              loop
              muted
              playsInline
              onLoadedMetadata={handleVideoLoaded}
            />
          ) : (
            <img
              src={thumbnailSrc}
              alt={template.title}
              className="h-full w-full object-cover"
            />
          )}

          {/* Text Overlays */}
          {textOverlays.map((overlay) => (
            <div
              key={overlay.id}
              onClick={() => handleTextClick(overlay.id)}
              className={`absolute cursor-pointer px-3 py-1 transition-all ${
                editingTextId === overlay.id 
                  ? 'ring-2 ring-primary ring-offset-2' 
                  : 'hover:ring-2 hover:ring-primary/50'
              }`}
              style={{
                left: `${overlay.x}%`,
                top: `${overlay.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <span className="text-lg font-bold text-white drop-shadow-lg">
                {overlay.text}
              </span>
            </div>
          ))}

          {/* Play/Pause Button for video */}
          {videoUrl && (
            <button
              onClick={togglePlay}
              className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 fill-current" />
              )}
            </button>
          )}
        </div>

        {/* Tool Panel */}
        {activeTool !== 'none' && (
          <div className="mt-4 w-full max-w-sm rounded-lg border border-border bg-background p-4">
            {/* Text Tool */}
            {activeTool === 'text' && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">텍스트 편집</h3>
                {editingTextId && (
                  <input
                    type="text"
                    value={textOverlays.find(t => t.id === editingTextId)?.text || ''}
                    onChange={(e) => handleTextChange(editingTextId, e.target.value)}
                    className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none"
                    placeholder="텍스트 입력"
                  />
                )}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddText}
                  className="w-full"
                >
                  + 텍스트 추가
                </Button>
              </div>
            )}

            {/* Replace Tool */}
            {activeTool === 'replace' && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">영상 교체</h3>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleReplaceVideo}
                  className="w-full"
                >
                  새 영상 선택
                </Button>
              </div>
            )}

            {/* Trim Tool */}
            {activeTool === 'trim' && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">트리밍</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>시작: {((trimStart / 100) * videoDuration).toFixed(1)}초</span>
                    <span>끝: {((trimEnd / 100) * videoDuration).toFixed(1)}초</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground">시작점</label>
                      <input
                        type="range"
                        min={0}
                        max={trimEnd - 1}
                        value={trimStart}
                        onChange={(e) => setTrimStart(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs text-muted-foreground">끝점</label>
                      <input
                        type="range"
                        min={trimStart + 1}
                        max={100}
                        value={trimEnd}
                        onChange={(e) => setTrimEnd(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Fit Tool */}
            {activeTool === 'fit' && (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-foreground">맞춤 방식</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFitMode('cover')}
                    className={`rounded-lg border-2 p-3 text-center text-sm transition-all ${
                      fitMode === 'cover'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/50'
                    }`}
                  >
                    <span className="font-medium">채우기</span>
                    <p className="mt-1 text-xs text-muted-foreground">화면에 꽉 차게</p>
                  </button>
                  <button
                    onClick={() => setFitMode('contain')}
                    className={`rounded-lg border-2 p-3 text-center text-sm transition-all ${
                      fitMode === 'contain'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-muted-foreground/50'
                    }`}
                  >
                    <span className="font-medium">맞추기</span>
                    <p className="mt-1 text-xs text-muted-foreground">비율 유지</p>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Toolbar */}
      <nav className="border-t border-border bg-background">
        <div className="flex h-16 items-center justify-around">
          {toolItems.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => setActiveTool(isActive ? 'none' : tool.id)}
                className={`flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors ${
                  isActive 
                    ? 'text-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
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
