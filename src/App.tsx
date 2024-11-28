import React from 'react';
import { useGameStore } from './lib/store';
import { PlayerNameInput } from './components/PlayerNameInput';
import { GameArea } from './components/GameArea';
import { Timer } from './components/Timer';
import { Leaderboard } from './components/Leaderboard';
import { Target } from 'lucide-react';
import { BackgroundDots } from './components/BackgroundDots';
import { DesktopMessage } from './components/DesktopMessage';
import { useDeviceType } from './hooks/useDeviceType';

function App() {
  const { playerName } = useGameStore();
  const { isMobile } = useDeviceType();

  if (!isMobile) {
    return (
      <>
        <BackgroundDots />
        <DesktopMessage />
      </>
    );
  }

  return (
    <>
      {!playerName && <PlayerNameInput />}
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 overflow-hidden">
        <BackgroundDots />
        <div className="relative z-10 min-h-screen flex items-center justify-center py-6 md:py-12 px-4">
          {playerName && (
            <div className="w-full max-w-4xl mx-auto text-center space-y-6 md:space-y-8">
              <div className="space-y-6 md:space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2 md:space-x-3">
                    <Target className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
                    <h1 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                      Speed Dotting
                    </h1>
                    <Target className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
                  </div>
                  <p className="text-sm text-gray-300 max-w-md mx-auto">
                    Tap the green dots as quickly as you can! Each hit adds 0.25 seconds to your timer, 
                    but misses cost you 1 second. How many can you hit before time runs out?
                  </p>
                </div>
                <Timer />
                <GameArea />
                <Leaderboard />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;