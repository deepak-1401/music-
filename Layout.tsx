import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import MusicPlayer from './MusicPlayer';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const Layout: React.FC = () => {
  const theme = useSelector((state: RootState) => state.user.theme);
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto pb-24">
          <Outlet />
        </main>
      </div>
      <MusicPlayer />
    </div>
  );
};

export default Layout;