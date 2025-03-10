import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PlayerState, Song } from '../types/music';

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  volume: 1,
  progress: 0,
  queue: [],
  isMinimized: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<Song>) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    togglePlay: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    addToQueue: (state, action: PayloadAction<Song>) => {
      state.queue.push(action.payload);
    },
    toggleMinimized: (state) => {
      state.isMinimized = !state.isMinimized;
    },
  },
});

export const {
  setCurrentSong,
  togglePlay,
  setVolume,
  setProgress,
  addToQueue,
  toggleMinimized,
} = playerSlice.actions;

export default playerSlice.reducer;