export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  genre: string;
}

export interface Playlist {
  id: string;
  name: string;
  songs: Song[];
  coverUrl: string;
  createdBy: string;
}

export interface UserState {
  favorites: Song[];
  playlists: Playlist[];
  downloadedSongs: Song[];
  theme: 'light' | 'dark';
}

export interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  progress: number;
  queue: Song[];
  isMinimized: boolean;
}