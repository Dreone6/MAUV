import { Check } from 'lucide-react@0.487.0';

interface PurchaseSuccessScreenProps {
  onContinue: () => void;
}

export function PurchaseSuccessScreen({ onContinue }: PurchaseSuccessScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3d2c4a] via-[#5a3d4f] to-[#b8675f] flex items-center justify-center p-6">
      {/* Success Modal */}
      <div className="bg-white rounded-[40px] p-12 max-w-md w-full text-center shadow-2xl">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-teal-500 flex items-center justify-center">
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl text-gray-900 mb-6">
          You're all set!
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-lg leading-relaxed mb-12">
          Your purchase was successful. You now have full access to all premium features.
        </p>

        {/* Continue Button */}
        <button
          onClick={onContinue}
          className="w-full py-5 px-6 rounded-full bg-purple-400 text-white text-lg transition-all duration-300 hover:bg-purple-500 hover:scale-105 active:scale-95 shadow-lg"
        >
          Continue
        </button>
      </div>
    </div>
  );
}