import { ArrowLeft } from 'lucide-react@0.487.0';

interface TrackingSmarterScreenProps {
  onBack: () => void;
  onStartJourney: () => void;
}

export function TrackingSmarterScreen({ onBack, onStartJourney }: TrackingSmarterScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 text-gray-800 p-6 flex flex-col relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-32 left-8 w-3 h-3 rounded-full bg-pink-300/40" />
      <div className="absolute top-60 left-12 w-2 h-2 rounded-full bg-purple-300/40" />
      <div className="absolute top-52 left-20 w-2.5 h-2.5 rounded-full bg-pink-200/40" />
      <div className="absolute top-72 left-16 w-2 h-2 rounded-full bg-purple-200/40" />
      <div className="absolute top-96 left-14 w-3 h-3 rounded-full bg-pink-300/40" />
      
      {/* Curved line graphic */}
      <div className="absolute top-80 right-12">
        <svg width="150" height="60" viewBox="0 0 150 60" fill="none">
          <path 
            d="M10 30 Q 40 10, 70 30 T 130 30" 
            stroke="url(#gradient)" 
            strokeWidth="4" 
            fill="none"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D8B4FE" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
          </defs>
        </svg>
        {/* Arrow */}
        <div className="absolute -left-16 top-5">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <path d="M10 20 L25 20 M20 15 L25 20 L20 25" stroke="#C084FC" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <button
        onClick={onBack}
        className="self-start w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white transition-all duration-300 mb-8 shadow-sm"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>

      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-xl text-gray-700 mb-12">MAUV</h1>
          
          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-32">
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          </div>
        </div>

        {/* Main Content */}
        <div className="text-center mb-auto">
          <h2 className="text-3xl text-gray-900 mb-6">
            The more you track, the smarter MAUV gets.
          </h2>
          <p className="text-gray-600 leading-relaxed px-2">
            Logging symptoms, moods, and cycle days helps the app provide more personalized and accurate predictions for your fertility and period.
          </p>
        </div>

        {/* Bottom Section */}
        <div className="mt-12">
          <button
            onClick={onStartJourney}
            className="w-full py-4 px-6 rounded-full bg-purple-300 text-gray-900 transition-all duration-300 hover:bg-purple-400 hover:scale-105 active:scale-95 shadow-sm mb-4"
          >
            Start My Journey
          </button>
          
          <button className="w-full text-gray-500 hover:text-gray-700 transition-colors text-sm">
            Our Privacy Promise
          </button>
        </div>
      </div>
    </div>
  );
}