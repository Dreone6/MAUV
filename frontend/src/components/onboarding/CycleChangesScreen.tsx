import { useState } from 'react';
import { Droplet, Zap, Frown, CircleDot, Heart, Cloud, Ban } from 'lucide-react@0.487.0';

interface CycleChangesScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export function CycleChangesScreen({ onNext, onSkip }: CycleChangesScreenProps) {
  const [selectedChanges, setSelectedChanges] = useState<string[]>(['cramps', 'fatigue']);

  const changes = [
    { id: 'bloating', label: 'Bloating', icon: <Droplet className="w-5 h-5" /> },
    { id: 'cramps', label: 'Cramps', icon: <Zap className="w-5 h-5" /> },
    { id: 'headaches', label: 'Headaches', icon: <Frown className="w-5 h-5" /> },
    { id: 'acne', label: 'Acne', icon: <CircleDot className="w-5 h-5" /> },
    { id: 'fatigue', label: 'Fatigue', icon: <Zap className="w-5 h-5" /> },
    { id: 'breast-tenderness', label: 'Breast Tenderness', icon: <Heart className="w-5 h-5" /> },
    { id: 'mood-swings', label: 'Mood Swings', icon: <Cloud className="w-5 h-5" /> },
    { id: 'cravings', label: 'Cravings', icon: <Cloud className="w-5 h-5" /> },
    { id: 'none', label: 'None of these', icon: <Ban className="w-5 h-5" /> },
  ];

  const toggleChange = (id: string) => {
    if (id === 'none') {
      setSelectedChanges(selectedChanges.includes('none') ? [] : ['none']);
    } else {
      setSelectedChanges(prev => {
        const filtered = prev.filter(c => c !== 'none');
        return filtered.includes(id)
          ? filtered.filter(c => c !== id)
          : [...filtered, id];
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl text-gray-400 mb-6 tracking-wider">MAUV</h1>

          {/* Progress Bars */}
          <div className="flex justify-center gap-3 mb-12">
            <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-16 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-16 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-16 h-1.5 rounded-full bg-purple-900/30" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl text-white text-center mb-3 leading-tight px-4">
          What changes do you usually notice?
        </h2>
        <p className="text-gray-400 text-center mb-10 px-4">
          Select all that apply. This helps us personalize your predictions.
        </p>

        {/* Changes Grid */}
        <div className="flex flex-wrap justify-center gap-3 mb-auto">
          {changes.map((change) => {
            const isSelected = selectedChanges.includes(change.id);
            return (
              <button
                key={change.id}
                onClick={() => toggleChange(change.id)}
                className={`py-3 px-5 rounded-full text-base transition-all duration-300 flex items-center gap-2 ${
                  isSelected
                    ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-[#1a0f2e] shadow-lg shadow-purple-400/30'
                    : 'bg-purple-900/30 border border-purple-700/30 text-gray-300 hover:bg-purple-900/50 hover:border-purple-600/50'
                }`}
              >
                {change.icon}
                {change.label}
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 pb-6 space-y-4">
          <button
            onClick={onNext}
            className="w-full py-5 px-6 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 text-[#1a0f2e] text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-purple-300/50"
          >
            Next
          </button>

          <button
            onClick={onSkip}
            className="w-full text-gray-400 hover:text-gray-300 transition-colors"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}