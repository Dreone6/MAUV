import { TrendingUp, Thermometer } from 'lucide-react@0.487.0';

interface FertileWindowExplainScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export function FertileWindowExplainScreen({ onNext, onSkip }: FertileWindowExplainScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-purple-400 tracking-widest text-xl">MAUV</h1>
          <button
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-12">
          <div className="w-2 h-2 rounded-full bg-gray-900" />
          <div className="w-2 h-2 rounded-full bg-purple-400" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
          <div className="w-2 h-2 rounded-full bg-gray-300" />
        </div>

        {/* Title */}
        <h2 className="text-3xl text-gray-900 mb-4 text-center px-4">
          How MAUV Finds Your Fertile Window
        </h2>
        <p className="text-gray-600 text-center px-4 mb-12 leading-relaxed">
          By tracking two key body signals, MAUV can accurately predict your ovulation day.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-auto">
          {/* LH Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-gray-700" />
              </div>
            </div>
            <h3 className="text-gray-900 text-center mb-2">
              LH (Luteinizing Hormone)
            </h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              A surge in LH triggers ovulation within 24-36 hours.
            </p>
          </div>

          {/* BBT Card */}
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <Thermometer className="w-6 h-6 text-gray-700" />
              </div>
            </div>
            <h3 className="text-gray-900 text-center mb-2">
              BBT (Basal Body Temperature)
            </h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              Your body temperature slightly rises after ovulation.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pb-6 pt-12">
          <button
            onClick={onNext}
            className="w-full py-5 px-6 rounded-full bg-purple-400 text-white text-lg transition-all duration-300 hover:bg-purple-500 hover:scale-105 active:scale-95 shadow-sm"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}