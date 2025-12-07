import { useState } from 'react';
import mauvIcon from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface BirthControlScreenProps {
  onNext: () => void;
  onPreferNotToShare: () => void;
}

export function BirthControlScreen({ onNext, onPreferNotToShare }: BirthControlScreenProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    { id: 'pill', label: 'Pill' },
    { id: 'iud', label: 'IUD' },
    { id: 'patch', label: 'Patch' },
    { id: 'ring', label: 'Ring' },
    { id: 'condom', label: 'Condom' },
    { id: 'implant', label: 'Implant' },
    { id: 'shot', label: 'Shot' },
    { id: 'other', label: 'Other' },
    { id: 'none', label: 'None' },
  ];

  return (
    <div className="min-h-screen bg-[#0f1425] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-12 text-center pt-6">
          <div className="flex justify-center mb-8">
            <img src={mauvIcon} alt="MAUV" className="w-10 h-10" />
          </div>

          {/* Progress Bars */}
          <div className="flex gap-3 mb-12">
            <div className="flex-1 h-1 rounded-full bg-purple-400" />
            <div className="flex-1 h-1 rounded-full bg-purple-400" />
            <div className="flex-1 h-1 rounded-full bg-purple-400" />
            <div className="flex-1 h-1 rounded-full bg-gray-700" />
            <div className="flex-1 h-1 rounded-full bg-gray-700" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl text-center mb-8 leading-tight">
          Are you using birth control?
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-8 flex-1">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className="w-full py-4 px-6 rounded-2xl border border-gray-700 text-left flex items-center gap-4 transition-all duration-200 hover:border-purple-500"
            >
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selectedOption === option.id
                  ? 'border-white'
                  : 'border-gray-500'
              }`}>
                {selectedOption === option.id && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <span className="text-lg">{option.label}</span>
            </button>
          ))}
        </div>

        {/* Bottom Buttons */}
        <div className="space-y-3 pb-6">
          <button
            onClick={onPreferNotToShare}
            className="w-full py-5 px-6 rounded-full bg-purple-400/30 text-white text-lg transition-all duration-300 hover:bg-purple-400/40 flex items-center justify-center gap-2"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-purple-300">
              <path
                d="M10 5L10 10L13 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
            </svg>
            Prefer not to share now
          </button>

          <button
            onClick={onNext}
            className="w-full py-5 px-6 rounded-full bg-purple-400 text-white text-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}