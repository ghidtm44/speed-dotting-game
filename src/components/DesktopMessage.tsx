import React from 'react';
import { Smartphone } from 'lucide-react';

export const DesktopMessage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto text-center space-y-6 border border-white/20">
        <div className="flex justify-center">
          <Smartphone className="w-16 h-16 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
          Speed Dotting
        </h1>
        <p className="text-gray-300 text-lg">
          This game is better on mobile! Please try it from your phone or tablet.
        </p>
        <div className="pt-4">
          <div className="animate-bounce text-green-400 text-4xl">📱</div>
        </div>
      </div>
    </div>
  );
};