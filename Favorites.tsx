import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Heart, Play, Trash2 } from 'lucide-react';
import { setCurrentSong } from '../store/playerSlice';
import { toggleFavorite } from '../store/userSlice';

const Favorites: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.user.theme);
  const favorites = useSelector((state: RootState) => state.user.favorites);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Heart className="w-8 h-8 text-purple-600" />
        <h1 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Your Favorites
        </h1>
      </div>

      {favorites.length === 0 ? (
        <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          <Heart className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No favorite songs yet</p>
          <p className="mt-2">Start adding songs to your favorites!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map((song) => (
            <div
              key={song.id}
              className={`${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow flex items-center gap-4`}
            >
              <img
                src={song.coverUrl}
                alt={song.title}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {song.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {song.artist} • {song.album}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => dispatch(toggleFavorite(song))}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => dispatch(setCurrentSong(song))}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-purple-600"
                >
                  <Play className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400 min-w-[45px]">
                  {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;