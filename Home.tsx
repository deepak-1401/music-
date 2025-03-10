import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useSelector((state: RootState) => state.user.theme);

  // Mock featured playlists data
  const featuredPlaylists = [
    {
      id: '1',
      name: 'Top Hits 2024',
      coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      songsCount: 50,
    },
    {
      id: '2',
      name: 'Chill Vibes',
      coverUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      songsCount: 40,
    },
    {
      id: '3',
      name: 'Workout Energy',
      coverUrl: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      songsCount: 35,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for songs, artists, or albums..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              theme === 'dark'
                ? 'bg-gray-800 border-gray-700 text-white'
                : 'bg-white border-gray-200'
            } focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
        </div>
      </div>

      <section className="mb-12">
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Featured Playlists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPlaylists.map((playlist) => (
            <div
              key={playlist.id}
              className={`${
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              } rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-200`}
            >
              <img
                src={playlist.coverUrl}
                alt={playlist.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className={`font-semibold text-lg ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {playlist.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {playlist.songsCount} songs
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Recently Played
        </h2>
        {/* Add recently played songs list here */}
      </section>
    </div>
  );
};

export default Home;