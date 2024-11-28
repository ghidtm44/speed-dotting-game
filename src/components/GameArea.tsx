import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useGameStore } from '../lib/store';
import { Play } from 'lucide-react';

export const GameArea: React.FC = () => {
  const { score, setScore, isPlaying, addTime } = useGameStore();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [containerSize, setContainerSize] = useState({ width: 500, height: 500 });
  const [isMiss, setIsMiss] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const processingTouchRef = useRef(false);

  const updateContainerSize = useCallback(() => {
    const width = Math.min(500, window.innerWidth - 32);
    const height = width;
    setContainerSize({ width, height });
  }, []);

  useEffect(() => {
    updateContainerSize();
    window.addEventListener('resize', updateContainerSize);
    return () => window.removeEventListener('resize', updateContainerSize);
  }, [updateContainerSize]);

  const moveTarget = useCallback(() => {
    const x = Math.random() * 90;
    const y = Math.random() * 90;
    setPosition({ x, y });
  }, []);

  const isHit = useCallback((clientX: number, clientY: number): boolean => {
    if (!containerRef.current || !dotRef.current) return false;

    const containerRect = containerRef.current.getBoundingClientRect();
    const dotRect = dotRef.current.getBoundingClientRect();
    
    // Get relative coordinates within the container
    const relativeX = clientX - containerRect.left;
    const relativeY = clientY - containerRect.top;

    // Get dot center coordinates relative to container
    const dotCenterX = dotRect.left - containerRect.left + (dotRect.width / 2);
    const dotCenterY = dotRect.top - containerRect.top + (dotRect.height / 2);
    
    // Calculate distance from touch point to dot center
    const distance = Math.sqrt(
      Math.pow(relativeX - dotCenterX, 2) + 
      Math.pow(relativeY - dotCenterY, 2)
    );
    
    // Use dot width as hit radius
    return distance <= dotRect.width;
  }, []);

  const handleTouch = useCallback((e: React.TouchEvent) => {
    if (!isPlaying || processingTouchRef.current) return;
    
    e.preventDefault();
    processingTouchRef.current = true;

    const touch = e.touches[0];
    if (isHit(touch.clientX, touch.clientY)) {
      setScore(score + 1);
      addTime(0.25); // Add 0.25 seconds for a hit
      moveTarget();
    } else {
      setIsMiss(true);
      setTimeout(() => setIsMiss(false), 200);
      addTime(-1);
    }

    // Reset processing flag after a short delay
    setTimeout(() => {
      processingTouchRef.current = false;
    }, 50);
  }, [isPlaying, score, setScore, moveTarget, addTime, isHit]);

  useEffect(() => {
    if (isPlaying) {
      moveTarget();
    }
  }, [isPlaying, moveTarget]);

  const containerClasses = `game-container relative rounded-2xl shadow-2xl border-4 overflow-hidden mx-auto transition-colors duration-200 ${
    isMiss ? 'border-red-500' : 'border-green-400'
  }`;

  return (
    <div 
      ref={containerRef}
      className={containerClasses}
      style={{ width: containerSize.width, height: containerSize.height }}
      onTouchStart={handleTouch}
    >
      {isPlaying ? (
        <div
          ref={dotRef}
          style={{ left: `${position.x}%`, top: `${position.y}%` }}
          className="absolute w-12 h-12 md:w-10 md:h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:from-green-500 hover:to-green-600 transition-all shadow-lg dot-target touch-none"
          aria-label="Target dot"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white to-gray-50">
          <StartButton />
        </div>
      )}
    </div>
  );
};

const StartButton: React.FC = () => {
  const { resetGame, setIsPlaying } = useGameStore();

  const startGame = () => {
    resetGame();
    setIsPlaying(true);
  };

  return (
    <button
      onClick={startGame}
      className="group px-6 py-4 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-xl hover:from-green-500 hover:to-green-600 transition-all font-bold text-lg md:text-xl shadow-lg transform hover:scale-105 flex items-center space-x-2"
    >
      <Play className="w-5 h-5 md:w-6 md:h-6 transform group-hover:scale-110 transition-transform" />
      <span>Start Game</span>
    </button>
  );
};