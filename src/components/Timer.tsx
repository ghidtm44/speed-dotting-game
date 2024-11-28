import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../lib/store';
import { GameOverModal } from './GameOverModal';
import { Timer as TimerIcon } from 'lucide-react';
import { db } from '../lib/db';

export const Timer: React.FC = () => {
  const { timeLeft, setTimeLeft, isPlaying, setIsPlaying, score, playerName } = useGameStore();
  const [showModal, setShowModal] = useState(false);
  const lastUpdateRef = useRef<number>(0);
  const frameRef = useRef<number>();
  const gameEndingRef = useRef(false);

  const endGame = async () => {
    if (gameEndingRef.current) return;
    gameEndingRef.current = true;
    
    setIsPlaying(false);
    setTimeLeft(0);

    if (score > 0) {
      try {
        await db.saveScore(playerName, score);
        console.log('Score saved successfully:', { playerName, score });
      } catch (error) {
        console.error('Error saving score:', error);
      }
    }

    setShowModal(true);
    gameEndingRef.current = false;
  };

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      lastUpdateRef.current = Date.now();
      
      const updateTimer = () => {
        const now = Date.now();
        const delta = (now - lastUpdateRef.current) / 1000;
        lastUpdateRef.current = now;
        
        const newTime = Math.max(0, timeLeft - delta);
        setTimeLeft(newTime);
        
        if (newTime <= 0) {
          endGame();
        } else {
          frameRef.current = requestAnimationFrame(updateTimer);
        }
      };

      frameRef.current = requestAnimationFrame(updateTimer);
      
      return () => {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current);
        }
      };
    } else if (isPlaying && timeLeft <= 0) {
      endGame();
    }
  }, [isPlaying, timeLeft, setTimeLeft, setIsPlaying, score, playerName]);

  const handleCloseModal = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="text-center space-y-4 mb-6">
        <div className="flex items-center justify-center space-x-2">
          <TimerIcon className="w-8 h-8 text-green-400" />
          <div className="text-4xl font-bold text-green-400 score-glow">
            {Math.max(0, timeLeft).toFixed(1)}s
          </div>
        </div>
        <div className="text-2xl font-bold text-white">Score: {score}</div>
      </div>
      
      {showModal && (
        <GameOverModal score={score} onClose={handleCloseModal} />
      )}
    </>
  );
};