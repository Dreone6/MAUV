import { ArrowLeft } from 'lucide-react@0.487.0';

interface LHSurgeScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function LHSurgeScreen({ onBack, onNext }: LHSurgeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all duration-300 mb-6"
          >
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>

          <h1 className="text-center text-xl text-gray-900 mb-6">MAUV</h1>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-purple-300" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl text-gray-900 mb-8 text-center leading-tight">
          Predicting Ovulation with Your LH Surge
        </h2>

        {/* Chart Section */}
        <div className="mb-8">
          <h3 className="text-gray-900 mb-4">How LH Predicts Ovulation</h3>
          <div className="mb-2">
            <h4 className="text-2xl text-gray-900 mb-1">LH Level</h4>
            <p className="text-purple-400">Days of Your Cycle</p>
          </div>

          {/* Chart */}
          <div className="relative mb-6">
            {/* LH Surge annotation */}
            <div className="absolute top-8 right-12 bg-purple-100 px-4 py-2 rounded-2xl">
              <p className="text-sm text-purple-600">LH Surge triggers</p>
              <p className="text-sm text-purple-600">Ovulation</p>
            </div>

            <svg width="100%" height="200" viewBox="0 0 400 200" className="mb-4">
              {/* Grid lines */}
              <line x1="0" y1="180" x2="400" y2="180" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* LH Level curve */}
              <path
                d="M20,100 Q60,60 80,80 Q100,100 120,90 Q140,80 160,100 Q180,120 200,140 Q220,160 240,130 Q260,100 280,60 Q300,20 320,50 Q340,80 360,100 Q380,120 400,140"
                fill="none"
                stroke="url(#lhGradient)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="lhGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#e879f9" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#e879f9" />
                </linearGradient>
              </defs>
            </svg>

            {/* Day labels */}
            <div className="flex justify-between px-2">
              <span className="text-sm text-purple-400">Day 12</span>
              <span className="text-sm text-purple-400">Day 13</span>
              <span className="text-sm text-purple-400">Day 14</span>
              <span className="text-sm text-purple-400">Day 15</span>
              <span className="text-sm text-purple-400">Day 16</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-center leading-relaxed mb-auto px-4">
          A surge in Luteinizing Hormone (LH) is your body's signal to release an egg. Tracking this peak is the most accurate way to predict when you will ovulate.
        </p>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-full py-5 px-6 rounded-full bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg mt-8"
        >
          Next
        </button>
      </div>
    </div>
  );
}