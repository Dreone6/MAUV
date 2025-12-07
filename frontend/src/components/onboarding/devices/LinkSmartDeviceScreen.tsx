import { ChevronLeft, ChevronRight, Watch } from 'lucide-react@0.487.0';

interface LinkSmartDeviceScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSkip: () => void;
}

export function LinkSmartDeviceScreen({ onBack, onNext, onSkip }: LinkSmartDeviceScreenProps) {
  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-xl mb-8">MAUV</h1>

          {/* Progress Bar */}
          <div className="flex justify-center gap-2 mb-16">
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          </div>

          <h2 className="text-3xl mb-4">
            Link Your Smart Device
          </h2>
        </div>

        {/* Device Icon */}
        <div className="flex justify-center mb-16">
          <div className="w-52 h-52 rounded-full bg-gradient-to-br from-purple-900/40 to-purple-800/40 flex items-center justify-center">
            <Watch className="w-24 h-24 text-purple-300" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-auto">
          <h3 className="text-2xl mb-4">Track Activity & Sleep</h3>
          <p className="text-gray-400 px-4 leading-relaxed">
            Connect your smartwatch to effortlessly log your daily activity and sleep patterns.
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBack}
            className="w-12 h-12 rounded-full bg-transparent border border-purple-700/30 flex items-center justify-center hover:bg-purple-900/30 transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6 text-gray-400" />
          </button>
          <button
            onClick={onNext}
            className="w-12 h-12 rounded-full bg-transparent border border-purple-700/30 flex items-center justify-center hover:bg-purple-900/30 transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onNext}
            className="w-full py-4 px-6 rounded-full bg-purple-300 text-gray-900 transition-all duration-300 hover:bg-purple-400 hover:scale-105 active:scale-95"
          >
            Link Device
          </button>

          <button
            onClick={onSkip}
            className="w-full text-gray-400 hover:text-gray-300 transition-colors"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}