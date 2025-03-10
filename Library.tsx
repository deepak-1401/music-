import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { Search, Filter, Play, Heart } from 'lucide-react';
import { setCurrentSong } from '../store/playerSlice';
import { toggleFavorite } from '../store/userSlice';

const Library: React.FC = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const theme = useSelector((state: RootState) => state.user.theme);
  const favorites = useSelector((state: RootState) => state.user.favorites);

  const genres = [
    'All',
    'Pop',
    'Rock',
    'Hip Hop',
    'Electronic',
    'Jazz',
    'Classical',
    'R&B',
  ];

  // Mock library data with audio URLs
  const songs = [
    {
      id: '1',
      title: 'Summer Breeze',
      artist: 'Coastal Dreams',
      album: 'Ocean Waves',
      genre: 'Electronic',
      duration: 237,
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: '2',
      title: 'City Lights',
      artist: 'Urban Echo',
      album: 'Midnight Drive',
      genre: 'Pop',
      duration: 198,
      coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
    {
      id: '3',
      title: 'Mountain High',
      artist: 'Nature\'s Call',
      album: 'Wilderness',
      genre: 'Rock',
      duration: 245,
      coverUrl: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    },
  ];

  const filteredSongs = songs.filter(song => {
    const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         song.album.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || song.genre.toLowerCase() === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const isFavorite = (songId: string) => favorites.some(song => song.id === songId);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search your library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className={`pl-10 pr-4 py-2 rounded-lg border appearance-none ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre.toLowerCase()}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredSongs.map((song) => (
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
                className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  isFavorite(song.id) ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                <Heart className="w-5 h-5" fill={isFavorite(song.id) ? 'currentColor' : 'none'} />
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
    </div>
  );
};

export default Library;