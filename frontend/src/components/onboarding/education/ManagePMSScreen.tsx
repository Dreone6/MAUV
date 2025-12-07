interface ManagePMSScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export function ManagePMSScreen({ onNext, onBack }: ManagePMSScreenProps) {
  const symptoms = [
    { icon: '😔', label: 'Mood', position: 'top-8 left-8' },
    { icon: '🔴', label: 'Acne', position: 'top-8 right-8' },
    { icon: '☕', label: 'Fatigue', position: 'bottom-16 left-8' },
    { icon: '⚡', label: 'Cramps', position: 'bottom-16 right-8' },
    { icon: '💨', label: 'Bloating', position: 'bottom-32 right-20' },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl mb-6 tracking-widest">MAUV</h1>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-12">
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          </div>

          <h2 className="text-3xl mb-8">
            Manage PMS with Confidence
          </h2>
        </div>

        {/* Illustration Section */}
        <div className="relative mb-8 flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square bg-[#d4a88c] rounded-lg overflow-hidden">
            {/* Woman illustration - using emoji/text representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🧘‍♀️</div>
              </div>
            </div>

            {/* Symptom Badges */}
            {symptoms.map((symptom, index) => (
              <div
                key={index}
                className={`absolute ${symptom.position} w-20 h-20 rounded-full bg-gray-800/90 flex flex-col items-center justify-center backdrop-blur-sm`}
              >
                <span className="text-2xl mb-1">{symptom.icon}</span>
                <span className="text-xs text-white">{symptom.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-gray-300 px-4 mb-12 leading-relaxed">
          Tracking symptoms leads to better prediction and management, empowering you to take control of your cycle.
        </p>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-full py-5 px-6 rounded-full bg-purple-300 text-gray-900 text-lg transition-all duration-300 hover:bg-purple-400 hover:scale-105 active:scale-95 shadow-lg mb-8"
        >
          Next
        </button>
      </div>
    </div>
  );
}
