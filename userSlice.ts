import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserState, Song, Playlist } from '../types/music';

const initialState: UserState = {
  favorites: [],
  playlists: [],
  downloadedSongs: [],
  theme: 'light',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Song>) => {
      const songIndex = state.favorites.findIndex(s => s.id === action.payload.id);
      if (songIndex === -1) {
        state.favorites.push(action.payload);
      } else {
        state.favorites.splice(songIndex, 1);
      }
    },
    createPlaylist: (state, action: PayloadAction<Playlist>) => {
      state.playlists.push(action.payload);
    },
    addToPlaylist: (state, action: PayloadAction<{ playlistId: string; song: Song }>) => {
      const playlist = state.playlists.find(p => p.id === action.payload.playlistId);
      if (playlist) {
        playlist.songs.push(action.payload.song);
      }
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    downloadSong: (state, action: PayloadAction<Song>) => {
      if (!state.downloadedSongs.find(s => s.id === action.payload.id)) {
        state.downloadedSongs.push(action.payload);
      }
    },
  },
});

export const {
  toggleFavorite,
  createPlaylist,
  addToPlaylist,
  toggleTheme,
  downloadSong,
} = userSlice.actions;

export default userSlice.reducer;