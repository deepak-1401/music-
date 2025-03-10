import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Play, Pause, SkipBack, SkipForward, Volume2, Minimize2, Maximize2 } from 'lucide-react';
import { RootState } from '../store/store';
import { togglePlay, setProgress, toggleMinimized } from '../store/playerSlice';

const MusicPlayer: React.FC = () => {
  const dispatch = useDispatch();
  const { currentSong, isPlaying, volume, progress, isMinimized } = useSelector(
    (state: RootState) => state.player
  );
  const theme = useSelector((state: RootState) => state.user.theme);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  if (!currentSong) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
      } border-t border-gray-200 dark:border-gray-700 transition-all ${
        isMinimized ? 'h-16' : 'h-24'
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <img
            src={currentSong.coverUrl}
            alt={currentSong.title}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div className={`flex flex-col ${isMinimized ? 'hidden' : ''}`}>
            <span className="font-medium">{currentSong.title}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentSong.artist}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-purple-600 transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
              onClick={() => dispatch(togglePlay())}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white" />
              )}
            </button>
            <button className="p-2 hover:text-purple-600 transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className={`w-full flex items-center gap-2 ${isMinimized ? 'hidden' : ''}`}>
            <span className="text-sm">{formatTime(progress)}</span>
            <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${(progress / currentSong.duration) * 100}%` }}
              />
            </div>
            <span className="text-sm">{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5" />
            <div className="w-24 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-full bg-purple-600 rounded-full"
                style={{ width: `${volume * 100}%` }}
              />
            </div>
          </div>
          <button
            className="p-2 hover:text-purple-600 transition-colors"
            onClick={() => dispatch(toggleMinimized())}
          >
            {isMinimized ? (
              <Maximize2 className="w-5 h-5" />
            ) : (
              <Minimize2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={(e) => dispatch(setProgress(e.currentTarget.currentTime))}
      />
    </div>
  );
};

export default MusicPlayer;