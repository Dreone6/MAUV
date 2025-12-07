import { Lock } from 'lucide-react@0.487.0';

interface OvulationKeyScreenProps {
  onNext: () => void;
}

export function OvulationKeyScreen({ onNext }: OvulationKeyScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-12 pt-8">
          <h1 className="text-gray-700 tracking-wider mb-8">MAUV</h1>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
            <div className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center text-center px-4">
          <h2 className="text-4xl text-gray-900 mb-6 leading-tight">
            Ovulation is your key to fertility.
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Knowing your ovulation date is the most critical factor for conceiving and understanding your fertile window.
          </p>
        </div>

        {/* Bottom Section */}
        <div className="pb-8">
          <button
            onClick={onNext}
            className="w-full py-5 px-6 rounded-full bg-purple-300 text-white text-lg transition-all duration-300 hover:bg-purple-400 hover:scale-105 active:scale-95 shadow-sm mb-4"
          >
            Next
          </button>

          <button className="flex items-center justify-center gap-2 mx-auto text-gray-400 hover:text-gray-600 transition-colors">
            <Lock className="w-4 h-4" />
            <span>Privacy Policy</span>
          </button>
        </div>
      </div>
    </div>
  );
}