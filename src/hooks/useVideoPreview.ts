import { useEffect, useRef, useState, useCallback } from 'react';

interface UseVideoPreviewOptions {
  videoUrl?: string;
  threshold?: number;
  cardId?: string;
  currentlyPlayingId?: string | null;
  onRequestPlayback?: (id: string) => void;
}

export function useVideoPreview({ 
  videoUrl, 
  threshold = 0.5, 
  cardId,
  currentlyPlayingId,
  onRequestPlayback 
}: UseVideoPreviewOptions) {
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

  const playVideo = useCallback(() => {
    if (!videoRef.current || hasError) return;
    
    // Request playback through context if available
    if (cardId && onRequestPlayback) {
      onRequestPlayback(cardId);
    }
    
    videoRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      setHasError(true);
    });
  }, [hasError, cardId, onRequestPlayback]);

  const pauseVideo = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
    setIsPlaying(false);
  }, []);

  // Stop if another video is playing (global control)
  useEffect(() => {
    if (cardId && currentlyPlayingId && currentlyPlayingId !== cardId && isPlaying) {
      pauseVideo();
    }
  }, [currentlyPlayingId, cardId, isPlaying, pauseVideo]);

  // IntersectionObserver for auto-play (both mobile and desktop)
  useEffect(() => {
    if (!videoUrl || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            // Only auto-play if no other video is playing, or request to be the playing one
            if (!currentlyPlayingId || currentlyPlayingId === cardId) {
              playVideo();
            } else if (isMobile && cardId) {
              // On mobile, auto-play takes priority
              playVideo();
            }
          } else {
            pauseVideo();
          }
        });
      },
      { threshold: [threshold] }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [videoUrl, threshold, currentlyPlayingId, cardId, isMobile, playVideo, pauseVideo]);

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
