interface TemperatureOvulationScreenProps {
  onNext: () => void;
}

export function TemperatureOvulationScreen({ onNext }: TemperatureOvulationScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-12 text-center pt-8">
          <h1 className="text-3xl text-purple-300 mb-8 tracking-[0.2em]">MAUV</h1>
        </div>

        {/* Title */}
        <h2 className="text-4xl text-gray-900 text-center mb-12 leading-tight px-2">
          How Your Temperature Confirms Ovulation
        </h2>

        {/* BBT Section */}
        <div className="mb-12">
          <p className="text-gray-600 mb-2">Basal Body Temperature</p>
          <h3 className="text-4xl text-gray-900 mb-3">BBT Rise</h3>
          <p className="text-gray-500">
            After Ovulation <span className="text-green-500">+0.5°F</span>
          </p>
        </div>

        {/* Temperature Graph */}
        <div className="mb-12">
          <svg width="100%" height="180" viewBox="0 0 400 180" className="mb-6">
            {/* Temperature curve */}
            <path
              d="M20,60 Q40,40 60,50 Q80,60 100,80 Q120,100 140,90 Q160,80 180,100 Q200,120 220,140 Q240,160 260,100 Q280,40 300,35 Q320,30 340,50 Q360,70 380,80"
              fill="none"
              stroke="url(#tempGradient)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            
            {/* Ovulation marker */}
            <circle cx="220" cy="140" r="6" fill="#f472b6" stroke="white" strokeWidth="2" />

            <defs>
              <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c084fc" />
                <stop offset="60%" stopColor="#f472b6" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>

          {/* Phase Labels */}
          <div className="flex justify-between px-4 text-sm">
            <span className="text-gray-500">Follicular Phase</span>
            <span className="text-pink-400">Ovulation</span>
            <span className="text-gray-500">Luteal Phase</span>
          </div>
        </div>

        {/* Explanation */}
        <p className="text-gray-500 text-center leading-relaxed mb-12 px-4">
          A sustained temperature rise for at least three days after a dip is the most reliable sign that ovulation has occurred.
        </p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-8">
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-full py-5 px-6 rounded-full bg-purple-400 text-white text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}
