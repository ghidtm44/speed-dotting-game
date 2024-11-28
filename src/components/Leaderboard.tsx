import React, { useEffect, useState } from 'react';
import { Trophy } from 'lucide-react';
import { db } from '../lib/db';

interface Score {
  id: number;
  player_name: string;
  score: number;
  created_at: string;
}

export const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState<Score[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [containerWidth, setContainerWidth] = useState(500);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateWidth = () => {
      setContainerWidth(Math.min(500, window.innerWidth - 32));
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const fetchScores = async () => {
    try {
      setIsLoading(true);
      const data = await db.getTopScores();
      setScores(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching scores:', err);
      setError('Failed to load scores');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScores();

    const subscription = db.subscribeToScores(fetchScores);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div 
      className="mt-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl p-4 md:p-6 border-2 border-green-400 mx-auto"
      style={{ width: containerWidth }}
    >
      <div className="flex items-center justify-center space-x-2 mb-4 md:mb-6">
        <Trophy className="w-5 h-5 md:w-6 md:h-6 text-yellow-500" />
        <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
          Top Scores
        </h2>
      </div>

      {isLoading ? (
        <div className="text-center py-4 text-gray-500">Loading scores...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : scores.length === 0 ? (
        <div className="text-gray-500 text-center py-4">No scores yet. Be the first!</div>
      ) : (
        <div className="space-y-2">
          {scores.map((score, index) => (
            <div
              key={score.id}
              className="flex justify-between items-center p-2 md:p-3 rounded-lg bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-colors"
            >
              <span className="font-medium flex items-center text-sm md:text-base">
                <span className="w-6 md:w-8 text-green-600">{index + 1}.</span>
                {score.player_name}
              </span>
              <span className="text-green-600 font-bold text-sm md:text-base">{score.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};