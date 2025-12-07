import { ArrowLeft, Calendar, Sparkles, Lock } from 'lucide-react@0.487.0';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface WelcomeScreenProps {
  onBack: () => void;
  onGetStarted: () => void;
}

export function WelcomeScreen({ onBack, onGetStarted }: WelcomeScreenProps) {
  const features = [
    {
      icon: <Calendar className="w-7 h-7" />,
      title: 'Cycle Tracking',
      description: 'Track your menstrual cycle, fertility, and menopause with ease.',
    },
    {
      icon: <Sparkles className="w-7 h-7" />,
      title: 'Personalized Insights',
      description: 'Get AI-powered predictions and health tips for your well-being.',
    },
    {
      icon: <Lock className="w-7 h-7" />,
      title: 'Ultra-Private',
      description: 'Your data is secure and will always remain private.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full h-screen overflow-hidden flex flex-col py-6 px-4">
        <button
          onClick={onBack}
          className="self-start w-10 h-10 rounded-full bg-purple-900/30 border border-purple-700/30 flex items-center justify-center hover:bg-purple-900/50 transition-all duration-300 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-4">
          
          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          </div>

          {/* Character Illustration */}
          <div className="flex justify-center mb-4">
            <div className="w-32 h-32 flex items-center justify-center">
              <img src={mauvLogo} alt="MAUV Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          <h1 className="text-3xl mb-2">
            Welcome to MAUV
          </h1>
          <p className="text-gray-400">
            Your personal guide to your unique cycle.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3 mb-6 flex-1 overflow-hidden">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-900/20 to-purple-950/20 border border-purple-800/30 rounded-3xl p-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-900/40 flex items-center justify-center text-purple-300 flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-white mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Get Started Button */}
        <button
          onClick={onGetStarted}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 text-[#1a0f2e] transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/50 hover:scale-105 active:scale-95"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}