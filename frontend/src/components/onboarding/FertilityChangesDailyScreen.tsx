interface FertilityChangesDailyScreenProps {
  onNext: () => void;
}

export function FertilityChangesDailyScreen({ onNext }: FertilityChangesDailyScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-purple-400">
              <path
                d="M16 4 C12 8, 8 12, 16 20 C24 12, 20 8, 16 4 Z"
                fill="currentColor"
                opacity="0.3"
              />
            </svg>
            <h1 className="text-2xl text-gray-900">MAUV</h1>
          </div>

          {/* Progress Bars */}
          <div className="flex gap-3 mb-12">
            <div className="flex-1 h-1.5 rounded-full bg-purple-300" />
            <div className="flex-1 h-1.5 rounded-full bg-purple-300" />
            <div className="flex-1 h-1.5 rounded-full bg-purple-400" />
            <div className="flex-1 h-1.5 rounded-full bg-purple-200" />
            <div className="flex-1 h-1.5 rounded-full bg-purple-200" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl text-gray-900 mb-4 text-center leading-tight">
          Fertility Changes Daily
        </h2>

        <p className="text-gray-500 text-center leading-relaxed mb-12 px-4">
          Fertility isn't constant. MAUV helps identify your most fertile days based on your unique cycle.
        </p>

        {/* Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-auto">
          <div className="mb-6">
            <h3 className="text-gray-700 mb-2">Fertility Level Over Menstrual Cycle</h3>
            <div className="flex items-center justify-between">
              <span className="text-3xl text-gray-900">Peak</span>
              <span className="text-purple-400">28 Day Cycle</span>
            </div>
          </div>

          {/* Chart SVG */}
          <div className="relative mb-4">
            <svg width="100%" height="200" viewBox="0 0 400 200" className="mb-2">
              {/* Fertility curve */}
              <path
                d="M20,120 Q40,80 60,100 Q80,120 100,110 Q120,100 140,90 Q160,80 180,60 Q200,40 220,50 Q240,60 260,100 Q280,140 300,160 Q320,180 340,150 Q360,120 380,140"
                fill="none"
                stroke="#c084fc"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Period annotation */}
              <text x="60" y="140" fill="#c084fc" fontSize="14">Period</text>
              
              {/* Fertile Window annotation */}
              <text x="160" y="50" fill="#c084fc" fontSize="14">Fertile Window</text>
              
              {/* Ovulation annotation */}
              <text x="280" y="180" fill="#c084fc" fontSize="14">Ovulation</text>

              {/* Gradient fill under curve */}
              <defs>
                <linearGradient id="fertilityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#c084fc" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#c084fc" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Day labels */}
            <div className="flex justify-between px-2 mt-4">
              <span className="text-sm text-purple-400">Day 1</span>
              <span className="text-sm text-purple-400">Day 7</span>
              <span className="text-sm text-purple-400">Day 14</span>
              <span className="text-sm text-purple-400">Day 21</span>
              <span className="text-sm text-purple-400">Day 28</span>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-full py-5 px-6 rounded-full bg-purple-400 text-white text-lg transition-all duration-300 hover:bg-purple-500 hover:scale-105 active:scale-95 shadow-sm mt-8"
        >
          Next
        </button>
      </div>
    </div>
  );
}
