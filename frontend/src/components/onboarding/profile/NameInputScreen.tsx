import { ArrowLeft, X } from 'lucide-react@0.487.0';
import { useState } from 'react';
import { useUser } from '../../../hooks/useUser';

interface NameInputScreenProps {
  onBack: () => void;
  onNext: (name: string) => void;
}

export function NameInputScreen({ onBack, onNext }: NameInputScreenProps) {
  const [name, setName] = useState('Samantha');

  const handleNext = () => {
    if (name.trim()) {
      onNext(name);
    }
  };

  const handleClear = () => {
    setName('');
  };

  return (
    <div className="min-h-screen bg-[#2a1f3d] text-white p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-900/30 transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button className="w-10 h-10 rounded-full bg-purple-800/30 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-white border-dashed" />
        </button>
      </div>

      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Question */}
        <div className="mb-8">
          <h2 className="text-3xl leading-tight">
            What name do you prefer to be called?
          </h2>
        </div>

        {/* Input Field */}
        <div className="mb-auto">
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-2 border-purple-400/50 rounded-full px-6 py-4 text-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors"
              placeholder="Enter your name"
            />
            {name && (
              <button
                onClick={handleClear}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-600/80 flex items-center justify-center hover:bg-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pb-8">
          {/* Progress Bars */}
          <div className="flex gap-2 mb-6">
            <div className="flex-1 h-1 rounded-full bg-gradient-to-r from-purple-300 to-pink-300" />
            <div className="flex-1 h-1 rounded-full bg-gray-700" />
            <div className="flex-1 h-1 rounded-full bg-gray-700" />
            <div className="flex-1 h-1 rounded-full bg-gray-700" />
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={!name.trim()}
            className={`w-full py-5 px-6 rounded-full text-lg transition-all duration-300 ${
              name.trim()
                ? 'bg-gradient-to-r from-purple-300 to-purple-300 text-gray-900 hover:scale-105 active:scale-95 shadow-lg'
                : 'bg-purple-900/30 text-gray-500 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}