import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Home, Library, Heart, PlayCircle, Download, Sun, Moon } from 'lucide-react';
import { toggleTheme } from '../store/userSlice';
import { RootState } from '../store/store';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.user.theme);

  return (
    <div className={`w-64 h-screen fixed left-0 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'} p-6 border-r border-gray-200 dark:border-gray-700`}>
      <div className="flex items-center gap-2 mb-8">
        <PlayCircle className="w-8 h-8 text-purple-600" />
        <h1 className="text-xl font-bold">RythimicTunes</h1>
      </div>

      <nav className="space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <Home className="w-5 h-5" />
          Home
        </NavLink>

        <NavLink
          to="/library"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <Library className="w-5 h-5" />
          Library
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <Heart className="w-5 h-5" />
          Favorites
        </NavLink>

        <NavLink
          to="/downloads"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition-colors ${
              isActive
                ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`
          }
        >
          <Download className="w-5 h-5" />
          Downloads
        </NavLink>
      </nav>

      <button
        onClick={() => dispatch(toggleTheme())}
        className="absolute bottom-6 left-6 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default Sidebar;