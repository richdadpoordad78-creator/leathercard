
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import { CardDetails, LeatherTexture, FoilColor } from '../types';
import { THEME, FOIL_STYLES } from '../constants';

interface BusinessCardProps {
  details: CardDetails;
  isFlipped: boolean;
  texture: LeatherTexture;
  foil: FoilColor;
  onFlip: () => void;
}

const OrnateBorder = () => (
  <div className="absolute inset-0 pointer-events-none p-4 md:p-6 transition-transform duration-500 ease-out" style={{ transform: 'translateZ(15px)' }}>
    <svg className="absolute top-2 left-2 w-12 h-12 md:w-24 md:h-24 fill-[#d4af37]" viewBox="0 0 100 100">
      <path d="M10,10 L40,10 L40,12 L12,12 L12,40 L10,40 Z M20,20 L30,20 L30,22 L22,22 L22,30 L20,30 Z" opacity="0.8" />
      <path d="M0,20 C0,10 10,0 20,0 L20,2 L10,2 C5,2 2,5 2,10 L2,20 Z" />
      <circle cx="5" cy="5" r="2" />
    </svg>
    <svg className="absolute top-2 right-2 w-12 h-12 md:w-24 md:h-24 fill-[#d4af37] rotate-90" viewBox="0 0 100 100">
      <path d="M10,10 L40,10 L40,12 L12,12 L12,40 L10,40 Z M20,20 L30,20 L30,22 L22,22 L22,30 L20,30 Z" opacity="0.8" />
      <path d="M0,20 C0,10 10,0 20,0 L20,2 L10,2 C5,2 2,5 2,10 L2,20 Z" />
      <circle cx="5" cy="5" r="2" />
    </svg>
    <svg className="absolute bottom-2 left-2 w-12 h-12 md:w-24 md:h-24 fill-[#d4af37] -rotate-90" viewBox="0 0 100 100">
      <path d="M10,10 L40,10 L40,12 L12,12 L12,40 L10,40 Z M20,20 L30,20 L30,22 L22,22 L22,30 L20,30 Z" opacity="0.8" />
      <path d="M0,20 C0,10 10,0 20,0 L20,2 L10,2 C5,2 2,5 2,10 L2,20 Z" />
      <circle cx="5" cy="5" r="2" />
    </svg>
    <svg className="absolute bottom-2 right-2 w-12 h-12 md:w-24 md:h-24 fill-[#d4af37] rotate-180" viewBox="0 0 100 100">
      <path d="M10,10 L40,10 L40,12 L12,12 L12,40 L10,40 Z M20,20 L30,20 L30,22 L22,22 L22,30 L20,30 Z" opacity="0.8" />
      <path d="M0,20 C0,10 10,0 20,0 L20,2 L10,2 C5,2 2,5 2,10 L2,20 Z" />
      <circle cx="5" cy="5" r="2" />
    </svg>
    <div className="absolute top-1/2 left-2 -translate-y-1/2 w-4 h-[60%] border-l border-dashed border-[#d4af37]/30" />
    <div className="absolute top-1/2 right-2 -translate-y-1/2 w-4 h-[60%] border-r border-dashed border-[#d4af37]/30" />
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[60%] h-4 border-t border-dashed border-[#d4af37]/30" />
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[60%] h-4 border-b border-dashed border-[#d4af37]/30" />
  </div>
);

const BusinessCard: React.FC<BusinessCardProps> = ({ details, isFlipped, onFlip }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ opacity: 0, x: 50, y: 50 });
  const foilClass = `${THEME.text.goldGradient} foil-shimmer`;
  const textureBg = THEME.background.matteBlack;
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-float effect when idle
  const [floatOffset, setFloatOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let frame: number;
    const animate = (time: number) => {
      if (tilt.x === 0 && tilt.y === 0) {
        setFloatOffset({
          x: Math.sin(time / 2000) * 1.5,
          y: Math.cos(time / 1500) * 1.5
        });
      } else {
        setFloatOffset({ x: 0, y: 0 });
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [tilt]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12; // Increased sensitivity for better parallax feel
    const rotateY = ((x - centerX) / centerX) * 12;
    
    setTilt({ x: rotateX, y: rotateY });
    setGlare({ 
      opacity: 0.15, 
      x: (x / rect.width) * 100, 
      y: (y / rect.height) * 100 
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setGlare({ opacity: 0, x: 50, y: 50 });
  }, []);

  const currentRotateY = (isFlipped ? 180 : 0) + tilt.y + floatOffset.y;
  const currentRotateX = tilt.x + floatOffset.x;

  return (
    <div 
      ref={cardRef}
      className="relative w-[340px] h-[195px] md:w-[640px] md:h-[360px] perspective-1000 cursor-pointer group select-none transition-transform duration-200"
      onClick={onFlip}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="relative w-full h-full preserve-3d transition-transform-custom card-shadow"
        style={{ transform: `rotateY(${currentRotateY}deg) rotateX(${currentRotateX}deg)` }}
      >
        {/* Front Side */}
        <div className={`absolute inset-0 w-full h-full backface-hidden rounded-[2px] overflow-hidden ${textureBg} border border-white/5 leather-texture p-12 md:p-16 flex flex-col justify-center preserve-3d`}>
          {/* Layer 0: Texture and Base Glare */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{ 
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.3) 0%, transparent 60%)` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-transparent to-white/[0.05] pointer-events-none" />
          
          {/* Layer 1: Ornate Border (Mid-depth) */}
          <OrnateBorder />
          
          {/* Layer 2: Main Content (High-depth) */}
          <div className="relative z-10 w-full preserve-3d" style={{ transform: 'translateZ(40px)' }}>
            <div className="text-center mb-8 md:mb-12">
              <h1 className={`text-2xl md:text-5xl font-cinzel tracking-[0.4em] ${foilClass} drop-shadow-[0_4px_15px_rgba(191,149,63,0.5)]`}>
                MOZHDEH LEATHER
              </h1>
            </div>

            <div className="flex justify-between items-center w-full px-4 md:px-8">
              <div className="space-y-2 md:space-y-4 text-left">
                <div className="flex flex-col md:flex-row md:gap-2">
                  <span className={`text-[10px] md:text-sm font-cinzel tracking-widest ${THEME.text.goldGradient}`}>NAME :</span>
                  <span className="text-[10px] md:text-sm font-sans tracking-[0.2em] text-[#fdfcf0] font-light">
                    {details.ownerName.toUpperCase()}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:gap-2">
                  <span className={`text-[10px] md:text-sm font-cinzel tracking-widest ${THEME.text.goldGradient}`}>NUMBER:</span>
                  <span className="text-[10px] md:text-sm font-sans tracking-[0.2em] text-[#fdfcf0] font-light">
                    {details.phone}
                  </span>
                </div>
              </div>

              {/* QR Code with its own depth */}
              <div className="relative p-1 bg-white/5 border border-[#d4af37]/20 rounded-sm" style={{ transform: 'translateZ(10px)' }}>
                <div className="w-16 h-16 md:w-28 md:h-28 bg-[#1a1a1a] flex items-center justify-center p-1 border border-[#d4af37]/10 overflow-hidden">
                   <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-0.5 opacity-60">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className={`rounded-[1px] ${Math.random() > 0.4 ? 'bg-[#d4af37]/80' : 'bg-transparent'}`} />
                      ))}
                   </div>
                </div>
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-[#d4af37]" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-[#d4af37]" />
              </div>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[2px] overflow-hidden ${textureBg} border border-white/5 leather-texture p-12 md:p-16 flex flex-col justify-between preserve-3d`}>
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{ 
              opacity: glare.opacity,
              background: `radial-gradient(circle at ${100 - glare.x}% ${glare.y}%, rgba(255,255,255,0.3) 0%, transparent 60%)` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-bl from-white/[0.04] via-transparent to-black/90 pointer-events-none" />
          <OrnateBorder />

          <div className="relative z-10 mt-4 md:mt-8 preserve-3d" style={{ transform: 'translateZ(30px)' }}>
             <h2 className={`text-xl md:text-3xl font-serif-luxury font-bold mb-1 tracking-wider ${foilClass}`}>
                {details.brandName}
              </h2>
              <p className={`text-[8px] md:text-[10px] uppercase tracking-[0.4em] ${THEME.text.cream} opacity-50`}>
                {details.slogan}
              </p>
          </div>

          <div className={`relative z-10 grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-6 text-[9px] md:text-[11px] ${THEME.text.cream} opacity-80 font-light tracking-[0.2em] preserve-3d`} style={{ transform: 'translateZ(25px)' }}>
            <div className="flex items-center gap-3">
              <Mail size={12} className="text-[#d4af37] opacity-60" />
              <span className="truncate">{details.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe size={12} className="text-[#d4af37] opacity-60" />
              <span>{details.website}</span>
            </div>
            <div className="flex items-center gap-3 md:col-span-2">
              <MapPin size={12} className="text-[#d4af37] opacity-60" />
              <span>{details.location}</span>
            </div>
          </div>

          <div className="relative z-10 text-center border-t border-white/5 pt-6 mt-4 preserve-3d" style={{ transform: 'translateZ(20px)' }}>
             <p className={`text-[10px] md:text-xs uppercase tracking-[0.5em] italic font-serif-luxury ${THEME.text.gold} opacity-90`}>
              {details.footerSlogan}
            </p>
            <p className={`text-[7px] md:text-[9px] tracking-[0.3em] ${THEME.text.cream} uppercase opacity-30 mt-1`}>
              {details.categories}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
