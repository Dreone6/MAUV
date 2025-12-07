import { ArrowLeft, Check } from 'lucide-react@0.487.0';

// Mastercard Logo
const MastercardLogo = () => (
  <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-1">
    <svg viewBox="0 0 48 32" className="w-full h-full">
      <circle cx="15" cy="16" r="12" fill="#EB001B"/>
      <circle cx="33" cy="16" r="12" fill="#F79E1B"/>
      <path d="M24 6.5c-2.5 2-4 5.1-4 8.5s1.5 6.5 4 8.5c2.5-2 4-5.1 4-8.5s-1.5-6.5-4-8.5z" fill="#FF5F00"/>
    </svg>
  </div>
);

interface ReviewSummaryScreenProps {
  onBack: () => void;
  onConfirmPayment: () => void;
  onChangePayment: () => void;
  planType?: 'monthly' | 'yearly';
}

export function ReviewSummaryScreen({ 
  onBack, 
  onConfirmPayment, 
  onChangePayment,
  planType = 'yearly'
}: ReviewSummaryScreenProps) {
  const isYearly = planType === 'yearly';
  const price = isYearly ? '49.99' : '4.99';
  const period = isYearly ? 'year' : 'month';
  const savingsPercent = isYearly ? 10 : 0;

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
      <div className="px-6 pt-12 pb-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-900" />
          </button>
          <h1 className="text-xl text-gray-900">Review Summary</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Summary Content */}
      <div className="px-6 py-6">
        {/* Plan Details */}
        <div className="text-center mb-8 relative">
          <h2 className="text-2xl text-gray-900 mb-2">MAUV Pro</h2>
          <div className="flex items-baseline justify-center gap-1 mb-4">
            <span className="text-5xl text-gray-900">${price}</span>
            <span className="text-gray-500">/{period}</span>
          </div>
          
          {/* Save Badge */}
          {savingsPercent > 0 && (
            <div className="inline-block bg-gradient-to-r from-pink-400 to-pink-500 text-white text-sm px-4 py-1.5 rounded-full shadow-md mb-6">
              Save {savingsPercent}%
            </div>
          )}
        </div>

        {/* Features List */}
        <div className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        {/* Selected Payment Method */}
        <div className="mb-8">
          <h3 className="text-gray-900 mb-3">Selected Payment Method</h3>
          <div className="flex items-center gap-3 p-4 rounded-2xl border-2 border-gray-100">
            <MastercardLogo />
            <div className="flex-1">
              <h4 className="text-gray-900">Mastercard</h4>
              <p className="text-gray-500 text-sm">**** **** **** 4678</p>
            </div>
            <button
              onClick={onChangePayment}
              className="text-pink-500 hover:text-pink-600 transition-colors"
            >
              Change
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Payment Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-6 safe-area-bottom">
        <button
          onClick={onConfirmPayment}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white transition-all duration-300 shadow-lg hover:scale-105 active:scale-95"
        >
          Confirm Payment - ${price}
        </button>
      </div>
    </div>
  );
}
