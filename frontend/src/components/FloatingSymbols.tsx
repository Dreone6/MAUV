import React from 'react';

const FloatingSymbols: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30">
      {/* Venus Symbol */}
      <div className="absolute top-10 left-10 text-primary/40 animate-float-slow">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 15v7m-4-4h8m-4-19a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
        </svg>
      </div>
      
      {/* Moon Symbol */}
      <div className="absolute top-1/4 right-10 text-secondary-lavender/50 animate-float-medium">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>

      {/* Flower/Lotus */}
      <div className="absolute bottom-1/3 left-1/4 text-secondary-light-pink/40 animate-float-fast">
         <span className="material-symbols-outlined text-6xl">local_florist</span>
      </div>

      {/* Heart */}
      <div className="absolute top-1/2 right-1/3 text-accent-coral/20 animate-float-slow" style={{ animationDelay: '1s' }}>
        <span className="material-symbols-outlined text-5xl">favorite</span>
      </div>

      {/* Another Venus */}
      <div className="absolute bottom-20 right-20 text-primary/30 animate-float-medium" style={{ animationDelay: '2s' }}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 15v7m-4-4h8m-4-19a7 7 0 1 0 0 14 7 7 0 0 0 0-14z" />
        </svg>
      </div>

      {/* Sparkles */}
      <div className="absolute top-20 right-1/2 text-secondary-baby-blue/40 animate-pulse">
        <span className="material-symbols-outlined text-4xl">auto_awesome</span>
      </div>
    </div>
  );
};

export default FloatingSymbols;
