import { ArrowLeft } from 'lucide-react@0.487.0';

interface WelcomeNameScreenProps {
  onBack: () => void;
  onContinue: () => void;
  userName?: string;
}

export function WelcomeNameScreen({ onBack, onContinue, userName = "Olivia" }: WelcomeNameScreenProps) {
  return (
    <div className="min-h-screen bg-[#2a1f3d] text-white p-6 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-16">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-purple-900/30 transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-gray-400">3 / 5</span>
      </div>

      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Welcome Message */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-4xl text-center">
            Welcome, {userName}!
          </h1>
        </div>

        {/* Bottom Section */}
        <div className="pb-8">
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-gray-600" />
            <div className="w-2 h-2 rounded-full bg-gray-600" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="w-2 h-2 rounded-full bg-gray-600" />
            <div className="w-2 h-2 rounded-full bg-gray-600" />
          </div>

          {/* Continue Button */}
          <button
            onClick={onContinue}
            className="w-full py-5 px-6 rounded-full bg-gradient-to-r from-purple-300 via-purple-300 to-purple-300 text-gray-900 text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}