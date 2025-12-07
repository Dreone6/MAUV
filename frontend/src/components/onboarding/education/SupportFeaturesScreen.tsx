import { ArrowLeft, Calendar, TrendingUp, Smile, Target, Lock } from 'lucide-react@0.487.0';

interface SupportFeaturesScreenProps {
  onBack: () => void;
  onGetStarted: () => void;
}

export function SupportFeaturesScreen({ onBack, onGetStarted }: SupportFeaturesScreenProps) {
  const features = [
    {
      icon: <Calendar className="w-7 h-7" />,
      title: 'Uncover Your Cycle Statistics',
      description: 'See your average cycle length and period duration.',
    },
    {
      icon: <TrendingUp className="w-7 h-7" />,
      title: 'Visualize Your Symptom History',
      description: 'Track cramps, flow, and energy levels over time.',
    },
    {
      icon: <Smile className="w-7 h-7" />,
      title: 'Understand Your Mood Patterns',
      description: 'Discover how your moods connect to your cycle.',
    },
    {
      icon: <Target className="w-7 h-7" />,
      title: 'Predict with Confidence',
      description: 'Get predictions for your next period and fertile window.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <button
        onClick={onBack}
        className="self-start w-10 h-10 rounded-full bg-purple-900/30 border border-purple-700/30 flex items-center justify-center hover:bg-purple-900/50 transition-all duration-300 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-xl mb-6">MAUV</h1>

          {/* Progress Bar */}
          <div className="flex justify-center gap-2 mb-12">
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          </div>

          <h2 className="text-3xl mb-4">
            We're here to support you.
          </h2>
          <p className="text-gray-400 text-sm">
            By tracking, MAUV helps you understand the patterns in your unique cycle.
          </p>
        </div>

        {/* Features List */}
        <div className="space-y-4 mb-8 flex-1">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-purple-950/30 border border-purple-800/30 rounded-3xl p-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-900/50 flex items-center justify-center text-gray-300 flex-shrink-0">
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
        <div className="space-y-4">
          <button
            onClick={onGetStarted}
            className="w-full py-4 px-6 rounded-full bg-purple-300 text-gray-900 transition-all duration-300 hover:bg-purple-400 hover:scale-105 active:scale-95"
          >
            Get Started
          </button>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Lock className="w-4 h-4" />
            <span>Your data is always private</span>
          </div>
        </div>
      </div>
    </div>
  );
}