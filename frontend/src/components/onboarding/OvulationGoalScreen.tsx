import { useState } from 'react';
import { CheckCircle } from 'lucide-react@0.487.0';

interface OvulationGoalScreenProps {
  onNext: () => void;
}

export function OvulationGoalScreen({ onNext }: OvulationGoalScreenProps) {
  const [selectedOption, setSelectedOption] = useState<'yes' | 'no' | null>('yes');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-full border-2 border-purple-400" />
          <h1 className="text-2xl text-gray-900">MAUV</h1>
        </div>

        {/* Progress Bars */}
        <div className="flex gap-2 mb-16">
          <div className="flex-1 h-1 rounded-full bg-gray-300" />
          <div className="flex-1 h-1 rounded-full bg-purple-400" />
          <div className="flex-1 h-1 rounded-full bg-gray-300" />
          <div className="flex-1 h-1 rounded-full bg-gray-300" />
          <div className="flex-1 h-1 rounded-full bg-gray-300" />
        </div>

        {/* Question */}
        <h2 className="text-3xl text-gray-900 mb-12 px-4">
          Are you trying to find your ovulation date?
        </h2>

        {/* Options */}
        <div className="space-y-4 mb-auto">
          {/* Yes Option */}
          <button
            onClick={() => setSelectedOption('yes')}
            className={`w-full py-5 px-6 rounded-full border-2 transition-all duration-300 flex items-center justify-between ${
              selectedOption === 'yes'
                ? 'border-purple-400 bg-purple-100/50'
                : 'border-purple-300 bg-white'
            }`}
          >
            <span className="text-lg text-gray-900">Yes, I am</span>
            <CheckCircle 
              className={`w-6 h-6 transition-colors ${
                selectedOption === 'yes' ? 'text-purple-400' : 'text-gray-300'
              }`}
            />
          </button>

          {/* No Option */}
          <button
            onClick={() => setSelectedOption('no')}
            className={`w-full py-5 px-6 rounded-full border-2 transition-all duration-300 ${
              selectedOption === 'no'
                ? 'border-pink-300 bg-pink-100/50'
                : 'border-transparent bg-pink-100/30'
            }`}
          >
            <span className="text-lg text-gray-900">No, not right now</span>
          </button>
        </div>

        {/* Bottom Section */}
        <div className="pb-6 pt-12">
          <button
            onClick={onNext}
            disabled={!selectedOption}
            className={`w-full py-5 px-6 rounded-full text-lg transition-all duration-300 ${
              selectedOption
                ? 'bg-purple-300 text-white hover:bg-purple-400 hover:scale-105 active:scale-95 shadow-sm'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}