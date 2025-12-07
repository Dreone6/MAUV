import { useState } from 'react';
import mauvIcon from 'figma:asset/252af0f5ce38b2ed2f741f80182b680727155ab7.png';

interface PeriodFrequencyScreenProps {
  onNext: () => void;
}

export function PeriodFrequencyScreen({ onNext }: PeriodFrequencyScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string>('irregular');

  const options = [
    { id: 'regular', label: "They're regular" },
    { id: 'irregular', label: "They're irregular or unpredictable" },
    { id: 'none', label: "I don't have periods" },
    { id: 'unknown', label: "I don't know" },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <img src={mauvIcon} alt="MAUV" className="w-8 h-8" />
            <h1 className="text-3xl tracking-wider">MAUV</h1>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-800" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="w-2 h-2 rounded-full bg-purple-800" />
            <div className="w-2 h-2 rounded-full bg-purple-800" />
            <div className="w-2 h-2 rounded-full bg-purple-800" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl text-center mb-12 leading-tight px-4">
          How frequent are your periods?
        </h2>

        {/* Options */}
        <div className="space-y-4 mb-auto">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full py-5 px-6 rounded-full text-lg transition-all duration-300 ${
                selectedOption === option.id
                  ? 'bg-gradient-to-r from-purple-300 to-pink-300 text-purple-900'
                  : 'bg-transparent border border-purple-800/50 text-white hover:border-purple-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="mt-12 py-5 px-10 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 text-purple-900 text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg self-start"
        >
          Next
        </button>
      </div>
    </div>
  );
}
