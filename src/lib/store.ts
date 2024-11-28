import { create } from 'zustand';
import { GameState } from '../types/game';
import { GAME_CONFIG } from './constants';

export const useGameStore = create<GameState>((set) => ({
  playerName: localStorage.getItem('playerName') || '',
  score: 0,
  isPlaying: false,
  timeLeft: GAME_CONFIG.INITIAL_TIME,
  setPlayerName: (name) => {
    localStorage.setItem('playerName', name);
    set({ playerName: name });
  },
  setScore: (score) => set({ score }),
  setIsPlaying: (isPlaying) => {
    if (isPlaying) {
      set({ 
        timeLeft: GAME_CONFIG.INITIAL_TIME, 
        score: 0, 
        isPlaying: true 
      });
    } else {
      set({ isPlaying: false });
    }
  },
  setTimeLeft: (timeLeft) => set({ 
    timeLeft: Math.max(GAME_CONFIG.MIN_TIME, timeLeft) 
  }),
  addTime: (seconds) => set((state) => ({
    timeLeft: Math.max(
      GAME_CONFIG.MIN_TIME, 
      Math.min(GAME_CONFIG.MAX_TIME, state.timeLeft + seconds)
    )
  })),
  resetGame: () => set({ 
    score: 0, 
    isPlaying: false, 
    timeLeft: GAME_CONFIG.INITIAL_TIME 
  }),
}));