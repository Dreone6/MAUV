import { useEffect } from 'react';
import mauvLogo from 'figma:asset/c9e241a3fa1cc3d3cb93a457985667ea8e43a8c8.png';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 6000); // 6 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] via-purple-900/50 to-[#1a0f2e] flex items-center justify-center overflow-hidden relative">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 animate-pulse" />

      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-purple-300/30 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Logo container */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Outer glow ring */}
        <div className="absolute inset-0 -m-20 animate-glow-expand">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400/30 to-pink-400/30 blur-3xl" />
        </div>

        {/* Text Logo - appears first */}
        <div className="text-center mb-8 animate-scale-in">
          <h1 className="text-6xl tracking-wider bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent mb-2">
            MAUV
          </h1>
          <p className="text-gray-300 tracking-[0.3em] text-sm animate-fade-in-delay">
            PERSONAL TRACKER
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2 mt-64 animate-fade-in-late">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-bounce-dot"
              style={{ animationDelay: `${3.5 + i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0; }
          50% { transform: translateY(-30px); opacity: 1; }
        }
        
        @keyframes glow-expand {
          0% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 0.5; transform: scale(1.5); }
          100% { opacity: 0; transform: scale(1.8); }
        }
        
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        
        @keyframes fade-in-delay {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes fly-up {
          0% { opacity: 0; transform: translateY(200px) scale(0.3); }
          70% { transform: translateY(-120px) scale(0.7); }
          100% { opacity: 1; transform: translateY(-120px) scale(0.6); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(167, 139, 250, 0.3)); }
          50% { filter: drop-shadow(0 0 40px rgba(236, 72, 153, 0.4)); }
        }
        
        @keyframes bounce-dot {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 1; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-glow-expand {
          animation: glow-expand 6s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scale-in 1s ease-out forwards;
        }
        
        .animate-fade-in-delay {
          animation: fade-in-delay 0.5s ease-out 0.5s forwards;
          opacity: 0;
        }
        
        .animate-fly-up {
          animation: fly-up 1.5s ease-out 1s forwards;
          opacity: 0;
        }
        
        .animate-glow-pulse {
          animation: glow-pulse 3s ease-in-out 2.5s 2;
        }
        
        .animate-fade-in-late {
          animation: fade-in-delay 0.5s ease-out 3s forwards;
          opacity: 0;
        }
        
        .animate-bounce-dot {
          animation: bounce-dot 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}