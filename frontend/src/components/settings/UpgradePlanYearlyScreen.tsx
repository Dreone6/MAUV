import { ArrowLeft, Check } from 'lucide-react@0.487.0';
import { useState } from 'react';

interface UpgradePlanYearlyScreenProps {
  onBack: () => void;
  onContinue: () => void;
  onSwitchToMonthly: () => void;
}

export function UpgradePlanYearlyScreen({ onBack, onContinue, onSwitchToMonthly }: UpgradePlanYearlyScreenProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const features = [
    'Ad-free experience',
    'Advanced period and cycle tracking',
    'Detailed data and insights',
    'Unlock exclusive contents',
    'Priority customer support',
    'Early access to new features',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-6 pt-12 pb-6">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
          <h1 className="text-xl text-gray-900">Upgrade Plan</h1>
          <div className="w-10" />
        </div>

        {/* Billing Cycle Toggle */}
        <div className="flex gap-2 mb-8 relative">
          <button
            onClick={() => {
              setBillingCycle('monthly');
              onSwitchToMonthly();
            }}
            className={`flex-1 py-3 px-6 rounded-full transition-all ${
              billingCycle === 'monthly'
                ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg'
                : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-pink-300'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`flex-1 py-3 px-6 rounded-full transition-all ${
              billingCycle === 'yearly'
                ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg'
                : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-pink-300'
            }`}
          >
            Yearly
          </button>
          
          {/* Save 20% Badge */}
          <div className="absolute -top-3 right-0 bg-gradient-to-r from-pink-400 to-pink-500 text-white text-xs px-3 py-1 rounded-full shadow-md">
            Save 20%
          </div>
        </div>

        {/* Plan Details */}
        <div className="text-center mb-8">
          <h2 className="text-2xl text-gray-900 mb-4">MAUV Pro</h2>
          <div className="flex items-baseline justify-center gap-1 mb-8">
            <span className="text-5xl text-gray-900">$49.99</span>
            <span className="text-gray-500">/year</span>
          </div>

          {/* Features List */}
          <div className="space-y-4 text-left max-w-sm mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-pink-500" strokeWidth={3} />
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-6 safe-area-bottom">
        <button
          onClick={onContinue}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
        >
          Continue - $49.99
        </button>
      </div>
    </div>
  );
}
