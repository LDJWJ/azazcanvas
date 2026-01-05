import { useEffect, useRef, useState, useCallback } from 'react';

interface UseVideoPreviewOptions {
  videoUrl?: string;
  threshold?: number;
}

export function useVideoPreview({ videoUrl, threshold = 0.5 }: UseVideoPreviewOptions) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver for mobile auto-play
  useEffect(() => {
    if (!isMobile || !videoUrl || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            playVideo();
          } else {
            pauseVideo();
          }
        });
      },
      { threshold: [threshold] }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMobile, videoUrl, threshold]);

  const playVideo = useCallback(() => {
    if (!videoRef.current || hasError) return;
    
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setHasError(true);
    });
  }, [hasError]);

  const pauseVideo = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (isMobile || !videoUrl) return;
    playVideo();
  }, [isMobile, videoUrl, playVideo]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    pauseVideo();
  }, [isMobile, pauseVideo]);

  const handleVideoLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setHasError(true);
    setIsPlaying(false);
  }, []);

  return {
    videoRef,
    containerRef,
    isPlaying,
    isLoaded,
    hasError,
    isMobile,
    handleMouseEnter,
    handleMouseLeave,
    handleVideoLoad,
    handleVideoError,
  };
}
