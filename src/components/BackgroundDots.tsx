import React, { useEffect, useState } from 'react';

interface Dot {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export const BackgroundDots: React.FC = () => {
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const createDot = (): Dot => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      opacity: Math.random() * 0.15 + 0.05,
      speed: Math.random() * 0.5 + 0.2,
    });

    const initialDots = Array.from({ length: 30 }, createDot);
    setDots(initialDots);

    const interval = setInterval(() => {
      setDots(prevDots =>
        prevDots.map(dot => ({
          ...dot,
          y: dot.y - dot.speed,
          ...(dot.y < -10 && {
            y: 110,
            x: Math.random() * 100,
          }),
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {dots.map(dot => (
        <div
          key={dot.id}
          className="absolute rounded-full bg-green-400"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
            transition: 'top 0.05s linear',
            filter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
};