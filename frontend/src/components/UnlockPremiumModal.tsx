import { Sparkles, Shield, Lock } from 'lucide-react@0.487.0';

interface UnlockPremiumModalProps {
  onStartTrial: () => void;
  onNotNow: () => void;
}

export function UnlockPremiumModal({ onStartTrial, onNotNow }: UnlockPremiumModalProps) {
  return (
    <div className="min-h-screen bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Modal Card */}
        <div className="bg-[#1a0f2e] rounded-3xl p-8 text-white">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-teal-500 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl text-center mb-4">Unlock MAUV Premium</h2>
          <p className="text-gray-400 text-center mb-8">
            Gain full access to all features with a 7-day free trial.
          </p>

          {/* Features */}
          <div className="space-y-5 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-gray-200 pt-2">Unlimited Cycle & Fertility Tracking</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-gray-200 pt-2">Advanced Predictions with AI</p>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <p className="text-gray-200 pt-2">Your Private Data Vault</p>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-gray-500 text-xs text-center mb-6 leading-relaxed">
            Your subscription will automatically renew at the end of each period unless canceled at least 24 hours prior. You can manage your subscription in your App Store account settings.
          </p>

          {/* Start Trial Button */}
          <button
            onClick={onStartTrial}
            className="w-full py-5 px-6 rounded-full bg-gradient-to-r from-purple-400 to-purple-500 text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg mb-4"
          >
            <div className="text-lg">Start 7-Day Free Trial</div>
            <div className="text-sm opacity-90">Then $29.99/year</div>
          </button>

          {/* Links */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
            <button className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </button>
            <button className="hover:text-gray-300 transition-colors">
              Terms of Use
            </button>
          </div>
        </div>

        {/* Not Now Button */}
        <button
          onClick={onNotNow}
          className="w-full mt-6 text-gray-400 hover:text-white transition-colors text-lg"
        >
          Not Now
        </button>
      </div>
    </div>
  );
}