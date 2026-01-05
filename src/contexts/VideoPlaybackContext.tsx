import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface VideoPlaybackContextType {
  currentlyPlayingId: string | null;
  setCurrentlyPlaying: (id: string | null) => void;
  requestPlayback: (id: string) => boolean;
}

const VideoPlaybackContext = createContext<VideoPlaybackContextType | undefined>(undefined);

export function VideoPlaybackProvider({ children }: { children: ReactNode }) {
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);

  const setCurrentlyPlaying = useCallback((id: string | null) => {
    setCurrentlyPlayingId(id);
  }, []);

  const requestPlayback = useCallback((id: string) => {
    setCurrentlyPlayingId(id);
    return true;
  }, []);

  return (
    <VideoPlaybackContext.Provider value={{ currentlyPlayingId, setCurrentlyPlaying, requestPlayback }}>
      {children}
    </VideoPlaybackContext.Provider>
  );
}

export function useVideoPlayback() {
  const context = useContext(VideoPlaybackContext);
  if (!context) {
    throw new Error('useVideoPlayback must be used within VideoPlaybackProvider');
  }
  return context;
}
