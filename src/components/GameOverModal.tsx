import React from 'react';
import { Trophy } from 'lucide-react';

interface GameOverModalProps {
  score: number;
  onClose: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ score, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50 px-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border-2 border-green-400 max-w-md w-full relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-100 rounded-full opacity-50" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-100 rounded-full opacity-50" />
        
        <div className="relative z-10 text-center">
          <div className="flex justify-center mb-4">
            <Trophy className="w-12 h-12 md:w-16 md:h-16 text-yellow-500" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-2">Game Over!</h2>
          <div className="py-4 md:py-6">
            <p className="text-lg md:text-xl mb-2">Your final score:</p>
            <p className="text-3xl md:text-4xl font-bold text-green-500">{score}</p>
          </div>
          
          <div className="space-y-2">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-bold text-base md:text-lg"
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};