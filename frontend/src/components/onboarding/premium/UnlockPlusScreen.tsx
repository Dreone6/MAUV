import { useState } from 'react';
import { ArrowLeft, TrendingUp, Shield } from 'lucide-react@0.487.0';

interface UnlockPlusScreenProps {
  onBack: () => void;
  onStartTrial: () => void;
}

export function UnlockPlusScreen({ onBack, onStartTrial }: UnlockPlusScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Advanced Cycle Predictions',
      description: 'Stay ahead with smarter forecasts.',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'In-depth Health Insights',
      description: "Understand your body's patterns.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Private & Secure',
      description: 'Your personal data stays yours, always.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="text-center mb-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-700/40 to-purple-600/40 rounded-xl border border-purple-500/30" />
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-12">
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
            <div className="w-12 h-1.5 rounded-full bg-purple-900/30" />
          </div>

          <h1 className="text-3xl mb-8">Unlock MAUV Plus</h1>
        </div>

        {/* Pricing Options */}
        <div className="space-y-4 mb-6">
          {/* Yearly Plan */}
          <button
            onClick={() => setSelectedPlan('yearly')}
            className={`w-full rounded-3xl p-5 border-2 transition-all duration-300 relative ${
              selectedPlan === 'yearly'
                ? 'border-purple-400'
                : 'border-purple-800/30'
            }`}
          >
            {/* Best Value Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-300 to-pink-400 text-gray-900 text-xs px-4 py-1 rounded-full">
              BEST VALUE
            </div>

            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-lg mb-1">Yearly</h3>
                <p className="text-sm text-gray-400">Equals $4.99/month</p>
                <div className="flex items-center gap-1 mt-2">
                  <div className="text-xs px-2 py-1 rounded bg-purple-800/50 text-purple-200 flex items-center gap-1">
                    <span>✚</span>
                    <span>HSA/FSA ELIGIBLE</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl">$59.99</div>
                <div className="text-sm text-gray-400">per year</div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-3 ${
                selectedPlan === 'yearly' ? 'border-purple-400 bg-purple-400' : 'border-gray-500'
              }`}>
                {selectedPlan === 'yearly' && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
            </div>
          </button>

          {/* Monthly Plan */}
          <button
            onClick={() => setSelectedPlan('monthly')}
            className={`w-full rounded-3xl p-5 border-2 transition-all duration-300 ${
              selectedPlan === 'monthly'
                ? 'border-purple-400'
                : 'border-purple-800/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <h3 className="text-lg mb-1">Monthly</h3>
                <p className="text-sm text-gray-400">Billed monthly</p>
                <div className="flex items-center gap-1 mt-2">
                  <div className="text-xs px-2 py-1 rounded bg-purple-800/50 text-purple-200 flex items-center gap-1">
                    <span>✚</span>
                    <span>HSA/FSA ELIGIBLE</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl">$9.99</div>
                <div className="text-sm text-gray-400">per month</div>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ml-3 ${
                selectedPlan === 'monthly' ? 'border-purple-400 bg-purple-400' : 'border-gray-500'
              }`}>
                {selectedPlan === 'monthly' && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
            </div>
          </button>
        </div>

        <p className="text-center text-gray-400 text-sm mb-8">
          Both plans include a 7-day free trial.
        </p>

        {/* Features */}
        <div className="mb-8">
          <h3 className="text-lg mb-4">With MAUV Plus you get:</h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-900/50 flex items-center justify-center text-purple-300 flex-shrink-0">
                  {feature.icon}
                </div>
                <div className="text-left">
                  <h4 className="text-white mb-0.5">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStartTrial}
          className="w-full py-4 px-6 rounded-full bg-purple-300 text-gray-900 transition-all duration-300 hover:bg-purple-400 hover:scale-105 active:scale-95 mb-4"
        >
          Start Your 7-Day Free Trial
        </button>

        {/* Fine Print */}
        <p className="text-xs text-gray-500 text-center mb-4 px-2">
          Your free trial will automatically convert to a paid subscription unless canceled. You can cancel anytime.
        </p>

        {/* Footer Links */}
        <div className="flex justify-center gap-6 text-sm text-gray-400">
          <button className="hover:text-gray-300 transition-colors underline">Terms</button>
          <button className="hover:text-gray-300 transition-colors underline">Privacy</button>
          <button className="hover:text-gray-300 transition-colors underline">Restore</button>
        </div>
      </div>
    </div>
  );
}