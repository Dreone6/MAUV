import { Shield, FlaskConical, Lightbulb } from 'lucide-react@0.487.0';

interface IntroduceAmaraScreenProps {
  onNext: () => void;
}

export function IntroduceAmaraScreen({ onNext }: IntroduceAmaraScreenProps) {
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
        {/* Header */}
        <div className="mb-12 text-center pt-8">
          <div className="mb-6">
            <span className="text-4xl bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent tracking-wider">
              V K
            </span>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-600" />
            <div className="w-2 h-2 rounded-full bg-gray-600" />
            <div className="w-2 h-2 rounded-full bg-purple-400" />
            <div className="w-2 h-2 rounded-full bg-gray-600" />
            <div className="w-2 h-2 rounded-full bg-gray-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-4xl text-center mb-12 leading-tight">
          Empower Your Cycle with Amara
        </h2>

        {/* Feature Cards */}
        <div className="space-y-6 mb-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-purple-950/50 to-purple-900/30 rounded-3xl p-6 border border-purple-800/30"
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="w-12 h-12 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-300 flex-shrink-0">
                  {feature.icon}
                </div>
                <h3 className="text-2xl text-white pt-2">{feature.title}</h3>
              </div>
              <p className="text-gray-400 leading-relaxed pl-16">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Introduce Button */}
        <button
          onClick={onNext}
          className="w-full py-5 px-6 rounded-full bg-purple-300 text-purple-900 text-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg mt-12 mb-8"
        >
          Introduce AMARA
        </button>
      </div>
    </div>
  );
}