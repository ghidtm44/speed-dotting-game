export interface Score {
  id: number;
  player_name: string;
  score: number;
  updated_at: string;
}

export interface GameState {
  playerName: string;
  score: number;
  isPlaying: boolean;
  timeLeft: number;
  setPlayerName: (name: string) => void;
  setScore: (score: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setTimeLeft: (timeLeft: number) => void;
  resetGame: () => void;
  addTime: (seconds: number) => void;
}