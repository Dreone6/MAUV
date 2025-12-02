import React, { useEffect, useState } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Auto-advance after video ends or 5 seconds
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onComplete();
      }, 1000); // 1 second fade out
    }, 5000); // 5 seconds total

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        onEnded={() => {
          setFadeOut(true);
          setTimeout(onComplete, 1000);
        }}
      >
        <source src="/splash_screen.mp4" type="video/mp4" />
      </video>

      {/* MAUV Logo Overlay (if you want to add logo on top of video) */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <img 
          src="/mauv_logo.png" 
          alt="MAUV" 
          className="w-32 h-32 mb-4 animate-pulse"
        />
        <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">
          MAUV
        </h1>
        <p className="text-white/80 text-lg">Personal Tracker</p>
      </div>

      {/* Tap to skip indicator */}
      <button
        onClick={() => {
          setFadeOut(true);
          setTimeout(onComplete, 500);
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm hover:text-white transition-colors"
      >
        Tap to skip →
      </button>
    </div>
  );
};

export default SplashScreen;
