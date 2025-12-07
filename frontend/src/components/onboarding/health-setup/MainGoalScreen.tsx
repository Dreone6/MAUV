import { ArrowLeft } from 'lucide-react@0.487.0';
import { useState } from 'react';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface MainGoalScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function MainGoalScreen({ onBack, onNext }: MainGoalScreenProps) {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goals = [
    { id: 'track-cycle', label: 'Track my cycle' },
    { id: 'trying-conceive', label: 'Trying to conceive' },
    { id: 'track-pregnancy', label: 'Track my pregnancy' },
    { id: 'perimenopause', label: 'Navigating perimenopause' },
  ];

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    setTimeout(() => {
      onNext();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-900/30 transition-all duration-300"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex gap-3 mb-12">
            <div className="flex-1 h-1 rounded-full bg-purple-400" />
            <div className="flex-1 h-1 rounded-full bg-gray-700" />
          </div>
        </div>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <img src={mauvLogo} alt="MAUV Logo" className="w-8 h-8" />
          <h1 className="text-2xl">MAUV</h1>
        </div>

        {/* Question */}
        <h2 className="text-3xl text-center mb-12 leading-tight px-4">
          What's your main goal right now?
        </h2>

        {/* Goal Options */}
        <div className="space-y-4 mb-auto">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => handleGoalSelect(goal.id)}
              className={`w-full py-5 px-6 rounded-full text-lg transition-all duration-300 ${
                selectedGoal === goal.id
                  ? 'bg-purple-500 text-white scale-105'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {goal.label}
            </button>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-12 pb-6">
          <button
            onClick={onNext}
            className="text-gray-400 hover:text-gray-300 transition-colors mb-8 w-full"
          >
            Just exploring the app
          </button>

          <p className="text-xs text-gray-500 text-center leading-relaxed px-4">
            The MAUV App is intended to help you track your cycle and fertility. It is not a substitute for medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </div>
  );
}