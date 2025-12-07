import { useEffect, useState } from 'react';

interface SettingUpPlanScreenProps {
  onComplete: () => void;
}

export function SettingUpPlanScreen({ onComplete }: SettingUpPlanScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const completeTimer = setTimeout(() => {
        onComplete();
      }, 500);
      return () => clearTimeout(completeTimer);
    }
  }, [progress, onComplete]);

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 right-8 w-32 h-32 rounded-full bg-purple-900/20 blur-3xl" />
      <div className="absolute bottom-1/4 left-8 w-40 h-40 rounded-full bg-purple-800/20 blur-3xl" />

      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-16 pt-12">
          <div className="flex items-center justify-center gap-2 mb-8">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-purple-300">
              <path
                d="M16 4 L20 12 L16 16 L12 12 Z M8 16 L12 20 L16 16 L12 12 Z M24 16 L20 12 L16 16 L20 20 Z M16 28 L12 20 L16 16 L20 20 Z"
                fill="currentColor"
              />
            </svg>
            <h1 className="text-2xl tracking-widest">MAUV</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-3xl text-center mb-16 px-4 leading-tight">
            Setting up your personalized plan...
          </h2>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="w-full h-2 bg-purple-950/50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-300 to-purple-400 transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-center text-gray-400 px-8 leading-relaxed">
            Join a community of women discovering their unique cycle with MAUV.
          </p>
        </div>

        {/* Continue Button */}
        <div className="pb-8">
          <button
            onClick={onComplete}
            disabled={progress < 100}
            className={`w-full py-5 px-6 rounded-full text-lg transition-all duration-300 shadow-lg mb-6 ${
              progress >= 100
                ? 'bg-purple-300 text-gray-900 hover:bg-purple-400 hover:scale-105 active:scale-95'
                : 'bg-purple-900/30 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continue
          </button>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-600" />
            <div className="w-2 h-2 rounded-full bg-gray-600" />
            <div className="w-2 h-2 rounded-full bg-gray-600" />
            <div className="w-2 h-2 rounded-full bg-purple-300" />
            <div className="w-2 h-2 rounded-full bg-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
