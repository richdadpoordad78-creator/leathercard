
import React, { useState, useCallback } from 'react';
import BusinessCard from './components/BusinessCard';
import { INITIAL_DETAILS } from './constants';
import { LeatherTexture, FoilColor } from './types';

const App: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = useCallback(() => {
    setIsFlipped(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-12 bg-[#080808] overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#d4af37] opacity-[0.02] blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white opacity-[0.01] blur-[100px] rounded-full pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-20 text-center z-10">
        <h1 className="font-cinzel text-xs md:text-sm tracking-[1em] text-[#d4af37] opacity-40 uppercase">
          Mozhdeh Leather
        </h1>
      </div>

      {/* Presentation of the Single Premium Card */}
      <div className="relative group">
        {/* Realistic Floor Shadow */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[90%] h-12 bg-black/60 blur-3xl rounded-[100%] scale-y-50" />
        
        <BusinessCard 
          details={INITIAL_DETAILS} 
          isFlipped={isFlipped} 
          texture={LeatherTexture.PEBBLED} 
          foil={FoilColor.GOLD} 
          onFlip={toggleFlip}
        />
      </div>

      {/* Interaction Hint */}
      <div className="mt-24 flex flex-col items-center gap-6 opacity-30 hover:opacity-100 transition-opacity duration-700 cursor-pointer group" onClick={toggleFlip}>
        <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-[#d4af37]/50 to-transparent group-hover:via-[#d4af37] transition-all duration-500" />
        <p className="text-[9px] uppercase tracking-[0.6em] font-light text-[#f5f5dc] italic">
          Click to experience the reveal
        </p>
      </div>

      {/* Subtle Bottom Attribution */}
      <footer className="fixed bottom-10 w-full text-center px-4 pointer-events-none">
        <p className="text-[8px] tracking-[0.8em] uppercase text-white/5 font-cinzel">
          The Art of the Hide
        </p>
      </footer>
    </div>
  );
};

export default App;
