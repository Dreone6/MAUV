import { ArrowLeft, Sparkles, Lock, RefreshCw, Bell } from 'lucide-react@0.487.0';

interface PremiumScreenProps {
  onBack: () => void;
  onStartTrial: () => void;
}

export function PremiumScreen({ onBack, onStartTrial }: PremiumScreenProps) {
  const features = [
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: 'Unlimited Cycle & Fertility Tracking',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Advanced Predictions with AI',
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: 'Your Private Data Vault',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <button
        onClick={onBack}
        className="self-start w-10 h-10 rounded-full bg-purple-900/30 border border-purple-700/30 flex items-center justify-center hover:bg-purple-900/50 transition-all duration-300 mb-8"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        <div className="bg-gradient-to-br from-purple-900/40 to-purple-950/40 border border-purple-800/30 rounded-3xl p-8 mb-6 w-full">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <Bell className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl text-center mb-4">
            Unlock MAUV Premium
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-400 mb-8">
            Gain full access to all features with a 7-day free trial.
          </p>

          {/* Divider */}
          <div className="h-px bg-purple-800/30 mb-6" />

          {/* Features */}
          <div className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="text-purple-400">
                  {feature.icon}
                </div>
                <span className="text-gray-200">{feature.title}</span>
              </div>
            ))}
          </div>

          {/* Fine Print */}
          <p className="text-xs text-gray-500 text-center mb-6">
            Your subscription will automatically renew at the end of each period unless canceled at least 24 hours prior. You can manage your subscription in your App Store account settings.
          </p>

          {/* CTA Button */}
          <button
            onClick={onStartTrial}
            className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/50 hover:scale-105 active:scale-95 mb-4"
          >
            <div>
              <div>Start 7-Day Free Trial</div>
              <div className="text-sm opacity-90">Then $29.99/year</div>
            </div>
          </button>

          {/* Links */}
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <button className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-gray-300 transition-colors">
              Terms of Use
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}