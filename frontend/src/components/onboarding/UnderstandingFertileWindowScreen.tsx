interface UnderstandingFertileWindowScreenProps {
  onNext: () => void;
}

export function UnderstandingFertileWindowScreen({ onNext }: UnderstandingFertileWindowScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-center text-2xl text-purple-400 mb-8 tracking-wider">MAUV</h1>

          {/* Progress Bars */}
          <div className="flex gap-3 mb-12">
            <div className="flex-1 h-1.5 rounded-full bg-gray-300" />
            <div className="flex-1 h-1.5 rounded-full bg-purple-400" />
            <div className="flex-1 h-1.5 rounded-full bg-gray-300" />
            <div className="flex-1 h-1.5 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl text-gray-900 mb-4 text-center leading-tight">
          Understanding Your Fertile Window
        </h2>

        <p className="text-gray-600 text-center leading-relaxed mb-16 px-4">
          The fertile window is the best time for conception. It typically occurs in the days leading up to and including ovulation.
        </p>

        {/* Timeline Visualization */}
        <div className="mb-auto">
          <div className="relative px-4">
            {/* Timeline line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300" />

            {/* Day markers */}
            <div className="relative flex justify-between items-center mb-16">
              {[10, 11, 12, 13, 14, 15, 16].map((day, index) => {
                const isFertile = day === 12 || day === 13;
                const isOvulation = day === 14;
                
                return (
                  <div key={day} className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full mb-2 ${
                        isOvulation
                          ? 'bg-purple-400 ring-4 ring-purple-200'
                          : isFertile
                          ? 'bg-pink-300'
                          : 'bg-gray-300'
                      }`}
                    />
                    <span className="text-sm text-gray-500">{day}</span>
                  </div>
                );
              })}
            </div>

            {/* Ovulation label */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-purple-400">
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
              <span className="text-purple-400 tracking-wider">OVULATION</span>
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
