interface HormonalRhythmScreenProps {
  onNext: () => void;
}

export function HormonalRhythmScreen({ onNext }: HormonalRhythmScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-center text-xl text-gray-900 mb-6">MAUV</h1>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl text-gray-900 mb-4 text-center leading-tight">
          Understand Your Hormonal Rhythm
        </h2>

        <p className="text-gray-600 text-center leading-relaxed mb-12 px-4">
          Hormones like Estrogen and Progesterone fluctuate throughout your cycle, influencing mood, energy, and physical symptoms.
        </p>

        {/* Chart Section */}
        <div className="mb-auto">
          <div className="flex items-center justify-between mb-6 px-4">
            <h3 className="text-gray-900">Hormone Levels</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-300" />
                <span className="text-sm text-gray-600">Estrogen</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-300" />
                <span className="text-sm text-gray-600">Progesterone</span>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="relative mb-4">
            {/* Ovulation marker */}
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-xs text-gray-400">
              Ovulation
            </div>

            <svg width="100%" height="280" viewBox="0 0 400 280" className="mb-2">
              {/* Background grid */}
              <line x1="0" y1="250" x2="400" y2="250" stroke="#e5e7eb" strokeWidth="1" />
              
              {/* Estrogen curve (pink/salmon) */}
              <path
                d="M20,180 Q80,140 120,120 Q160,100 200,80 Q240,100 280,140 Q320,180 360,200"
                fill="none"
                stroke="#fda4af"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Progesterone curve (cyan/turquoise) */}
              <path
                d="M20,220 Q80,220 120,210 Q160,200 200,90 Q240,100 280,130 Q320,160 360,180"
                fill="none"
                stroke="#67e8f9"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.8"
              />

              {/* Ovulation marker line */}
              <line x1="200" y1="0" x2="200" y2="250" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4,4" />
            </svg>

            {/* Phase labels */}
            <div className="flex justify-between px-2">
              <span className="text-sm text-gray-500">Menstrual</span>
              <span className="text-sm text-gray-500">Follicular</span>
              <span className="text-sm text-gray-500">Ovulation</span>
              <span className="text-sm text-gray-500">Luteal</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 pt-8">
          <button
            onClick={onNext}
            className="w-full py-5 px-6 rounded-full bg-purple-300 text-white text-lg transition-all duration-300 hover:bg-purple-400 hover:scale-105 active:scale-95 shadow-sm"
          >
            Got it!
          </button>

          <button className="w-full text-gray-400 hover:text-gray-600 transition-colors text-sm">
            Our Privacy Pledge
          </button>
        </div>
      </div>
    </div>
  );
}
