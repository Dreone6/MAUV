import { ArrowLeft } from 'lucide-react@0.487.0';
import { useState } from 'react';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface PartnerCodeScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function PartnerCodeScreen({ onBack, onNext }: PartnerCodeScreenProps) {
  const [selectedOption, setSelectedOption] = useState<'yes' | 'partner' | null>(null);

  const handleContinue = () => {
    if (selectedOption) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <button
        onClick={onBack}
        className="self-start w-10 h-10 rounded-full bg-purple-900/30 border border-purple-700/30 flex items-center justify-center hover:bg-purple-900/50 transition-all duration-300 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <img src={mauvLogo} alt="MAUV Logo" className="h-16 w-auto" />
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-16">
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          </div>

          <h2 className="text-3xl mb-8">
            Are you using MAUV for yourself?
          </h2>
        </div>

        {/* Options */}
        <div className="space-y-4 mb-auto">
          <button
            onClick={() => setSelectedOption('yes')}
            className={`w-full py-5 px-6 rounded-full transition-all duration-300 ${
              selectedOption === 'yes'
                ? 'bg-purple-600 border-2 border-purple-400'
                : 'bg-purple-950/50 border-2 border-purple-800/30 hover:border-purple-700/50'
            }`}
          >
            Yes
          </button>

          <button
            onClick={() => setSelectedOption('partner')}
            className={`w-full py-5 px-6 rounded-full transition-all duration-300 ${
              selectedOption === 'partner'
                ? 'bg-purple-600 border-2 border-purple-400'
                : 'bg-purple-950/50 border-2 border-purple-800/30 hover:border-purple-700/50'
            }`}
          >
            No, I have a partner code
          </button>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedOption}
          className={`w-full py-4 px-6 rounded-full transition-all duration-300 mt-8 ${
            selectedOption
              ? 'bg-purple-300 text-gray-900 hover:bg-purple-400 hover:scale-105 active:scale-95'
              : 'bg-purple-900/30 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}