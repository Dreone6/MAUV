import { OnboardingSlide } from '../OnboardingSlide';
import { Shield, FlaskConical, Lightbulb, ArrowLeft } from 'lucide-react@0.487.0';
import amaraLogo from 'figma:asset/aa826e4365d1d92f4e0bff911c331606c8b18a52.png';

interface OnboardingScreenProps {
  onBack: () => void;
  onNext: () => void;
}

export function OnboardingScreen({ onBack, onNext }: OnboardingScreenProps) {
  const features = [
    {
      icon: <Shield className="w-7 h-7" />,
      title: 'Your Private Confidant',
      description: 'Amara offers a secure space for your thoughts. Discuss anything, confidentially.',
    },
    {
      icon: <FlaskConical className="w-7 h-7" />,
      title: 'Understand Your Symptoms',
      description: 'Log symptoms and get clear explanations, connecting them directly to your cycle.',
    },
    {
      icon: <Lightbulb className="w-7 h-7" />,
      title: 'Personalized Wellness',
      description: 'Receive actionable tips and solutions, custom-tailored for your unique feminine journey.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        <button
          onClick={onBack}
          className="self-start w-10 h-10 rounded-full bg-purple-900/30 border border-purple-700/30 flex items-center justify-center hover:bg-purple-900/50 transition-all duration-300 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-8 flex justify-center">
            <img 
              src={amaraLogo} 
              alt="AMARA Logo" 
              className="h-20 w-auto"
            />
          </div>

          <h1 className="text-3xl mb-4">
            Empower Your Cycle with Amara
          </h1>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8 flex-1">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-900/20 to-purple-950/20 border border-purple-800/30 rounded-3xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-900/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Introduce AMARA Button */}
        <button
          onClick={onNext}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 text-[#1a0f2e] transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/50 hover:scale-105 active:scale-95"
        >
          Introduce AMARA
        </button>
      </div>
    </div>
  );
}