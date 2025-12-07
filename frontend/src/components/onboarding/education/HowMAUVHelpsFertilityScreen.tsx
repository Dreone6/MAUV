import { Sparkles, Bell, TrendingUp } from 'lucide-react@0.487.0';

interface HowMAUVHelpsFertilityScreenProps {
  onNext: () => void;
  onSkip: () => void;
}

export function HowMAUVHelpsFertilityScreen({ onNext, onSkip }: HowMAUVHelpsFertilityScreenProps) {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI-Powered Predictions',
      description: 'For accurate ovulation and cycle forecasting.',
      color: 'from-purple-100 to-purple-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Fertile Window Alerts',
      description: 'Timely notifications so you never miss your key days.',
      color: 'from-purple-100 to-purple-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Personalized Insights',
      description: 'Understand your unique patterns and health data.',
      color: 'from-purple-100 to-purple-50',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/20 to-pink-50/20 text-gray-800 p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-center text-2xl text-purple-400 mb-8 tracking-wider">MAUV</h1>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-12">
            <div className="w-2 h-2 rounded-full bg-purple-200" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="w-2 h-2 rounded-full bg-purple-200" />
            <div className="w-2 h-2 rounded-full bg-purple-200" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl text-gray-900 mb-12 text-center leading-tight">
          How MAUV Helps with Fertility
        </h2>

        {/* Feature Cards */}
        <div className="space-y-4 mb-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-r ${feature.color} rounded-3xl p-5 flex items-start gap-4`}
            >
              <div className={`w-12 h-12 ${feature.iconBg} rounded-2xl flex items-center justify-center ${feature.iconColor} flex-shrink-0`}>
                {feature.icon}
              </div>
              <div className="flex-1 text-left">
                <h3 className="text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-purple-600 text-sm">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 pt-12">
          <button
            onClick={onNext}
            className="w-full py-5 px-6 rounded-full bg-purple-400 text-white text-lg transition-all duration-300 hover:bg-purple-500 hover:scale-105 active:scale-95 shadow-sm"
          >
            Next
          </button>

          <button
            onClick={onSkip}
            className="w-full text-purple-400 hover:text-purple-500 transition-colors"
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}