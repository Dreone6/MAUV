import { ArrowLeft } from 'lucide-react@0.487.0';

interface SymptomPatternsScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function SymptomPatternsScreen({ onBack, onNext }: SymptomPatternsScreenProps) {
  const symptoms = [
    { icon: '😔', name: 'Acne', count: 'x5' },
    { icon: '💧', name: 'Bloating', count: 'x4' },
    { icon: '⚡', name: 'Cramps', count: 'x6' },
    { icon: '💀', name: 'Headaches', count: 'x3' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 text-gray-800 p-6 flex flex-col relative overflow-hidden">
      {/* Decorative female symbols */}
      <div className="absolute top-20 left-8 text-6xl text-purple-200/20 rotate-12">♀</div>
      <div className="absolute bottom-32 right-8 text-8xl text-purple-200/20 -rotate-12">♀</div>

      <button
        onClick={onBack}
        className="self-start w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-white transition-all duration-300 mb-8 shadow-sm"
      >
        <ArrowLeft className="w-5 h-5 text-gray-700" />
      </button>

      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="text-rose-400 text-2xl">♀</span>
            <h1 className="text-xl text-gray-700">MAUV</h1>
          </div>
          
          {/* Progress Bar */}
          <div className="flex justify-center gap-2 mb-12">
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          </div>

          <h2 className="text-3xl text-gray-900 mb-4">
            Understand Your Symptom Patterns
          </h2>
          <p className="text-gray-600 mb-8">
            MAUV learns your cycle to help you prepare for what's next.
          </p>
        </div>

        {/* Symptom Cards */}
        <div className="bg-gradient-to-br from-pink-100/60 to-rose-100/60 rounded-3xl p-6 mb-4">
          <div className="grid grid-cols-2 gap-4">
            {symptoms.map((symptom, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="text-4xl mb-3 text-center">{symptom.icon}</div>
                <h3 className="text-gray-900 text-center mb-1">{symptom.name}</h3>
                <p className="text-gray-500 text-sm text-center">{symptom.count}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mb-auto">
          Based on anonymized user data
        </p>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-full py-4 px-6 rounded-full bg-rose-400 text-white transition-all duration-300 hover:bg-rose-500 hover:scale-105 active:scale-95 shadow-sm mt-12"
        >
          Next
        </button>
      </div>
    </div>
  );
}