import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { templates } from '@/data/templates';
import { thumbnailMap } from '@/components/TemplateCard';

const aspectRatioOptions = [
  { value: '9:16', label: '9:16', description: '세로형', aspectClass: 'aspect-[9/16]' },
  { value: '1:1', label: '1:1', description: '정사각형', aspectClass: 'aspect-square' },
  { value: '16:9', label: '16:9', description: '가로형', aspectClass: 'aspect-video' },
];

const TemplateUse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedRatio, setSelectedRatio] = useState('9:16');
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const templateVideoRef = useRef<HTMLVideoElement>(null);

  const template = templates.find((t) => t.id === id) || templates[0];
  const thumbnailSrc = thumbnailMap[template.id] || template.thumbnail;
  
  const isVideoTemplate = template.type === 'video' || template.tags.some(tag => 
    ['릴스', '쇼츠', 'shorts', '숏폼', '동영상'].includes(tag.toLowerCase())
  );

  const hasTemplateVideo = !!template.videoUrl;
  const currentAspect = aspectRatioOptions.find(opt => opt.value === selectedRatio);

  // Auto-play template preview video
  useEffect(() => {
    if (templateVideoRef.current && hasTemplateVideo && !videoPreviewUrl) {
      templateVideoRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, [hasTemplateVideo, videoPreviewUrl]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleVideoUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      alert('영상 파일만 업로드 가능합니다.');
      return;
    }

    setIsLoading(true);
    setUploadedVideo(file);

    const url = URL.createObjectURL(file);
    setVideoPreviewUrl(url);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleRemoveVideo = () => {
    if (videoPreviewUrl) {
      URL.revokeObjectURL(videoPreviewUrl);
    }
    setUploadedVideo(null);
    setVideoPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleStart = () => {
    if (videoPreviewUrl) {
      sessionStorage.setItem('editorVideo', videoPreviewUrl);
      sessionStorage.setItem('editorVideoName', uploadedVideo?.name || 'video');
    }
    navigate(`/editor?template=${template.id}&ratio=${selectedRatio}`);
  };

  const canStart = !isVideoTemplate || !!uploadedVideo;

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
          <div className="w-9" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        <div className="container py-6">
          {/* Template Preview - Dynamic aspect ratio with video */}
          <div className="relative mx-auto mb-6 flex max-w-sm items-center justify-center">
            <div className={`relative w-full overflow-hidden rounded-2xl bg-secondary ${currentAspect?.aspectClass || 'aspect-[9/16]'}`}>
              {/* Show uploaded video, template preview video, or thumbnail */}
              {videoPreviewUrl ? (
                <video
                  src={videoPreviewUrl}
                  className="h-full w-full object-cover"
                  muted
                  loop
                  autoPlay
                  playsInline
                />
              ) : hasTemplateVideo ? (
                <video
                  ref={templateVideoRef}
                  src={template.videoUrl}
                  className="h-full w-full object-cover"
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={thumbnailSrc}
                  alt={template.title}
                  className="h-full w-full object-cover"
                />
              )}
              
              {/* Loading overlay */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
              )}

              {/* Video loaded indicator */}
              {videoPreviewUrl && !isLoading && (
                <button
                  onClick={handleRemoveVideo}
                  className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                >
                  <X className="h-4 w-4" />
                </button>
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

          {/* Video Upload Section */}
          {isVideoTemplate && (
            <div className="mx-auto mt-6 max-w-sm">
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                영상 불러오기
              </h3>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {uploadedVideo ? (
                <div className="flex items-center gap-3 rounded-xl border border-primary bg-primary/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {uploadedVideo.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(uploadedVideo.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                  <button
                    onClick={handleRemoveVideo}
                    className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleVideoUpload}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-6 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <Upload className="h-5 w-5" />
                  <span className="font-medium">영상 불러오기</span>
                </button>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Fixed Bottom CTA */}
      <div className="sticky bottom-0 border-t border-border bg-background p-4">
        <div className="container">
          <Button
            onClick={handleStart}
            disabled={!canStart || isLoading}
            className="btn-hero-primary w-full py-6 text-base font-semibold disabled:opacity-50"
          >
            {isLoading ? '로딩 중...' : '이 템플릿으로 시작하기'}
          </Button>
          {isVideoTemplate && !uploadedVideo && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              영상을 먼저 불러와주세요
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateUse;
