import React, { useState } from 'react';
import { useGameStore } from '../lib/store';

export const PlayerNameInput: React.FC = () => {
  const [name, setName] = useState('');
  const { setPlayerName } = useGameStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setPlayerName(name.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50 px-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl border-2 border-green-400 max-w-md w-full">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-green-600">
          Enter Your Name
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-500 text-base md:text-lg"
            placeholder="Your name"
            required
            autoFocus
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-base md:text-lg"
          >
            Start Playing
          </button>
        </form>
      </div>
    </div>
  );
};